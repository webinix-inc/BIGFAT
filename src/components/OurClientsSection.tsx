import { motion } from 'framer-motion';
import aiimsLogo from '@/assets/AIIMS ANAESTHESIA.jpeg';
import creativePujariLogo from '@/assets/Creative Pujari.png';
import sqrftLogo from '@/assets/SQRFT.png';
import shilpaniLogo from '@/assets/Shilpani art and craft.png';
import travelPujariLogo from '@/assets/Travel pujari.png';
import wakadeLogo from '@/assets/Wakade Classes.jpeg';
import dookLogo from '@/assets/Dook International.png';
import aiobLogo from '@/assets/AIOB.jpeg';
import akjLogo from '@/assets/AKJ Academy.webp';
import hallekLogo from '@/assets/Hallek Technologies.jpeg';
import cosmosLogo from '@/assets/Cosmos Bakery.jpeg';
import houseLogo from '@/assets/House Technologies.jpeg';

const clients = [
    { name: 'Dook International', logo: dookLogo },
    { name: 'AIOB', logo: aiobLogo },
    { name: 'AKJ Academy', logo: akjLogo },
    { name: 'Hallek Technologies', logo: hallekLogo },
    { name: 'Cosmos Bakery', logo: cosmosLogo },
    { name: 'House Technologies', logo: houseLogo },
    { name: 'AIIMS Anaesthesia', logo: aiimsLogo },
    { name: 'Creative Pujari', logo: creativePujariLogo },
    { name: 'SQRFT Infratech', logo: sqrftLogo },
    { name: 'Shilpani Art and Craft', logo: shilpaniLogo },
    { name: 'Travel Pujari', logo: travelPujariLogo },
    { name: 'Wakade Classes', logo: wakadeLogo },
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

                {/* Client Logos Marquee */}
                <div className="relative flex overflow-hidden py-8">
                    <motion.div
                        className="flex whitespace-nowrap gap-8 items-center"
                        animate={{
                            x: ["0%", "-50%"],
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 30,
                                ease: "linear",
                            },
                        }}
                    >
                        {/* Double the list for seamless looping */}
                        {[...clients, ...clients].map((client, index) => (
                            <div
                                key={`${client.name}-${index}`}
                                className="inline-block px-4 shrink-0 transition-all duration-500"
                            >
                                <div className="group flex flex-col w-32 h-44 hover:translate-y-[-4px] transition-all duration-500">
                                    <div className={`aspect-square bg-white rounded-xl flex items-center justify-center relative overflow-hidden border border-white shadow-[0_8px_20px_rgba(0,0,0,0.12)] group-hover:shadow-[0_15px_30px_rgba(var(--primary-rgb),0.15)] transition-all duration-500 ${(client.name.includes('SQRFT') || client.name.includes('Shilpani') || client.name.includes('Cosmos') || client.name.includes('House')) ? 'p-1' : 'p-3'
                                        }`}>
                                        <img
                                            src={client.logo}
                                            alt={client.name}
                                            className={`w-full h-full object-contain group-hover:scale-125 transition-transform duration-700 relative z-10 ${(client.name.includes('SQRFT') || client.name.includes('Shilpani') || client.name.includes('Cosmos') || client.name.includes('House')) ? 'contrast-[1.15] brightness-[1.02] saturate-[1.1]' : ''
                                                }`}
                                        />
                                    </div>

                                    {/* Name Label (Dark Theme) */}
                                    <div className="mt-3 px-1 pb-1">
                                        <h3 className="text-[10px] font-display font-bold text-center text-white/90 group-hover:text-primary transition-colors duration-300 uppercase tracking-wider leading-tight line-clamp-1">
                                            {client.name}
                                        </h3>
                                        <div className="w-6 group-hover:w-full h-[1.5px] bg-gradient-to-r from-primary via-secondary to-transparent mx-auto mt-1.5 transition-all duration-500 opacity-80 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default OurClientsSection;

