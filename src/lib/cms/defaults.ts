import { buildMapEmbedUrl } from "./map";
import type {
  AboutData,
  BehindTheScenePageData,
  BtsItem,
  CareersData,
  ClientsPageData,
  ContactPageData,
  CoverageItem,
  HomeData,
  JobItem,
  SiteData,
  WorkItem,
  WorksPageData,
} from "./types";

/**
 * Built-in content. It is used when the CMS has no content yet, or when the
 * database cannot be reached, so the site always renders. `npm run seed`
 * copies this content into the CMS as the starting point for editors.
 */

const img = (
  url: string,
  alt: string,
  width?: number,
  height?: number,
  focal?: { x: number; y: number },
) => ({
  url,
  alt,
  width,
  height,
  focalX: focal?.x,
  focalY: focal?.y,
});

const lines = (text: string) => text.split("\n").filter(Boolean);

export const defaultSite: SiteData = {
  siteName: "Happiest People Productions",
  defaultDescription:
    "Happiest People Productions is a video production company in Kerala crafting ad films, digital films and brand stories that make people feel something.",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Works", href: "/works" },
    { label: "Behind the Scene", href: "/behind-the-scene" },
    { label: "Clients", href: "/clients" },
    { label: "Careers", href: "/careers" },
    { label: "Contact Us", href: "/contact-us" },
  ],
  footerColumns: [
    [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Works", href: "/works" },
    ],
    [
      { label: "Behind the Scene", href: "/behind-the-scene" },
      { label: "Clients", href: "/clients" },
      { label: "Careers", href: "/careers" },
      { label: "Contact Us", href: "/contact-us" },
    ],
  ],
  contact: {
    email: "official@happiestpeopleproductions.com",
    phone: "09449847321",
    phoneNote: "9 am to 5 pm, Except on Sundays",
    address: [
      "Happiest People Productions, Aloor Road,",
      "Perumannu, Kechery,",
      "Thrissur, Eranellur, Kerala",
      "680501",
    ],
    mapUrl: "https://maps.app.goo.gl/Y28CxsP2r28H2UM8A",
  },
  socials: [
    { platform: "facebook", url: "https://www.facebook.com" },
    { platform: "linkedin", url: "https://www.linkedin.com" },
    { platform: "instagram", url: "https://www.instagram.com" },
    { platform: "behance", url: "https://www.behance.com" },
  ],
  ctaBanner: { lead: "We serve a wide", emphasis: "tailored" },
};

export const defaultWorks: WorkItem[] = [
  {
    title: "Shoot for world best head phones nirvana",
    image: img("/images/work-1.webp", "Man wearing earbuds against a yellow backdrop", 1533, 863),
    videoId: "YPF9hUm4trM",
    category: "commercials",
  },
  {
    title: "Shoot for AKG headset world 1 brand",
    image: img("/images/work-2.webp", "Pink AKG headphones", 1533, 863),
    videoId: "YPF9hUm4trM",
    category: "commercials",
  },
  {
    title: "Shoot for world best head phones nirvana",
    image: img("/images/work-3.webp", "Work sample 3"),
    videoId: "YPF9hUm4trM",
    category: "commercials",
  },
  {
    title: "Shoot for world best head phones nirvana",
    image: img("/images/work-4.webp", "Work sample 4"),
    videoId: "YPF9hUm4trM",
    category: "commercials",
  },
  {
    title: "Shoot for world best head phones nirvana",
    image: img("/images/work-5.webp", "Work sample 5"),
    videoId: "YPF9hUm4trM",
    category: "commercials",
  },
  {
    title: "Shoot for world best head phones nirvana",
    image: img("/images/work-6.webp", "Work sample 6"),
    videoId: "YPF9hUm4trM",
    category: "commercials",
  },
];

