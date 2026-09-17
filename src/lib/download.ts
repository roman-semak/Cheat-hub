// Browser-only: hands the user a text file without a round-trip to the server.
// Extracted from userStore's profile export so the object URL is revoked in
// exactly one place.
export function downloadTextFile(text: string, filename: string, type = 'text/plain') {
  const blob = new Blob([text], { type: `${type};charset=utf-8` })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
