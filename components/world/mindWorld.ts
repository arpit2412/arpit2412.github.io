/**
 * Mind World — the chapter graph.
 *
 * Eight plates, in scroll order. The narrative spine (spec §8) is carried by the VERB;
 * the noun stays the information architecture, because recruiters Ctrl-F "Publications"
 * and search engines index headings. The verb is art direction, never the anchor.
 *
 * Rooms hang off the hub. In this first pass the rooms are laid out in scroll order
 * rather than as separate scroll tracks, so scrolling forward walks the whole world and
 * the route rail / hub doors jump between rooms. True per-room tracks (where surfacing
 * from a room reverse-scrubs its own edge clip) land with the video pass — the scrub
 * engine is already segment-based and does not care.
 */

export type Chapter = {
  id: string;
  /** Display verb — art direction. Never an anchor, never an <h2>. */
  verb: string;
  /** The real section name. This is the anchor and the heading. */
  noun: string;
  plate: string;
  /** Is this one of the five doors off the hub? */
  door: boolean;
  /** Minimum scroll length in viewport heights; content may exceed it. */
  minScroll: number;
};

export const CHAPTERS: Chapter[] = [
  {
    id: "journey",
    verb: "Descend",
    noun: "Journey",
    plate: "/world/img/descent.webp",
    door: false,
    minScroll: 1.6,
  },
  {
    id: "about",
    verb: "One mind. Five expressions.",
    noun: "About",
    plate: "/world/img/hub.webp",
    door: false,
    minScroll: 1.4,
  },
  {
    id: "research",
    verb: "Question",
    noun: "Research",
    plate: "/world/img/room-question.webp",
    door: true,
    minScroll: 1.4,
  },
  {
    id: "work",
    verb: "Build",
    noun: "Engineering",
    plate: "/world/img/room-build.webp",
    door: true,
    minScroll: 1.4,
  },
  {
    id: "films",
    verb: "Create",
    noun: "Film & VFX",
    plate: "/world/img/room-create.webp",
    door: true,
    minScroll: 1.2,
  },
  {
    id: "writing",
    verb: "Explain",
    noun: "Writing",
    plate: "/world/img/room-explain.webp",
    door: true,
    minScroll: 1.4,
  },
  {
    id: "honors",
    verb: "Impact",
    noun: "Impact",
    plate: "/world/img/room-impact.webp",
    door: true,
    minScroll: 1.4,
  },
  {
    id: "contact",
    verb: "The next world does not exist yet",
    noun: "Contact",
    plate: "/world/img/core.webp",
    door: false,
    minScroll: 1.2,
  },
];

/** The hub is where the five doors are offered. */
export const HUB_ID = "about";
export const DOORS = CHAPTERS.filter((c) => c.door);
