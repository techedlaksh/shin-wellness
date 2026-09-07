export const interests = {
  updates: "the Shin Wellness newsletter",
  books: "the Shin Wellness reading list",
  wallpapers: "a little joy for your screen",
  routine: "the 7-day emotion routine",
  checkins: "the 4-week check-in program",
  coaching: "CBT-informed habit coaching",
  retreats: "wellness stays around the world",
  recommendations: "our favorite wellness finds",
} as const;

export type Interest = keyof typeof interests;
export const locations = ["footer", "offering-dialog"] as const;

export function checkoutUrl(value: string | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password
      ? url.href
      : null;
  } catch {
    return null;
  }
}
