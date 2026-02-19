export interface HomeFeaturedProject {
    title: string;
    logo: string;
    description: string;
    link: string;
}

export interface HomeIncentiveItem {
    title: string;
    description: string;
}

export interface HomeBigCard {
    title: string;
    media: string;
    mediaKind: "image" | "video";
    description: string;
    link: string;
}

export interface HomeContent {
    heroMedia: string;
    heroMediaKind: "image" | "video";
    slogan1: string;
    slogan2: string;
    introText: string;
    introIncentives: HomeIncentiveItem[];
    ctaText: string;
    ctaLink: string;
    featuredProjects: HomeFeaturedProject[];
    bigCards: HomeBigCard[];
    squaresSection: {
        title: string;
        description: string;
    }
}

export interface ServicePlan {
    id: string;
    title: string;
    price: string;
    features: string[];
    image: string;
    ctaText: string;
    theme: "default" | "dark" | "special";
}

export interface ServicesContent {
    heroVideo: string;
    marqueeText: string;
    introText1: string;
    introText2: string;
    ctaText: string;
    plans: ServicePlan[];
}

export interface AboutSection {
    id: string;
    title: string;
    content: string;
    images: string[];
}

export interface AboutContent {
    heroImages: string[];
    introText: string;
    sections: AboutSection[];
    ctaText: string;
}

export interface PortfolioMedia {
    src: string;
    alt: string;
    kind: "image" | "video";
    width: number;
    height: number;
    position?: "left" | "right" | "full";
    mimeType?: string;
    key: string;
}

export interface PortfolioProject {
    id: string;
    title: string;
    description: string;
    bg: string;
    bgKind: "video" | "image";
    bgMimeType: string;
    link: string;
    media: PortfolioMedia[];
}

export interface PortfolioContent {
    projects: PortfolioProject[];
}

export interface ContactContent {
    phone: string;
    email: string;
    address: string;
    hours: string;
    heroImage: string;
}

export interface SiteContent {
    home: HomeContent;
    services: ServicesContent;
    about: AboutContent;
    portfolio: PortfolioContent;
    contact: ContactContent;
}
