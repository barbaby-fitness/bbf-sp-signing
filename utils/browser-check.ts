export const isBrowser = typeof window !== 'undefined'

export function getBrowserInfo() {
  if (!isBrowser) return null
  // browser-specific code here
}