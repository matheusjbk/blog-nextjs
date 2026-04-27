export function HoneypotInput() {
  return (
    <input
      className="ghostInput"
      name="honeypot"
      type="text"
      autoComplete="new-password"
      tabIndex={-1}
      defaultValue=""
    />
  );
}
