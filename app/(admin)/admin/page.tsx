import { MessageSquare, Users, FileText } from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
    const quickActions = [
        {
            title: "Ver Contactos",
            description: "Revisa las solicitudes de contacto recibidas",
            href: "/admin/contacts/details",
            icon: MessageSquare,
        },
        {
            title: "Gestionar Usuarios",
            description: "Administra los usuarios del sistema",
            href: "/admin/users",
            icon: Users,
        },
        {
            title: "Editar Contenido",
            description: "Actualiza el contenido del sitio web",
            href: "/admin/content",
            icon: FileText,
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Bienvenido al Panel de Administración</h1>
                <p className="text-white/70 mt-2">
                    Aquí puedes administrar el contenido y los usuarios del sitio
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                        <Link
                            key={action.href}
                            href={action.href}
                            className="group relative flex flex-col gap-2 rounded-lg border border-white/10 bg-white/5 p-6 transition-all hover:bg-white/10"
                        >
                            <Icon className="h-8 w-8 text-white/60" />
                            <h2 className="text-xl font-semibold">{action.title}</h2>
                            <p className="text-white/70">{action.description}</p>
                        </Link>
                    );
                })}
            </div>

            <div className="rounded-lg border border-green-500/30 bg-green-950/10 p-6">
                <h2 className="text-xl font-semibold text-green-400">Acciones Rápidas</h2>
                <ul className="mt-4 space-y-2 text-white/80">
                    <li>• Revisar las solicitudes de contacto más recientes</li>
                    <li>• Gestionar los usuarios del sistema</li>
                    <li>• Actualizar el contenido de las páginas</li>
                </ul>
            </div>
        </div>
    );
}
