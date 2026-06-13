export type Film = {
  title: string;
  year?: number;
  studio?: string;
  role: string;
  banner: string;       // horizontal 16:9 — atmospheric marquee imagery
  poster: string;       // portrait 2:3 — official poster art
  themeNote: string;    // short alt / story descriptor
};

// VFX work at Rising Sun Pictures — ML pipelines for deepfake / gaze / generative shots.
// Marquee banners: license-free cinematic photography (Unsplash) evoking each film's mood.
// Title-card posters: official poster art (via Wikipedia / upload.wikimedia.org).
const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&h=900&q=85`;

export const films: Film[] = [
  {
    title: "Mad Max: Furiosa",
    year: 2024,
    studio: "Warner Bros.",
    role: "VFX ML Research",
    banner: u("photo-1547235001-d703406d3f17"),
    poster: "https://upload.wikimedia.org/wikipedia/en/3/34/Furiosa_A_Mad_Max_Saga.jpg",
    themeNote: "Furiosa: A Mad Max Saga poster",
  },
  {
    title: "Mortal Kombat II",
    year: 2025,
    studio: "Warner Bros.",
    role: "VFX ML Research",
    banner: u("photo-1517457373958-b7bdd4587205"),
    poster: "https://upload.wikimedia.org/wikipedia/en/9/9a/Mortal_Kombat_II_%28film%29_poster.jpg",
    themeNote: "Mortal Kombat II poster",
  },
  {
    title: "Deadpool & Wolverine",
    year: 2024,
    studio: "Marvel Studios",
    role: "VFX ML Research",
    banner: u("photo-1487029752779-a0c17b1f5ec9"),
    poster: "https://upload.wikimedia.org/wikipedia/en/4/4c/Deadpool_%26_Wolverine_poster.jpg",
    themeNote: "Deadpool & Wolverine poster",
  },
  {
    title: "Mickey 17",
    year: 2025,
    studio: "Warner Bros.",
    role: "VFX ML Research",
    banner: u("photo-1749215419683-23847ec40e9a"),
    poster: "https://upload.wikimedia.org/wikipedia/en/2/2d/Mickey_17_film_poster.png",
    themeNote: "Mickey 17 poster",
  },
  {
    title: "Sonic the Hedgehog 3",
    year: 2024,
    studio: "Paramount",
    role: "VFX ML Research",
    banner: u("photo-1576975220179-dd57b19f7537"),
    poster: "https://upload.wikimedia.org/wikipedia/en/f/f2/Sonic_the_Hedgehog_3_film_poster.jpg",
    themeNote: "Sonic the Hedgehog 3 poster",
  },
  {
    title: "Sinners",
    year: 2025,
    studio: "Warner Bros.",
    role: "VFX ML Research",
    banner: u("photo-1511406361295-0a1ff814c0ce"),
    poster: "https://upload.wikimedia.org/wikipedia/en/5/5f/Sinners_%282025_film%29_poster.jpg",
    themeNote: "Sinners poster",
  },
  {
    title: "Michael",
    year: 2026,
    studio: "Lionsgate",
    role: "VFX ML Research",
    banner: u("photo-1493225457124-a3eb161ffa5f"),
    poster: "https://upload.wikimedia.org/wikipedia/en/3/37/Michael_%282026_film_poster%29.png",
    themeNote: "Michael (2026) poster",
  },
  {
    title: "A Complete Unknown",
    year: 2024,
    studio: "Searchlight Pictures",
    role: "VFX ML Research",
    banner: u("photo-1510915361894-db8b60106cb1"),
    poster: "https://upload.wikimedia.org/wikipedia/en/d/d5/A_Complete_Unknown_poster.jpg",
    themeNote: "A Complete Unknown poster",
  },
  {
    title: "La Brea",
    year: 2023,
    studio: "NBC",
    role: "VFX ML Research",
    banner: u("photo-1625319714489-ed25251bdb4b"),
    poster: "https://upload.wikimedia.org/wikipedia/en/d/d6/La_Brea_%28TV_series%29_Title_Card.png",
    themeNote: "La Brea title card",
  },
];
