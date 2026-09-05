export type Gathering = {
  slug: string;
  title: string;
  date: string;
  theme: string;
  summary: string;
  structure: string[];
  reflection: string;
  participant: string;
  evolution: string;
  image: string;
};

export const pastGatherings: Gathering[] = [
  {
    slug: "returning-to-the-body",
    title: "Returning to the Body",
    date: "Early gathering",
    theme: "Movement, breath, and grounded self-awareness",
    summary:
      "An intimate session exploring how gentle movement can help people notice their inner state without needing to explain it first.",
    structure: [
      "A quiet arrival practice",
      "Alignment-based movement",
      "Guided stillness",
      "Optional written reflection",
    ],
    reflection:
      "Saebyuk noticed how quickly the group softened when the practice made space for different levels of energy and experience.",
    participant:
      "I felt able to participate without performing, and that helped me listen to myself more honestly.",
    evolution:
      "This gathering shaped Shin Wellness toward smaller formats, slower pacing, and more room for personal reflection.",
    image: "/images/gathering-placeholder.svg",
  },
  {
    slug: "space-between-thoughts",
    title: "Space Between Thoughts",
    date: "Recent gathering",
    theme: "Meditation, embodied awareness, and inner quiet",
    summary:
      "A small-group practice centered on the pause between mental effort and bodily listening.",
    structure: [
      "Breath-based settling",
      "Gentle guided movement",
      "Meditation",
      "Optional sharing in pairs",
    ],
    reflection:
      "Saebyuk saw that people often need permission to be quiet together before they feel ready to speak.",
    participant:
      "The session gave me a way to stop trying to solve everything and simply notice what was present.",
    evolution:
      "The experience informed future online practices designed for people who want to continue gently at home.",
    image: "/images/gathering-placeholder.svg",
  },
];

export const currentOpportunities = [
  {
    title: "In-person gatherings",
    text: "Small-group practices are offered selectively when the setting can support privacy, steadiness, and genuine connection.",
    cta: "Contact Saebyuk for details",
  },
  {
    title: "Online practices",
    text: "Digital practices are evolving for people who want to continue movement, stillness, and reflection from wherever they are.",
    cta: "Contact Saebyuk for details",
  },
  {
    title: "Private group sessions",
    text: "Saebyuk can shape a practice for a small group, team, or circle that wants a grounded shared experience.",
    cta: "Contact Saebyuk for details",
  },
];
