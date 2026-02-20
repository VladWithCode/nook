"use client";

import { AboutContent, AboutSection } from "@/types/content";
import { TextEditor } from "@/components/admin/TextEditor";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { Button } from "@/components/ui/button";
import { Save, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { saveAboutAction } from "./_actions";

import { use, useState } from "react";

export function PageContent({ contentPromise }: { contentPromise: Promise<AboutContent> }) {
    const content = use(contentPromise);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
    const [draft, setDraft] = useState<AboutContent>(content);

    const handleSave = async () => {
        if (!draft) return;

        setSaving(true);
        await saveAboutAction(content);
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const addSection = () => {
        if (!draft) return;
        const newId = `section-${Date.now()}`;
        const newSection: AboutSection = {
            id: newId,
            title: "Nueva sección",
            content: "Nuevo contenido...",
            images: []
        };
        setDraft({
            ...draft,
            sections: [...draft.sections, newSection]
        });
        setExpandedSections(prev => ({ ...prev, [newId]: true }));
    };

    const removeSection = (id: string) => {
        if (!draft) return;
        setDraft({
            ...draft,
            sections: draft.sections.filter(s => s.id !== id)
        });
    };

    const updateSection = (id: string, updates: Partial<AboutSection>) => {
        if (!draft) return;
        setDraft({
            ...draft,
            sections: draft.sections.map(s => s.id === id ? { ...s, ...updates } : s)
        });
    };

    const toggleSectionExpand = (id: string) => {
        setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
    };

    if (!draft) {
        return <div className="p-6 text-white/60">Cargando...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Acerca de Nosotros</h1>
                    <p className="text-white/70 mt-2">
                        Administra el contenido de la página &quot;Acerca de Nook&quot;
                    </p>
                </div>
                <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-green-600 hover:bg-green-700"
                >
                    <Save className="mr-2 h-4 w-4" />
                    {saving ? "Guardando..." : saved ? "¡Guardado!" : "Guardar cambios"}
                </Button>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 p-6 space-y-6">
                <h2 className="text-xl font-semibold text-white">Imágenes del Hero</h2>

                <div className="grid grid-cols-3 gap-4">
                    {draft.heroImages.map((img, index) => (
                        <MediaUploader
                            key={index}
                            label={`Imagen ${index + 1}`}
                            value={img}
                            onChange={(value) => {
                                const newImages = [...draft.heroImages];
                                newImages[index] = value;
                                setDraft({ ...draft, heroImages: newImages });
                            }}
                            accept="image"
                        />
                    ))}
                </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 p-6 space-y-6">
                <h2 className="text-xl font-semibold text-white">Texto de Introducción</h2>

                <TextEditor
                    label="Intro"
                    value={draft.introText}
                    onChange={(value) => setDraft({ ...draft, introText: value })}
                    multiline
                />
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white">Secciones</h2>
                    <Button onClick={addSection} className="text-gray-50/80 border border-current/30 hover:border-current/80 hover:text-gray-50 hover:cursor-pointer active:scale-98">
                        <Plus className="mr-2 h-4 w-4" />
                        Añadir Sección
                    </Button>
                </div>

                {draft.sections.map((section) => (
                    <div key={section.id} className="rounded-lg border border-white/10 bg-black/20">
                        <div
                            className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5"
                            onClick={() => toggleSectionExpand(section.id)}
                        >
                            <span className="text-white font-medium">{section.title}</span>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); removeSection(section.id); }}
                                    className="p-1 hover:bg-red-500/20 rounded"
                                >
                                    <Trash2 className="h-4 w-4 text-red-400" />
                                </button>
                                {expandedSections[section.id] ? (
                                    <ChevronUp className="h-4 w-4 text-white/60" />
                                ) : (
                                    <ChevronDown className="h-4 w-4 text-white/60" />
                                )}
                            </div>
                        </div>

                        {expandedSections[section.id] && (
                            <div className="p-4 pt-0 space-y-4 border-t border-white/10">
                                <TextEditor
                                    label="Título"
                                    value={section.title}
                                    onChange={(value) => updateSection(section.id, { title: value })}
                                />
                                <TextEditor
                                    label="Contenido"
                                    value={section.content}
                                    onChange={(value) => updateSection(section.id, { content: value })}
                                    multiline
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 p-6 space-y-6">
                <h2 className="text-xl font-semibold text-white">CTA</h2>

                <TextEditor
                    label="Texto del botón"
                    value={draft.ctaText}
                    onChange={(value) => setDraft({ ...content, ctaText: value })}
                />
            </div>
        </div>
    );
}