const longQuote = [
  "Working with Happiest People Productions,",
  "has been one of the most rewarding creative partnerships we've had at LuLu Hypermarket. From TV commercials to social media campaigns, their team brings an energy and dedication that goes well beyond just delivering a final cut - they truly invest themselves in understanding our brand, our audience, and the story we want to tell. What sets them apart is their ability to take a brief and elevate it. Every project we've collaborated on has come back sharper, more compelling, and more visually striking than we imagined. Whether it's a high-energy ad film for a seasonal sale or a scroll-stopping reel for our social channels, they consistently deliver content that resonates with our customers and drives real engagement. Beyond the craft, it's the people that make the difference. They're responsive, adaptable, and genuinely easy to work with - even under tight retail timelines where things move fast and plans change overnight. That kind of reliability is rare, and we value it deeply.",
  "I'd recommend Happiest People Productions to any brand looking for a production partner that combines creative excellence with heart.",
];

export const defaultHome: HomeData = {
  seo: {
    title: "Happiest People Productions | Ad film & video production in Kerala",
    description:
      "Ad films, digital films and brand reels from a Kerala production house that has been making video campaigns with impact since 2020.",
  },
  hero: {
    titleLine1: "Crafting a",
    titleLine2: "impactful",
    titleEmphasis: "ads",
    cta: { label: "Contact us", href: "/contact-us" },
  },
  works: {
    eyebrow: "works",
    title: { lead: "Our", emphasis: "Creations!" },
    description:
      "We are one of the top ad film production companies in India. We work with businesses to develop one of a kind, eye-catching visuals. We provide communications that engage, build brands, and deliver results, whether in the form of TV commercials, digital videos, or even product photography.",
    viewAllLabel: "View All",
    items: defaultWorks.slice(0, 2),
  },
  brands: [
    { name: "Virtina", image: img("/images/virtina.webp", "Virtina logo", 165, 66) },
    { name: "Cartknitter", image: img("/images/cartknitter.webp", "Cartknitter logo", 192, 66) },
    { name: "Rainmaker", image: img("/images/rainmaker.webp", "Rainmaker logo", 192, 66) },
  ],
  about: {
    eyebrow: "About Us",
    title: { lead: "We craft", emphasis: "your fit!" },
    paragraphs: [
      "Happiest People Production is the best video production company in Kerala, and we are advertising and visual storytelling experts. We have been producing video campaigns with impact for brands in all sectors since 2020.",
      "We revolutionize concepts into compelling videos and photographs that captivate and persuade target audiences, regardless of the video's end-use (TV, social media, or corporate website). We also offer social media advertising and corporate product photography services.",
    ],
    cta: { label: "About us", href: "/about" },
    stats: [
      { value: "800+", label: "Ads" },
      { value: "300+", label: "clients" },
      { value: "7+", label: "customers globally" },
      { value: "8+", label: "years of experience" },
    ],
  },
  workspace: {
    eyebrow: "Work space",
    titleBefore: "Our Studio Space Not Just a Studio",
    titleAfter: "A Reel Retreat for",
    titleEmphasis: "Creative Souls.",
    paragraphs: [
      "At 2000 sqft our production haven has editing suites, a makeup studio with a private bedroom attached, a dining area, a courtyard, DI suite, a camera and lighting unit, and a lighting unit designed for creative excellence.",
      "Every detail matters. Every room has a function. From your first drawings to your final screenings, this is where filmmakers, artists, and storytellers come to create, collaborate, and deliver.",
    ],
    highlight: "2000",
    images: [
      img("/images/home/workspace-office-1.webp", "Meeting room with a dining table, shelves and editing desks", 1920, 1080),
      img("/images/home/workspace-office-2.webp", "Lounge with a yellow sofa and a yellow accent wall", 505, 505),
      img("/images/home/workspace-office-3.webp", "Corridor with a yellow floor and yellow doors", 683, 1024),
    ],
  },
  services: {
    title: { lead: "Our", emphasis: "services" },
    items: [
      {
        icon: "tv",
        title: "Tv, theatre commercials",
        description:
          "We are one of the best TV commercial production companies with the ability of creating cinematic ads that resonate with the clients. We engage in all the processes of production from 'concept' to 'post'. We create advertising films that are of high impact and create better brand recall.",
      },
      {
        icon: "play",
        title: "Digital Films",
        description:
          "We understand the digital audience. Each of our platform-native films entails cinematic storytelling and data informed creative strategy. With the combination of the two, we deliver thumb-stopping content that entertains, inspires, and drives tangible business results across YouTube, Instagram, and other platforms.",
      },
      {
        icon: "camera",
        title: "Brand Reels & Corporate Videos",
        description:
          "We transform brand personalities into compelling visuals. With a mix of authentic stories, cinematic quality, and platform specific optimization, our strategically constructed corporate films and reels build stakeholder trust, engage customers and enrich brand equity over the long term.",
      },
    ],
  },
  clients: {
    title: { lead: "Our", emphasis: "Clients" },
    description:
      "We've worked with big names. But every brand big or small gets the same love",
    items: [
      { name: "LuLu Hypermarket", image: img("/images/clients/lulu-hypermarket.png", "LuLu Hypermarket logo", 374, 261) },
      { name: "Regal Jewellers", image: img("/images/clients/regal-jewellers.png", "Regal Jewellers logo", 374, 261) },
      { name: "Eastern", image: img("/images/clients/eastern.png", "Eastern logo", 374, 261) },
      { name: "MTR", image: img("/images/clients/mtr.png", "MTR logo", 374, 261) },
      { name: "Gold Winner", image: img("/images/clients/gold-winner.png", "Gold Winner logo", 374, 261) },
      { name: "Milma", image: img("/images/clients/milma.png", "Milma logo", 374, 261) },
      { name: "Tata Coffee", image: img("/images/clients/tata-coffee.png", "Tata Coffee logo", 374, 261) },
      { name: "Nesto", image: img("/images/clients/nesto.png", "Nesto logo", 374, 261) },
    ],
  },
  testimonials: {
    title: { lead: "Featured", emphasis: "Stories" },
    description:
      "Our solutions are built to meet industry standards and regulatory requirements. We hold key certifications that ensure compliance,",
    items: [
      {
        company: { name: "LuLu Hypermarket" },
        tag: "Automotive",
        quote: longQuote,
        name: "Vibin N.V.",
        role: ["Head - Creative Operations", "LuLu Hypermarket"],
        photo: img("/images/home/testimonial-1.png", "Vibin N.V., Head - Creative Operations at LuLu Hypermarket", 1200, 1600, { x: 50, y: 20 }),
        videoId: "YPF9hUm4trM",
      },
      {
        company: {
          name: "Telit",
          logo: img("/images/home/telit-logo.svg", "Telit", 64, 34),
        },
        tag: "Utilities",
        quote: [
          "Our partnership with transight systems, the telematics supplier has been a game changer our fleet management operations.",
        ],
        name: "Anuja kumar",
        role: ["CEO"],
        photo: img("/images/home/testimonial-2.jpg", "Anuja kumar, CEO", 1500, 1000, { x: 62, y: 35 }),
      },
    ],
  },
};

