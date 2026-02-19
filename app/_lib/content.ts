'use server';

import fs from 'node:fs';
import path from 'node:path';
import { SiteContent, ServicesContent, AboutContent, PortfolioContent, ContactContent, HomeContent } from '@/types/content';

const CONFIG_PATH = path.join(process.cwd(), 'config', 'site-content.json');

export async function getContent(): Promise<SiteContent> {
    const fileContent = fs.readFileSync(CONFIG_PATH, 'utf-8');
    return JSON.parse(fileContent) as SiteContent;
}

export async function getHomeContent(): Promise<HomeContent> {
    const res = await getContent();
    return res.home;
}

export async function getServicesContent(): Promise<ServicesContent> {
    const res = await getContent();
    return res.services;
}

export async function getAboutContent(): Promise<AboutContent> {
    const res = await getContent();
    return res.about;
}

export async function getPortfolioContent(): Promise<PortfolioContent> {
    const res = await getContent();
    return res.portfolio;
}

export async function getContactContent(): Promise<ContactContent> {
    const res = await getContent();
    return res.contact;
}

export async function saveContent(content: SiteContent): Promise<void> {
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(content, null, 4), 'utf-8');
}

export async function saveServicesContent(services: ServicesContent): Promise<void> {
    const content = await getContent();
    content.services = services;
    saveContent(content);
}

export async function saveAboutContent(about: AboutContent): Promise<void> {
    const content = await getContent();
    content.about = about;
    saveContent(content);
}

export async function savePortfolioContent(portfolio: PortfolioContent): Promise<void> {
    const content = await getContent();
    content.portfolio = portfolio;
    saveContent(content);
}

export async function saveContactContent(contact: ContactContent): Promise<void> {
    const content = await getContent();
    content.contact = contact;
    saveContent(content);
}

export async function saveHomeContent(home: HomeContent): Promise<void> {
    const content = await getContent();
    content.home = home;
    saveContent(content);
}

// export function revalidateContentPages(): void {
//   revalidatePath('/');
//   revalidatePath('/nuestros-servicios');
//   revalidatePath('/acerca-de-nosotros');
//   revalidatePath('/nuestro-trabajo');
//   revalidatePath('/contacto');
// }
