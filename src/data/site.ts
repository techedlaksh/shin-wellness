export const site = {
  name: "Shin Wellness",
  practitioner: "Saebyuk Shin",
  whatsappNumber: "COUNTRYCODEPHONENUMBER",
  heroImage: "/images/gathering-placeholder.svg",
  profileImage: "/images/saebyuk-placeholder.svg",
};

export const navItems = [
  { href: "/practice", label: "The Practice" },
  { href: "/gatherings", label: "Gatherings" },
  { href: "/past-gatherings", label: "Past Gatherings" },
  { href: "/saebyuk", label: "Saebyuk" },
  { href: "/reflections", label: "Reflections" },
  { href: "/contact", label: "Contact" },
];

export const whatsappMessages = {
  home:
    "Hello Saebyuk, I found Shin Wellness and would love to learn more about your practice and upcoming gatherings.",
  pastGathering:
    "Hello Saebyuk, I saw the previous Shin Wellness gatherings and would love to know how I can join a future one.",
  digital:
    "Hello Saebyuk, I am interested in continuing the Shin Wellness practice online. Could you tell me what is currently available?",
  about:
    "Hello Saebyuk, I connected with your approach and would like to ask you a few questions about Shin Wellness.",
  contact:
    "Hello Saebyuk, I found Shin Wellness and would love to learn more.",
  privateGroup:
    "Hello Saebyuk, I am interested in a private group session. Could you share what is currently possible?",
};

export type WhatsappMessageKey = keyof typeof whatsappMessages;

export function whatsappUrl(key: WhatsappMessageKey) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
    whatsappMessages[key],
  )}`;
}

export const pillars = [
  {
    title: "Move with awareness",
    text: "Alignment Yoga and mindful movement that encourage physical awareness, steadiness, and connection with the body.",
  },
  {
    title: "Become still",
    text: "Meditation and breath-based practices that create space between constant activity and internal experience.",
  },
  {
    title: "Explore inwardly",
    text: "Psychologically informed reflection shaped by Saebyuk's education in psychotherapy and play therapy.",
  },
  {
    title: "Connect meaningfully",
    text: "Small-group experiences that allow people to feel seen and supported without pressure to perform or disclose personal information.",
  },
];

export const qualifications = [
  {
    title: "Exact play-therapy qualification title",
    organization: "Issuing organization",
    country: "Country",
    year: "Completion year",
    status: "Current status, if relevant",
  },
  {
    title: "Exact psychotherapy programme title",
    organization: "Issuing organization",
    country: "Korea",
    year: "Completion year",
    status: "Current status, if relevant",
  },
  {
    title: "Exact yoga or meditation training title",
    organization: "Training provider",
    country: "Country",
    year: "Completion year",
    status: "Current status, if relevant",
  },
];