export const defaultAbout: AboutData = {
  seo: {
    title: "About | Happiest People Productions",
    description:
      "We don't just make ads, we make people feel something. Meet the team and the beliefs behind Happiest People Productions.",
  },
  hero: {
    eyebrow: "About",
    titleLine1: "We Don't Just Make Ads ,",
    titleLine2: "We Make People Feel Something",
    cta: { label: "Contact us", href: "/contact-us" },
  },
  intro: {
    text: "It's authentic, sheer honesty and completely human. There's zero AI energy here. It stops people mid-scroll and directly addresses the essence of what Happiest People Productions is all about. That's your brand in a single line.",
    stats: [
      { value: "100+", label: "Customer globally" },
      { value: "300+", label: "Experts of team" },
    ],
  },
  careers: {
    title: { lead: "Ready to roll?", emphasis: "together" },
    description:
      "Got fire? Good, we've got the stage. At Happiest People Productions, we don't hire resumes we welcome creative souls, who live and breathe passion, pursue ideas, and won't settle for the mundane.",
    button: { label: "Careers", href: "/careers" },
    images: [
      img("/images/career-1.webp", "The Happiest People team laughing together on a terrace", 1772, 1202),
      img("/images/career-2.webp", "A teammate smiling at her desk", 1084, 1202),
      img("/images/career-3.webp", "A teammate sharing a laugh with colleagues", 1083, 1202),
    ],
  },
  beliefs: {
    title: { lead: "Our belief", emphasis: "system" },
    items: [
      {
        icon: "vision",
        title: "Our Vision",
        description:
          "To create something Unforgettable and Stay with Audience until the Screen turns Black!",
      },
      {
        icon: "mission",
        title: "Our Mission",
        description:
          "To bring our vision to life through films that made with a Full Heart and Extreme Clarity.",
      },
    ],
  },
  collage: {
    image: img(
      "/images/mask-text.webp",
      "HPC lettering made from film set and camera photographs",
      2083,
      828,
    ),
    title: "Talented Enough to Deliver. Passionate Enough to Care.",
    text: "We combine original creative concepts, ideas and plans implemented with discipline, and genuine dedication to every brand we collaborate with, because we believe that ‘good enough’’ has never been ‘good enough’",
  },
  insight: {
    title: { lead: "Insights from", emphasis: "the mastermind" },
    paragraphs: lines(
      "We at Happiest People Productions believe the most meaningful projects are always the result of buying into someone else's goals. We want to be that support system, that partner.\nWe focus on the smallest elements. This is where the core of the story is. The smallest elements testify of the details which make the difference.\nWe do not need to do too much to be successful. We are not trying to follow the systems that do not add any value to us. We focus on the things that are true, and genuine. Because of the collaborations and discipline, you can see the stories stick to people's minds and make unrelenting impressions.",
    ),
    authorName: "Nijay Jayan",
    authorRole: "Managing Director",
    portrait: img("/images/about/insights-portrait.webp", "Nijay Jayan", 934, 1178),
  },
};

