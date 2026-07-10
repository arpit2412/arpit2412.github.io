/**
 * Mind World v2 — the miniature island world.
 *
 * Eight islands, in scroll order. Each chapter shows its island small, floating on flat
 * cream, and scroll drives a **continuous zoom into it** — the camera closes on the island
 * until you are inside. Because the background is flat and empty, there is no page edge and
 * no parallax cue, so it reads as a world approaching rather than a page scrolling. That is
 * the mechanic, measured from `docs/reference-scroll-world.mp4`; see docs/v2/ART-DIRECTION-V2.md.
 *
 * The narrative spine (spec §8) is carried by the VERB. The noun stays the anchor and the
 * heading, because recruiters Ctrl-F "Publications" and search engines index headings.
 */

export type Chapter = {
  id: string;
  /** Display verb — art direction. Never an anchor, never an <h2>. */
  verb: string;
  /** The real section name. This is the anchor and the heading. */
  noun: string;
  /** One line of copy, shown while the island is still small. Fades as the zoom begins. */
  lede: string;
  island: string;
  /** The push-in clip. Scroll drives its currentTime. Falls back to the poster if absent. */
  clip: string;
  clipMobile: string;
  door: boolean;
  /** Scroll length in viewport-heights. Longer = slower zoom. */
  scroll: number;
};

export const CHAPTERS: Chapter[] = [
  {
    id: "journey",
    verb: "Descend",
    noun: "Journey",
    lede: "Defence, then film, then platform scale, then frontier models. Not a wander — a climb.",
    island: "/world/v3/island-journey.webp",
    clip: "/world/v3vid/journey.mp4",
    clipMobile: "/world/v3vid/journey-m.mp4",
    door: false,
    scroll: 2.2,
  },
  {
    id: "about",
    verb: "One mind. Five expressions.",
    noun: "About",
    lede: "I study intelligence, build it into systems, and bring it into the real world.",
    island: "/world/v3/island-hero.webp",
    clip: "/world/v3vid/hero.mp4",
    clipMobile: "/world/v3vid/hero-m.mp4",
    door: false,
    scroll: 2.0,
  },
  {
    id: "research",
    verb: "Question",
    noun: "Research",
    lede: "Before a system can be built, something unresolved has to be understood.",
    island: "/world/v3/island-question.webp",
    clip: "/world/v3vid/question.mp4",
    clipMobile: "/world/v3vid/question-m.mp4",
    door: true,
    scroll: 2.2,
  },
  {
    id: "work",
    verb: "Build",
    noun: "Engineering",
    lede: "Research matters when it survives contact with real systems.",
    island: "/world/v3/island-build.webp",
    clip: "/world/v3vid/build.mp4",
    clipMobile: "/world/v3vid/build-m.mp4",
    door: true,
    scroll: 2.2,
  },
  {
    id: "films",
    verb: "Create",
    noun: "Film & VFX",
    lede: "Sometimes the technology disappears, and only the experience remains.",
    island: "/world/v3/island-create.webp",
    clip: "/world/v3vid/create.mp4",
    clipMobile: "/world/v3vid/create-m.mp4",
    door: true,
    scroll: 2.0,
  },
  {
    id: "writing",
    verb: "Explain",
    noun: "Writing",
    lede: "Understanding is incomplete until it can be explained.",
    island: "/world/v3/island-explain.webp",
    clip: "/world/v3vid/explain.mp4",
    clipMobile: "/world/v3vid/explain-m.mp4",
    door: true,
    scroll: 2.2,
  },
  {
    id: "honors",
    verb: "Impact",
    noun: "Impact",
    lede: "Ideas leave evidence.",
    island: "/world/v3/island-impact.webp",
    clip: "/world/v3vid/impact.mp4",
    clipMobile: "/world/v3vid/impact-m.mp4",
    door: true,
    scroll: 2.0,
  },
  {
    id: "contact",
    verb: "The next world does not exist yet",
    noun: "Contact",
    lede: "You have seen how I question, build, create and explain. Let's build what's next.",
    island: "/world/v3/island-next.webp",
    clip: "/world/v3vid/next.mp4",
    clipMobile: "/world/v3vid/next-m.mp4",
    door: false,
    scroll: 1.8,
  },
];

export const HUB_ID = "about";
export const DOORS = CHAPTERS.filter((c) => c.door);

