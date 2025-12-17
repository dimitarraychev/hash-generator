export const encodeHash = (
  buffer: ArrayBuffer,
  encoding: "utf8" | "hex" | "base64" = "utf8"
): string => {
  const bytes = new Uint8Array(buffer);

  if (encoding === "hex") {
    return Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  if (encoding === "base64") {
    let binary = "";
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return btoa(binary);
  }

  // Default UTF-8
  const decoder = new TextDecoder("utf-8");
  return decoder.decode(bytes);
};
