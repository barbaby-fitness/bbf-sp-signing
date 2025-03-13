/// <reference types="@aws-sdk/client-s3" />
import { NextResponse } from 'next/server'
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { Resend } from 'resend'
import { PDFDocument, PDFForm, rgb } from 'pdf-lib'

// Initialize Resend for email
const resend = new Resend(process.env.RESEND_API_KEY)

// Initialize S3 client for R2
const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
  },
})

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const timestamp = new Date().toISOString()

    // Helper function to format date properly
    const formatDate = (timestamp: string) => {
      return new Date(timestamp).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    }

    const contractId = `contract-${data.email}-${timestamp}`

    // Store contract in R2 with formatted date in the content
    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
        Key: `contracts/${contractId}.json`,
        Body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          address: {
            street: data.address.street,
            city: data.address.city,
            state: data.address.state,
            zipCode: data.address.zipCode,
          },
          signature: data.signature,
          agreed: data.agreed,
          agreedLiability: data.agreedLiability,
          submissionDate: data.submissionDate,
          timestamp: data.timestamp,
          formattedDate: new Date(timestamp).toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
          })
        }),
        ContentType: 'application/json',
      })
    )

    // Load PDF templates from R2
    const [releaseTemplate, trainingTemplate] = await Promise.all([
      s3Client.send(new GetObjectCommand({
        Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
        Key: 'ReleaseofLiability-agreement.pdf'  // Updated filename
      })),
      s3Client.send(new GetObjectCommand({
        Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
        Key: 'TrainingAgreement.pdf'
      }))
    ])

    // Convert template streams to ArrayBuffers
    const releaseBytes = await releaseTemplate.Body?.transformToByteArray()
    const trainingBytes = await trainingTemplate.Body?.transformToByteArray()

    // Load PDF documents
    const releasePdf = await PDFDocument.load(releaseBytes!)
    const trainingPdf = await PDFDocument.load(trainingBytes!)

    // Get form fields
    const releaseForm = releasePdf.getForm()
    const trainingForm = trainingPdf.getForm()

    // Helper function to safely fill form fields
    const fillFormField = (form: PDFForm, fieldName: string, value: string) => {
      try {
        // Get all form fields to debug
        const fields = form.getFields()
        const fieldNames = fields.map(f => f.getName())
        
        // Log available fields
        console.log(`Available fields in form: ${fieldNames.join(', ')}`)
        
        const field = form.getTextField(fieldName)
        if (field) {
          field.setText(value)
        } else {
          console.log(`Field ${fieldName} not found in form. Available fields are: ${fieldNames.join(', ')}`)
        }
      } catch (error) {
        console.error(`Error setting field ${fieldName}:`, error)
      }
    }

    // Remove the special handling since both forms now use 'streetAddress'
    const fillStreetAddress = (form: PDFForm, value: string) => {
      fillFormField(form, 'streetAddress', value);
    };

    // Fill release form
    fillFormField(releaseForm, 'firstName', data.firstName);
    fillFormField(releaseForm, 'lastName', data.lastName);
    fillFormField(releaseForm, 'emailAddress', data.email);
    fillFormField(releaseForm, 'phoneNumber', data.phone);
    fillStreetAddress(releaseForm, data.address.street);  // Using the standardized field name
    fillFormField(releaseForm, 'city', data.address.city);
    fillFormField(releaseForm, 'state', data.address.state);
    fillFormField(releaseForm, 'zipCode', data.address.zipCode);
    fillFormField(releaseForm, 'recipientName', data.signature);
    fillFormField(releaseForm, 'dateOfSigning', formatDate(data.timestamp));

    // Fill training form
    fillFormField(trainingForm, 'firstName', data.firstName);
    fillFormField(trainingForm, 'lastName', data.lastName);
    fillFormField(trainingForm, 'emailAddress', data.email);
    fillFormField(trainingForm, 'phoneNumber', data.phone);
    fillStreetAddress(trainingForm, data.address.street);  // Using the standardized field name
    fillFormField(trainingForm, 'city', data.address.city);
    fillFormField(trainingForm, 'state', data.address.state);
    fillFormField(trainingForm, 'zipCode', data.address.zipCode);
    fillFormField(trainingForm, 'recipientName', data.signature);
    fillFormField(trainingForm, 'dateOfSigning', formatDate(data.timestamp));

    // Flatten forms and save PDFs
    releaseForm.flatten()
    trainingForm.flatten()

    const releasePdfBytes = await releasePdf.save()
    const trainingPdfBytes = await trainingPdf.save()

    // Save filled PDFs to R2
    await Promise.all([
      s3Client.send(new PutObjectCommand({
        Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
        Key: `contracts/${contractId}-release.pdf`,
        Body: releasePdfBytes,
        ContentType: 'application/pdf'
      })),
      s3Client.send(new PutObjectCommand({
        Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
        Key: `contracts/${contractId}-training.pdf`,
        Body: trainingPdfBytes,
        ContentType: 'application/pdf'
      }))
    ])

    // Send confirmation email to client
    try {
      const clientEmailResponse = await resend.emails.send({
        from: 'BarBaby Fitness <signed-contracts@contracts.barbabyfitness.com>',
        to: [data.email],
        subject: 'Your BarBaby Fitness Contract Confirmation',
        attachments: [
          {
            filename: `release-of-liability-${contractId}.pdf`,
            content: Buffer.from(releasePdfBytes).toString('base64')
          },
          {
            filename: `training-agreement-${contractId}.pdf`,
            content: Buffer.from(trainingPdfBytes).toString('base64')
          }
        ],
        text: `Your BarBaby Fitness contract has been successfully processed. Attached are your signed documents.`,
        html: `
        <h1>Welcome to BarBaby Fitness!</h1>
        <p>Dear ${data.firstName},</p>
        <p>Thank you for signing up with BarBaby Fitness. Your contract has been received and processed on ${new Date(timestamp).toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZoneName: 'short'
        })}.</p>
        <p>Contract Details:</p>
        <ul>
          <li>Name: ${data.firstName} ${data.lastName}</li>
          <li>Email: ${data.email}</li>
          <li>Phone: ${data.phone}</li>
          <li>Address: ${data.address.street}, ${data.address.city}, ${data.address.state} ${data.address.zipCode}</li>
        </ul>
        <p>Next Steps:</p>
        <ul>
          <li>Lige will contact you within 24 hours to schedule your first session</li>
          <li>Review the attached welcome packet for preparation guidelines</li>
          <li>Follow us on social media for daily motivation and updates</li>
        </ul>
        <p>If you have any questions, please don't hesitate to contact us.</p>
      `,
      })
      console.log('Client email sent successfully:', clientEmailResponse)
    } catch (clientEmailError) {
      console.error('Failed to send client email:', clientEmailError)
    }

    // Send notification email to owner
    try {
      const ownerEmailResponse = await resend.emails.send({
        from: 'BarBaby Fitness Contracts <signed-contracts@contracts.barbabyfitness.com>',
        to: ['adm.barbabyfitness@gmail.com'],
        replyTo: 'adm.barbabyfitness@gmail.com', // Fixed property name
        subject: `New Contract Signed: ${data.firstName} ${data.lastName}`,
        attachments: [
          {
            filename: `release-of-liability-${contractId}.pdf`,
            content: Buffer.from(releasePdfBytes).toString('base64')
          },
          {
            filename: `training-agreement-${contractId}.pdf`,
            content: Buffer.from(trainingPdfBytes).toString('base64')
          }
        ],
        text: `A new contract has been signed by ${data.firstName} ${data.lastName}. Attached are the signed documents.`,
        html: `
        <h1>New Contract Signed</h1>
        <p>A new contract has been signed by ${data.firstName} ${data.lastName}.</p>
        <p>Contract Details:</p>
        <ul>
          <li>Name: ${data.firstName} ${data.lastName}</li>
          <li>Email: ${data.email}</li>
          <li>Phone: ${data.phone}</li>
          <li>Address: ${data.address.street}, ${data.address.city}, ${data.address.state} ${data.address.zipCode}</li>
          <li>Signed On: ${new Date(timestamp).toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
          })}</li>
        </ul>
        <p>The contract has been stored in Cloudflare R2 with ID: ${contractId}</p>
        `,
      })
      console.log('Owner email sent successfully:', ownerEmailResponse)
      
      // Add additional logging
      console.log('Owner email details:', {
        to: 'adm.barbabyfitness@gmail.com',
        subject: `New Contract Signed: ${data.firstName} ${data.lastName}`,
        timestamp: new Date().toISOString()
      })
    } catch (ownerEmailError) {
      console.error('Failed to send owner email:', ownerEmailError)
    }

    return NextResponse.json({ success: true, contractId })
  } catch (error) {
    console.error('Contract submission error:', error)
    return NextResponse.json(
      { error: 'Failed to process contract' },
      { status: 500 }
    )
  }
}
