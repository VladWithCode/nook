"use client";

import { useState, useEffect } from "react";
import { PortfolioContent, PortfolioProject, PortfolioMedia } from "@/types/content";
import { getPortfolioContent } from "@/app/_lib/content";
import { TextEditor } from "@/components/admin/TextEditor";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { Button } from "@/components/ui/button";
import { Save, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { savePortfolioAction } from "./_actions";

export default function PortfolioContentPage() {
    const [content, setContent] = useState<PortfolioContent | null>(null);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({});

    useEffect(() => {
        getPortfolioContent().then(data => {
            setContent(data);
            const initialExpanded: Record<string, boolean> = {};
            data.projects.forEach(project => {
                initialExpanded[project.id] = true;
            });
            setExpandedProjects(initialExpanded);
        });
    }, []);

    const handleSave = async () => {
        if (!content) return;
        setSaving(true);
        await savePortfolioAction(content);
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const addProject = () => {
        if (!content) return;
        const newId = `project-${Date.now()}`;
        const newProject: PortfolioProject = {
            id: newId,
            title: "Nuevo Proyecto",
            description: "Descripción del proyecto...",
            bg: "",
            bgKind: "image",
            bgMimeType: "image/jpeg",
            link: "",
            media: []
        };
        setContent({
            ...content,
            projects: [...content.projects, newProject]
        });
        setExpandedProjects(prev => ({ ...prev, [newId]: true }));
    };

    const removeProject = (id: string) => {
        if (!content) return;
        setContent({
            ...content,
            projects: content.projects.filter(p => p.id !== id)
        });
    };

    const updateProject = (id: string, updates: Partial<PortfolioProject>) => {
        if (!content) return;
        setContent({
            ...content,
            projects: content.projects.map(p => p.id === id ? { ...p, ...updates } : p)
        });
    };

    const toggleProjectExpand = (id: string) => {
        setExpandedProjects(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const addMedia = (projectId: string) => {
        if (!content) return;
        const project = content.projects.find(p => p.id === projectId);
        if (!project) return;
        const newMedia: PortfolioMedia = {
            src: "",
            alt: "Nueva imagen",
            kind: "image",
            width: 800,
            height: 600,
            key: `media-${Date.now()}`
        };
        updateProject(projectId, { media: [...project.media, newMedia] });
    };

    const updateMedia = (projectId: string, mediaIndex: number, updates: Partial<PortfolioMedia>) => {
        if (!content) return;
        const project = content.projects.find(p => p.id === projectId);
        if (!project) return;
        const newMedia = [...project.media];
        newMedia[mediaIndex] = { ...newMedia[mediaIndex], ...updates };
        updateProject(projectId, { media: newMedia });
    };

    const removeMedia = (projectId: string, mediaIndex: number) => {
        if (!content) return;
        const project = content.projects.find(p => p.id === projectId);
        if (!project) return;
        const newMedia = project.media.filter((_, i) => i !== mediaIndex);
        updateProject(projectId, { media: newMedia });
    };

    if (!content) {
        return <div className="p-6 text-white/60">Cargando...</div>;
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
                    disabled={saving}
                    className="bg-green-600 hover:bg-green-700"
                >
                    <Save className="mr-2 h-4 w-4" />
                    {saving ? "Guardando..." : saved ? "¡Guardado!" : "Guardar cambios"}
                </Button>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white">Proyectos</h2>
                    <Button onClick={addProject} className="text-gray-50/80 border border-current/30 hover:border-current/80 hover:text-gray-50 hover:cursor-pointer">
                        <Plus className="mr-2 h-4 w-4" />
                        Añadir Proyecto
                    </Button>
                </div>

                {content.projects.map((project) => (
                    <div key={project.id} className="rounded-lg border border-white/10 bg-black/20">
                        <div
                            className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5"
                            onClick={() => toggleProjectExpand(project.id)}
                        >
                            <span className="text-white font-medium">{project.title}</span>
                            <div className="flex items-center gap-2">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={(e) => { e.stopPropagation(); removeProject(project.id); }}
                                    className="p-1 hover:bg-red-500/20 rounded"
                                >
                                    <Trash2 className="h-4 w-4 text-red-400" />
                                </Button>
                                {expandedProjects[project.id] ? (
                                    <ChevronUp className="h-4 w-4 text-white/60" />
                                ) : (
                                    <ChevronDown className="h-4 w-4 text-white/60" />
                                )}
                            </div>
                        </div>

                        {expandedProjects[project.id] && (
                            <div className="p-4 pt-0 space-y-4 border-t border-white/10">
                                <TextEditor
                                    label="Título"
                                    value={project.title}
                                    onChange={(value) => updateProject(project.id, { title: value })}
                                />
                                <TextEditor
                                    label="Descripción"
                                    value={project.description}
                                    onChange={(value) => updateProject(project.id, { description: value })}
                                    multiline
                                />
                                <TextEditor
                                    label="Enlace"
                                    value={project.link}
                                    onChange={(value) => updateProject(project.id, { link: value })}
                                />
                                <MediaUploader
                                    label="Video de fondo"
                                    value={project.bg}
                                    onChange={(value) => updateProject(project.id, { bg: value })}
                                    accept="video/*"
                                />

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label className="text-white/80">Multimedia</label>
                                        <Button
                                            type="button"
                                            onClick={() => addMedia(project.id)}
                                            className="text-gray-50/80 border border-current/30 hover:border-current/80 hover:text-gray-50 hover:cursor-pointer"
                                        >
                                            <Plus className="mr-1 h-3 w-3" />
                                            Añadir
                                        </Button>
                                    </div>
                                    {project.media.map((media, mIndex) => (
                                        <div key={mIndex} className="p-3 bg-white/5 rounded-lg space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-white/60 text-sm">Elemento {mIndex + 1}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeMedia(project.id, mIndex)}
                                                    className="p-1 hover:bg-red-500/20 rounded"
                                                >
                                                    <Trash2 className="h-3 w-3 text-red-400" />
                                                </button>
                                            </div>
                                            <MediaUploader
                                                label=""
                                                value={media.src}
                                                onChange={(value) => updateMedia(project.id, mIndex, { src: value })}
                                            />
                                            <div className="grid grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    value={media.alt}
                                                    onChange={(e) => updateMedia(project.id, mIndex, { alt: e.target.value })}
                                                    placeholder="Texto alternativo"
                                                    className="bg-white/5 border border-white/10 text-white rounded-md px-3 py-2 text-sm"
                                                />
                                                <select
                                                    value={media.kind}
                                                    onChange={(e) => updateMedia(project.id, mIndex, { kind: e.target.value as "image" | "video" })}
                                                    className="bg-white/5 border border-white/10 text-white rounded-md px-3 py-2 text-sm"
                                                >
                                                    <option value="image">Imagen</option>
                                                    <option value="video">Video</option>
                                                </select>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