const richParagraph = (text: string) => ({
  type: "paragraph",
  version: 1,
  direction: "ltr" as const,
  format: "" as const,
  indent: 0,
  textFormat: 0,
  children: [{ type: "text", version: 1, text, format: 0, detail: 0, mode: "normal", style: "" }],
});

const richList = (items: string[]) => ({
  type: "list",
  version: 1,
  listType: "bullet" as const,
  start: 1,
  tag: "ul" as const,
  direction: "ltr" as const,
  format: "" as const,
  indent: 0,
  children: items.map((text, index) => ({
    type: "listitem",
    version: 1,
    value: index + 1,
    direction: "ltr" as const,
    format: "" as const,
    indent: 0,
    children: [{ type: "text", version: 1, text, format: 0, detail: 0, mode: "normal", style: "" }],
  })),
});

const richText = (intro: string, bullets: string[]) =>
  ({
    root: {
      type: "root",
      version: 1,
      direction: "ltr",
      format: "",
      indent: 0,
      children: [richParagraph(intro), richList(bullets)],
    },
  }) as unknown as JobItem["description"];

export const defaultJobs: JobItem[] = [
  {
    id: "video-editor",
    title: "Video editor",
    type: "Remote - Full time",
    description: richText(
      "We are looking for a skilled video editor to join our creative team. The ideal candidate will have a strong portfolio showcasing their editing skills and a keen eye for detail.",
      [
        "Expertise in Adobe Premiere Pro, Final Cut Pro, or similar tools",
        "Ability to work with tight deadlines",
        "Experience with color grading and sound editing",
      ],
    ),
  },
  {
    id: "cinematographer",
    title: "Cinematographer",
    type: "Remote - Full time",
    description: richText(
      "We are looking for a talented cinematographer to join our team. The ideal candidate will have experience in various filming techniques and a strong portfolio.",
      [
        "Proficiency in camera operation and lighting",
        "Creative eye for visual storytelling",
        "Experience with commercial and documentary shoots",
      ],
    ),
  },
  {
    id: "model-male",
    title: "Model ( male )",
    type: "Remote - Full time",
    description: richText(
      "We are looking for a male model to join our team. The ideal candidate will have experience in various modeling techniques and a strong portfolio.",
      [
        "Previous experience in fashion or commercial modeling",
        "Comfortable in front of the camera",
        "Ability to take direction and adapt to different styles",
      ],
    ),
  },
];

