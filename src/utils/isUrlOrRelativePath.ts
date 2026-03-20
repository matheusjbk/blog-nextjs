export const isRelativePathRegex =
  /^\/(?:[A-Za-z0-9-._~!$&'()*+,;=:@]|%[0-9a-fA-F]{2})*(?:\/(?:[A-Za-z0-9-._~!$&'()*+,;=:@]|%[0-9a-fA-F]{2})*)*$/;

export const isUrlOrRelativePath = (value: string) => {
  try {
    new URL(value);
    return true;
  } catch {
    return isRelativePathRegex.test(value);
  }
};
