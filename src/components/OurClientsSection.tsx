import { motion } from 'framer-motion';
import aiimsLogo from '@/assets/AIIMS Anaesthesia.png';
import creativePujariLogo from '@/assets/Creative Pujari.png';
import sqrftLogo from '@/assets/SQRFT.png';
import shilpaniLogo from '@/assets/Shilpani art and craft.jpg';
import travelPujariLogo from '@/assets/Travel pujari.png';
import wakadeLogo from '@/assets/Wakade.jpeg';
import dookLogo from '@/assets/Dook International.png';

const clients = [
    { name: 'Dook International', logo: dookLogo },
    { name: 'AIIMS Anaesthesia', logo: aiimsLogo },
    { name: 'Creative Pujari', logo: creativePujariLogo },
    { name: 'SQRFT', logo: sqrftLogo },
    { name: 'Shilpani Art and Craft', logo: shilpaniLogo },
    { name: 'Travel Pujari', logo: travelPujariLogo },
    { name: 'Wakade', logo: wakadeLogo },
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
                            className="glass-card group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:translate-y-[-8px] hover:shadow-2xl hover:shadow-primary/10 border border-foreground/10"
                        >
                            {/* Logo Container (Top Half) */}
                            <div className="relative h-40 flex items-center justify-center p-8 bg-foreground/3 overflow-hidden">
                                <img
                                    src={client.logo}
                                    alt={client.name}
                                    className="max-w-full max-h-full object-contain opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                                />
                            </div>

                            {/* Content Container (Bottom Half) */}
                            <div className="p-5 flex flex-col items-center justify-center bg-background/20 flex-grow">
                                <h3 className="text-base font-display font-bold text-center group-hover:text-primary transition-colors duration-300 line-clamp-1">
                                    {client.name}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurClientsSection;

