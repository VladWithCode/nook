"use client";

import { saveHomeContent } from "@/app/_lib/content";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { TextEditor } from "@/components/admin/TextEditor";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HomeBigCard, HomeContent, HomeFeaturedProject, HomeIncentiveItem } from "@/types/content";
import { Save } from "lucide-react";
import { use, useState } from "react";

type TSavingStatus = "idle" | "saving" | "saved";

export function PageContent({ contentPromise }: {
    contentPromise: Promise<HomeContent>
}) {
    const content = use(contentPromise);
    const [draft, setDraft] = useState(content);
    const [savingStatus, setSavingStatus] = useState<TSavingStatus>("idle");

    const handleSave = async () => {
        if (!content) return;
        setSavingStatus("saving");
        await saveHomeContent(draft)
        setSavingStatus("saved");
        setTimeout(() => setSavingStatus("idle"), 1500);
    }

    const updateIncentiveData = (idx: number, data: HomeIncentiveItem) => {
        setDraft(draft => {
            const newIncentives: HomeIncentiveItem[] = [];
            for (let i = 0; i < draft.introIncentives.length; i++) {
                let item = draft.introIncentives[i];
                if (i === idx) {
                    item = data;
                }
                newIncentives[i] = item
            }

            draft.introIncentives = newIncentives
            return draft;
        });
    }

    const updateBigCardData = (idx: number, data: HomeBigCard) => {
        setDraft(draft => {
            const newCards: HomeBigCard[] = [];
            for (let i = 0; i < draft.bigCards.length; i++) {
                let item = draft.bigCards[i];
                if (i === idx) {
                    item = data;
                }
                newCards[i] = item
            }

            draft.bigCards = newCards
            return draft;
        });
    }

    const updateFeaturedProjectData = (idx: number, data: HomeFeaturedProject) => {
        setDraft(draft => {
            const newProjects: HomeFeaturedProject[] = [];
            for (let i = 0; i < draft.featuredProjects.length; i++) {
                let item = draft.featuredProjects[i];
                if (i === idx) {
                    item = data;
                }
                newProjects[i] = item
            }

            draft.featuredProjects = newProjects
            return draft;
        });
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Portafolio</h1>
                    <p className="text-white/70 mt-2">
                        Administra los proyectos del portafolio
                    </p>
                </div>
                <Button
                    onClick={handleSave}
                    disabled={savingStatus !== "idle"}
                    className="bg-green-600 hover:bg-green-700"
                >
                    <Save className="mr-2 h-4 w-4" />
                    {savingStatus === "saving"
                        ? "Guardando..."
                        : savingStatus === "saved"
                            ? "¡Guardado!"
                            : "Guardar cambios"}
                </Button>
            </div>

            <div className="rounded-lg border border-gray-50/10 bg-gray-50/5 p-6 space-y-6">
                <h2 className="text-xl font-semibold text-gray-50">Video Principal</h2>
                <MediaUploader
                    label="Pideo principal"
                    value={content.heroMedia}
                    onChange={(value) => setDraft(draft => ({
                        ...draft,
                        heroMedia: value,
                    }))}
                />
                <SelectGroup>
                    <SelectLabel>Tipo de Medio</SelectLabel>
                    <Select defaultValue={content.heroMediaKind}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="image">Imágen</SelectItem>
                            <SelectItem value="video">Video</SelectItem>
                        </SelectContent>
                    </Select>
                </SelectGroup>
            </div>

            <div className="rounded-lg border border-gray-50/10 bg-gray-50/5 p-6 space-y-6">
                <h2 className="text-xl font-semibold text-gray-50">Sección de Presentación</h2>

                <TextEditor
                    label="Descripción de Nöok"
                    value={content.introText}
                    onChange={value => setDraft(draft => ({ ...draft, introText: value }))}
                />

                <TextEditor
                    label="Texto CTA"
                    value={content.ctaText}
                    onChange={value => setDraft(draft => ({ ...draft, ctaText: value }))}
                />
                <TextEditor
                    label="Enlace CTA"
                    value={content.ctaLink}
                    onChange={value => setDraft(draft => ({ ...draft, ctaLink: value }))}
                />

                <div className="flex gap-6">
                    {
                        content.introIncentives.map((item, idx) => (
                            <div className="flex-1 rounded-lg border border-gray-50/10 bg-gray-50/5 p-6 space-y-6" key={item.title}>
                                <h3 className="font-semibold">Texto Incentivo {idx + 1}</h3>

                                <TextEditor
                                    value={item.title}
                                    label="Título"
                                    onChange={(value) => updateIncentiveData(idx, {
                                        title: value,
                                        description: item.description,
                                    })}
                                />

                                <TextEditor
                                    value={item.description}
                                    label="Descripción"
                                    onChange={(value) => updateIncentiveData(idx, {
                                        title: item.title,
                                        description: value,
                                    })}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="rounded-lg border border-gray-50/10 bg-gray-50/5 p-6 space-y-6">
                <h2 className="text-xl font-semibold text-gray-50">Sección Proyectos con Medios</h2>

                <div className="flex gap-6">
                    {
                        content.bigCards.map((item, idx) => (
                            <div className="flex-1 rounded-lg border border-gray-50/10 bg-gray-50/5 p-6 space-y-6" key={item.title}>
                                <h3 className="font-semibold">Proyecto con Medios {idx + 1}</h3>

                                <MediaUploader
                                    label="Medios del proyecto"
                                    value={item.media}
                                    onChange={(value) => (updateBigCardData(idx, {
                                        ...item,
                                        media: value,
                                    }))}
                                />

                                <SelectGroup>
                                    <SelectLabel>Tipo de Medio</SelectLabel>
                                    <Select defaultValue={item.mediaKind}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="image">Imágen</SelectItem>
                                            <SelectItem value="video">Vídeo</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </SelectGroup>

                                <TextEditor
                                    value={item.title}
                                    label="Título"
                                    onChange={(value) => updateBigCardData(idx, {
                                        ...item,
                                        title: value,
                                    })}
                                />

                                <TextEditor
                                    value={item.description}
                                    label="Descripción"
                                    multiline
                                    onChange={(value) => updateBigCardData(idx, {
                                        ...item,
                                        description: value,
                                    })}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="rounded-lg border border-gray-50/10 bg-gray-50/5 p-6 space-y-6">
                <h2 className="text-xl font-semibold text-gray-50">Proyectos con Logo</h2>

                <div className="grid grid-cols-2 gap-6">
                    {
                        content.featuredProjects.map((item, idx) => (
                            <div className="basis-1/3 shrink grow rounded-lg border border-gray-50/10 bg-gray-50/5 p-6 space-y-6" key={item.title}>
                                <h3 className="font-semibold">Proyecto con Logo {idx + 1}</h3>

                                <MediaUploader
                                    label="Logo del proyecto"
                                    value={item.logo}
                                    onChange={(value) => (updateFeaturedProjectData(idx, {
                                        ...item,
                                        logo: value,
                                    }))}
                                    accept="image"
                                />

                                <TextEditor
                                    value={item.title}
                                    label="Título"
                                    onChange={(value) => updateFeaturedProjectData(idx, {
                                        ...item,
                                        title: value,
                                    })}
                                />

                                <TextEditor
                                    value={item.description}
                                    label="Descripción"
                                    multiline
                                    onChange={(value) => updateFeaturedProjectData(idx, {
                                        ...item,
                                        description: value,
                                    })}
                                />

                                <TextEditor
                                    value={item.link}
                                    label="Enlace"
                                    onChange={(value) => updateFeaturedProjectData(idx, {
                                        ...item,
                                        link: value,
                                    })}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="rounded-lg border border-gray-50/10 bg-gray-50/5 p-6 space-y-6">
                <h2 className="text-xl font-semibold">Sección de Mosáicos</h2>

                <TextEditor
                    label="Título"
                    value={content.squaresSection.title}
                    onChange={value => setDraft(draft => ({
                        ...draft,
                        squaresSection: {
                            description: draft.squaresSection.description,
                            title: value,
                        },
                    }))}
                />

                <TextEditor
                    label="Descripción"
                    value={content.squaresSection.description}
                    multiline
                    onChange={value => setDraft(draft => ({
                        ...draft,
                        squaresSection: {
                            title: draft.squaresSection.title,
                            description: value,
                        },
                    }))}
                />
            </div>

        </div >
    );
}
