/**
 * Community page content.
 *
 * The wording is deliberately general — no figures, partner names or
 * programme claims — in the same spirit as data/projects.ts: nothing goes on
 * the page that CJ MUNI has not confirmed. Name a partner or a programme here
 * once it is cleared for publication.
 *
 * Two of the photographs are not CJ MUNI's own. They are AusAID / DFAT images
 * published under CC BY 2.0, which allows commercial use as long as the credit
 * is shown with the photo — which is why every image here carries its credit
 * alongside its alt text. Replace them with CJ MUNI community photography as
 * it becomes available, and drop the credit at the same time.
 */

export type CommunityImage = {
  src: string;
  alt: string;
  /** Required for the CC BY images; omitted for CJ MUNI's own photography. */
  credit?: {
    author: string;
    sourceHref: string;
    license: string;
    licenseHref: string;
  };
};

const CC_BY_2 = {
  license: "CC BY 2.0",
  licenseHref: "https://creativecommons.org/licenses/by/2.0/",
};

export const COMMUNITY_IMAGES = {
  hero: {
    src: "/images/community/community-meeting.jpg",
    alt: "Villagers of all ages seated together under a bush-material shelter at a community meeting in Papua New Guinea",
    credit: {
      author: "AusAID / DFAT",
      sourceHref:
        "https://commons.wikimedia.org/wiki/File:Community_meeting,_PNG_2009._Photo-_AusAID_(10687449835).jpg",
      ...CC_BY_2,
    },
  },
  celebration: {
    src: "/images/community/wairavanua-school-opening.jpg",
    alt: "Women from Wairavanua community dancing in traditional dress at the opening of a new school building",
    credit: {
      author: "Anthony Mason / AusAID",
      sourceHref:
        "https://commons.wikimedia.org/wiki/File:Dancers_from_Wairavanua_community_at_the_opening_of_the_new_school_(10691099154).jpg",
      ...CC_BY_2,
    },
  },
  sponsorship: {
    src: "/images/community/rugby-scrum.webp",
    alt: "Rugby players in CJ MUNI-sponsored kit packing down for a scrum during a match",
  },
} satisfies Record<string, CommunityImage>;

/**
 * How CJ MUNI works with a community. Numbered on the page because the order
 * is the point: listen before offering, and stay after delivering.
 */
export const COMMUNITY_PRINCIPLES = [
  {
    title: "Listen first",
    text: "Communities set the priorities. We ask what’s needed before we offer anything.",
  },
  {
    title: "Work through local leaders",
    text: "We partner with ward committees, churches, associations and groups that already lead in their communities.",
  },
  {
    title: "Bring what we do well",
    text: "Equipment, logistics, materials and practical skills: the capability we use every day, put to local use.",
  },
  {
    title: "Stay for the long term",
    text: "We build relationships that outlast a single event or project, and we keep showing up.",
  },
] as const;

export type CommunityFocusIcon =
  | "people"
  | "award"
  | "village"
  | "network"
  | "bridge"
  | "growth";

export type CommunityFocusArea = {
  title: string;
  text: string;
  icon: CommunityFocusIcon;
};

export const COMMUNITY_FOCUS_AREAS: CommunityFocusArea[] = [
  {
    title: "Community programs",
    text: "Backing local programs in health, education, youth and safety that are run by and for the community.",
    icon: "people",
  },
  {
    title: "Sponsorships & events",
    text: "Supporting sport, school, cultural and community events that bring people together.",
    icon: "award",
  },
  {
    title: "Rural & village communities",
    text: "Helping with the things that are hardest to reach from remote areas: access, materials, transport and facilities.",
    icon: "village",
  },
  {
    title: "Local groups & associations",
    text: "Partnering with women’s and youth groups, sporting clubs, church groups and landowner associations.",
    icon: "network",
  },
  {
    title: "Local development",
    text: "Contributing equipment, know-how and materials to community-led infrastructure and facilities.",
    icon: "bridge",
  },
  {
    title: "Social & economic impact",
    text: "Employing locally, buying locally and building skills that stay in the community.",
    icon: "growth",
  },
];

/** What CJ MUNI invites sponsorship requests for — an invitation, not a record. */
export const SPONSORSHIP_REQUEST_TYPES = [
  "Grassroots sport",
  "School events",
  "Cultural events",
  "Community fundraisers",
] as const;
