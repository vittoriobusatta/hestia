export async function generateAvatar(name: string) {
  const colors = ["111", "1E9DE6"];
  const firstLetter = name.charAt(0);
  const encodedName = encodeURIComponent(firstLetter);
  const apiUrl = `https://ui-avatars.com/api/?name=${encodedName}&background=${
    colors[Math.floor(Math.random() * colors.length)]
  }&color=F0F7F4`;

  try {
    const response = await fetch(apiUrl);
    const avatarBuffer = await response.arrayBuffer();
    const avatarBase64 = Buffer.from(avatarBuffer).toString("base64");

    return `data:image/png;base64,${avatarBase64}`;
  } catch (error) {
    throw new Error("Something went wrong while generating the avatar" + error);
  }
}
