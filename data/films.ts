export type Film = {
  title: string;
  year?: number;
  studio?: string;
  role: string;
  banner: string;       // horizontal 16:9
  poster: string;       // portrait 2:3
  themeNote: string;    // short alt / story descriptor
};

// VFX work at Rising Sun Pictures — ML pipelines for deepfake / gaze / generative shots.
// Imagery: thematic cinematic photography from Unsplash (license-free, commercial-OK).
// Each photo evokes the film's mood rather than reproducing copyrighted poster art.
const u = (id: string, fit: "wide" | "tall" = "wide") =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${fit === "wide" ? 1600 : 1000}&h=${fit === "wide" ? 900 : 1500}&q=85`;

export const films: Film[] = [
  {
    title: "Mad Max: Furiosa",
    year: 2024,
    studio: "Warner Bros.",
    role: "VFX ML Research",
    banner: u("photo-1547235001-d703406d3f17"),
    poster: u("photo-1547235001-d703406d3f17", "tall"),
    themeNote: "Dusty wasteland tonal study",
  },
  {
    title: "Deadpool & Wolverine",
    year: 2024,
    studio: "Marvel Studios",
    role: "VFX ML Research",
    banner: u("photo-1487029752779-a0c17b1f5ec9"),
    poster: u("photo-1487029752779-a0c17b1f5ec9", "tall"),
    themeNote: "Neon, red, sharp light",
  },
  {
    title: "Mickey 17",
    year: 2025,
    studio: "Warner Bros.",
    role: "VFX ML Research",
    banner: u("photo-1749215419683-23847ec40e9a"),
    poster: u("photo-1749215419683-23847ec40e9a", "tall"),
    themeNote: "Sci-fi exterior, vintage future",
  },
  {
    title: "Sonic the Hedgehog 3",
    year: 2024,
    studio: "Paramount",
    role: "VFX ML Research",
    banner: u("photo-1576975220179-dd57b19f7537"),
    poster: u("photo-1576975220179-dd57b19f7537", "tall"),
    themeNote: "Blue motion, kinetic energy",
  },
  {
    title: "Sinners",
    year: 2025,
    studio: "Warner Bros.",
    role: "VFX ML Research",
    banner: u("photo-1511406361295-0a1ff814c0ce"),
    poster: u("photo-1511406361295-0a1ff814c0ce", "tall"),
    themeNote: "Noir corridor, single light source",
  },
  {
    title: "La Brea",
    year: 2023,
    studio: "NBC",
    role: "VFX ML Research",
    banner: u("photo-1625319714489-ed25251bdb4b"),
    poster: u("photo-1625319714489-ed25251bdb4b", "tall"),
    themeNote: "Primordial green, layered foliage",
  },
];
