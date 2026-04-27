export async function verifyHoneypotInput(formData: FormData) {
  const ghostInputValue = formData.get("honeypot");

  const isBot =
    ghostInputValue === null ||
    (typeof ghostInputValue === "string" && ghostInputValue.trim() !== "");

  return isBot;
}