export const defaultCareers: CareersData = {
  seo: {
    title: "Careers | Happiest People Productions",
    description:
      "Join the creative squad at Happiest People Productions. See current openings in video editing, cinematography and more.",
  },
  hero: {
    titleLine1: "Want to join",
    titleLine2: "our creative",
    titleEmphasis: "squad?",
    buttonLabel: "Current Openings",
    image: img(
      "/images/careers/hero.webp",
      "A film crew with cameras and lights on a misty set",
      1573,
      755,
    ),
  },
  culture: {
    title: { lead: "Shape your", emphasis: "career graph!" },
    description:
      "Happy People Production is incorporated with Talented People and High End Customers. This Opportunity can reshape your Career to Something Better and Bigger.",
    images: [
      img("/images/careers-tailored-1.webp", "Two colleagues working side by side at a desk", 459, 457),
      img("/images/careers-tailored-2.webp", "A teammate smiling during a break", 870, 804),
      img("/images/careers-tailored-3.webp", "A photographer lifting a film camera to his face", 563, 491),
    ],
  },
  openings: {
    title: { lead: "Current", emphasis: "openings" },
    emptyMessage:
      "There are no open roles right now. Check back soon, or send us your portfolio through the form below.",
  },
  application: {
    title: "Let's weave the visuals together!",
    text: "Consider This the Beginning of Something Great. Thank you for reaching out to Happiest People Productions — we'll be in touch shortly. Can't wait to create together.",
    departments: [
      "Video editing",
      "Cinematography",
      "Direction",
      "Production",
      "Modelling & casting",
      "Other",
    ],
  },
};

export const defaultCoverage: CoverageItem[] = [
  {
    id: "cinema-express",
    title: "Cinema Express",
    label: "Web series Review",
    publishedOn: "2026-01-30",
    image: img("/images/coverage/review-1.webp", "Cinema Express newspaper spread", 735, 548, { x: 50, y: 50 }),
  },
  {
    id: "mathrubumi-news",
    title: "Mathrubumi News",
    label: "Web series Review",
    publishedOn: "2026-01-30",
    image: img("/images/coverage/review-2.webp", "The Snack Break newspaper front page", 736, 736, { x: 50, y: 40 }),
  },
  {
    id: "grafica-magazine",
    title: "Cinema Express",
    label: "Web series Review",
    publishedOn: "2026-01-30",
    image: img("/images/coverage/review-3.webp", "Grafica magazine held open", 736, 1104, { x: 50, y: 44 }),
  },
  {
    id: "green-gazette",
    title: "Mathrubumi News",
    label: "Web series Review",
    publishedOn: "2026-01-30",
    image: img("/images/coverage/review-4.webp", "A stack of The Green Gazette newspapers", 736, 981, { x: 50, y: 41 }),
  },
  {
    id: "samso-news",
    title: "Cinema Express",
    label: "Web series Review",
    publishedOn: "2026-01-30",
    image: img("/images/coverage/review-5.webp", "Samso News on a wooden table", 736, 736, { x: 50, y: 50 }),
  },
  {
    id: "weekly-review",
    title: "Mathrubumi News",
    label: "Web series Review",
    publishedOn: "2026-01-30",
    image: img("/images/coverage/review-6.webp", "Hands holding a broadsheet newspaper", 736, 736, { x: 50, y: 37 }),
  },
];

