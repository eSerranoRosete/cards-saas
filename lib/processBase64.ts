export function processBase64(base64?: string): string | undefined {
  if (!base64) return;

  const base64Regex = /^data:image\/(png|jpg|jpeg);base64,/;
  if (!base64Regex.test(base64)) {
    return;
  }

  const processed = base64.split(",")[1];

  return processed;
}
