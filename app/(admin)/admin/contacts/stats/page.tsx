export default function ContactsStatsPage() {
    const stats = [
        {
            title: "Hoy",
            value: "0",
            description: "Solicitudes recibidas hoy",
        },
        {
            title: "Este Fin de Semana",
            value: "0",
            description: "Solicitudes recibidas este fin de semana",
        },
        {
            title: "Este Mes",
            value: "0",
            description: "Solicitudes recibidas este mes",
        },
        {
            title: "Total",
            value: "0",
            description: "Total de solicitudes recibidas",
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Estadísticas de Contactos</h1>
                <p className="text-white/70 mt-2">
                    Visualiza las estadísticas de las solicitudes de contacto recibidas
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div
                        key={stat.title}
                        className="rounded-lg border border-white/10 bg-white/5 p-6"
                    >
                        <h3 className="text-sm font-medium text-white/60">{stat.title}</h3>
                        <p className="mt-2 text-4xl font-bold">{stat.value}</p>
                        <p className="mt-1 text-sm text-white/40">{stat.description}</p>
                    </div>
                ))}
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                <h2 className="text-xl font-semibold mb-4">Próximamente</h2>
                <p className="text-white/60">
                    Aquí se mostrará un gráfico de las solicitudes recibidas a lo largo del tiempo.
                </p>
            </div>
        </div>
    );
}