export const defaultClientsPage: ClientsPageData = {
  seo: {
    title: "Clients & media coverage | Happiest People Productions",
    description:
      "The brands we have worked with and the press that has covered our work.",
  },
  clients: defaultHome.clients,
  coverage: {
    title: "Media Coverage & Reviews",
    description: "Press coverage and reviews of our work from leading publications",
    items: defaultCoverage,
  },
};

export const defaultWorksPage: WorksPageData = {
  seo: {
    title: "Works | Happiest People Productions",
    description:
      "Commercials, series and music videos produced by Happiest People Productions.",
  },
  title: { lead: "Our", emphasis: "works" },
  emptyMessage: "No films in this category yet. Check back soon.",
  items: defaultWorks,
};

export const defaultContactServices = [
  "TV & theatre commercials",
  "Digital films",
  "Brand reels & corporate videos",
  "Product shoots",
  "Other",
];

export const DEFAULT_MAP_QUERY =
  "Happiest People Productions, Aloor Road, Perumannu, Kechery, Thrissur, Kerala 680501";

export const defaultContactPage: ContactPageData = {
  title: "Contact us",
  description:
    "Tell us about your project, or visit our studio in Kechery, Thrissur.",
  seo: {
    title: "Contact us | Happiest People Productions",
    description:
      "Tell us about your project. Visit our studio in Kechery, Thrissur or send us a message.",
  },
  officeImage: img(
    "/images/contact/office.webp",
    "The Happiest People Productions studio building with the yellow logo on its dark facade",
    605,
    629,
  ),
  mapEmbedUrl: buildMapEmbedUrl(DEFAULT_MAP_QUERY),
  services: defaultContactServices,
  contact: defaultSite.contact,
};

// Placeholder reels so the page is not empty before editors add real ones.
// They reuse photos already on the site and link to the Instagram home page.
const sampleReel = (
  id: string,
  title: string,
  url: string,
  alt: string,
  width: number,
  height: number,
  focal: { x: number; y: number },
  category: BtsItem["category"] = "commercials",
): BtsItem => ({
  id,
  title,
  category,
  url: "https://www.instagram.com/",
  image: img(url, alt, width, height, focal),
});

export const defaultBts: BtsItem[] = [
  sampleReel("sample-1", "On set with the crew", "/images/career-1.webp", "The team laughing together on a terrace", 1772, 1202, { x: 38, y: 50 }),
  sampleReel("sample-2", "Studio walkthrough", "/images/home/workspace-office-1.webp", "The meeting room and editing desks in the studio", 1920, 1080, { x: 62, y: 50 }),
  sampleReel("sample-3", "Behind the lens", "/images/careers-tailored-3.webp", "A photographer lifting a film camera to his face", 563, 491, { x: 50, y: 40 }),
  sampleReel("sample-4", "Colour and styling", "/images/work-5.webp", "A dancer in a flowing red dress", 1534, 863, { x: 52, y: 50 }),
  sampleReel("sample-5", "Product close-ups", "/images/work-3.webp", "A silver necklace on dark fabric", 1534, 863, { x: 62, y: 45 }),
  sampleReel("sample-6", "Lighting setup", "/images/work-4.webp", "A perfume bottle splashing in water", 1533, 863, { x: 50, y: 50 }),
  sampleReel("sample-7", "Team day", "/images/career-3.webp", "Colleagues sharing a laugh", 1083, 1202, { x: 50, y: 40 }, "series"),
  sampleReel("sample-8", "Music video day", "/images/work-1.webp", "A man in earbuds against a yellow backdrop", 1533, 863, { x: 40, y: 50 }, "promo"),
];

export const defaultBtsPage: BehindTheScenePageData = {
  seo: {
    title: "Behind the scene | Happiest People Productions",
    description:
      "An inside look at our creative process and the team in action, from set to edit.",
  },
  title: "Behind the scene",
  description: "Get an inside look at our creative process and team in action",
  emptyMessage: "No reels in this category yet. Check back soon.",
  items: defaultBts,
};
