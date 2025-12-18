import { motion } from 'framer-motion';

const clients = [
    { name: 'Client 1', logo: '/src/assets/client-logo-1.png' },
    { name: 'Client 2', logo: '/src/assets/client-logo-2.png' },
    { name: 'Client 3', logo: '/src/assets/client-logo-3.png' },
    { name: 'Client 4', logo: '/src/assets/client-logo-4.png' },
    { name: 'Client 5', logo: '/src/assets/client-logo-5.png' },
    { name: 'Client 6', logo: '/src/assets/client-logo-6.png' },
];

const OurClientsSection = () => {
    return (
        <section id="clients" className="py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-glow-violet/5 to-transparent pointer-events-none" />

            <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-primary text-sm font-semibold uppercase tracking-wider">
                        Trusted By Industry Leaders
                    </span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Clients</span>
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        We're proud to partner with innovative companies across industries
                    </p>
                </div>

                {/* Client Logos Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
                    {clients.map((client, index) => (
                        <motion.div
                            key={client.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-center justify-center p-6 glass-card rounded-xl hover:scale-105 transition-transform duration-300"
                        >
                            <img
                                src={client.logo}
                                alt={client.name}
                                className="w-full h-auto max-w-[120px] opacity-70 hover:opacity-100 transition-opacity"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurClientsSection;
