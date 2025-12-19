import { motion } from 'framer-motion';
import { Linkedin, Github, Twitter } from 'lucide-react';

const teamMembers = [
    {
        name: 'Gopal Kapoor',
        role: 'Co-Founder',
        image: '/src/assets/team-member-1.jpg',
        bio: 'Visionary leader with 15+ years in Buisness and Product',
        social: {
            linkedin: '#',
            twitter: '#',
            github: '#',
        },
    },
    {
        name: 'Amitesh Maurya',
        role: 'Co-Founder',
        image: '/src/assets/team-member-2.jpg',
        bio: 'NIT Trichy graduate With 8+ years of experience in IT services and  enterprise GenAI products and custom LLM applications to AI agents, RAG systems',
        social: {
            linkedin: '#',
            twitter: '#',
            github: '#',
        },
    },
    {
        name: 'Aditya Raana',
        role: 'AI & ML Engineer ',
        image: '/src/assets/team-member-3.jpg',
        bio: 'Ex-Cisco, Ex-Google Summer Code of Intern,
        social: {
            linkedin: '#',
            twitter: '#',
            github: '#',
        },
    },
    {
        name: 'Abhi Bhardwaj',
        role: 'Business Developemt',
        image: '/src/assets/team-member-3.jpg',
        bio: '6+ experience in Buisness Development',
        social: {
            linkedin: '#',
            twitter: '#',
            github: '#',
        },
    },
   
];

const TeamsSection = () => {
    return (
        <section id="team" className="py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-glow-cyan/5 to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-glow-violet/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-primary text-sm font-semibold uppercase tracking-wider">
                        Meet Our Team
                    </span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">
                        The Minds Behind{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                            Innovation
                        </span>
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Our team of experts is dedicated to pushing the boundaries of AI technology
                    </p>
                </div>

                {/* Team Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="glass-card rounded-2xl p-6 hover:scale-105 transition-transform duration-300 group"
                        >
                            {/* Image */}
                            <div className="relative mb-4 overflow-hidden rounded-xl">
                                <div className="aspect-square bg-gradient-to-br from-glow-cyan/20 to-glow-violet/20 flex items-center justify-center">
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-glow-cyan to-glow-violet flex items-center justify-center text-4xl font-bold">
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="text-center">
                                <h3 className="text-xl font-display font-bold mb-1">{member.name}</h3>
                                <p className="text-primary text-sm font-semibold mb-3">{member.role}</p>
                                <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>

                                {/* Social Links */}
                                <div className="flex items-center justify-center gap-3">
                                    <a
                                        href={member.social.linkedin}
                                        className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center hover:bg-foreground/10 transition-colors group"
                                    >
                                        <Linkedin className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                                    </a>
                                    <a
                                        href={member.social.twitter}
                                        className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center hover:bg-foreground/10 transition-colors group"
                                    >
                                        <Twitter className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                                    </a>
                                    <a
                                        href={member.social.github}
                                        className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center hover:bg-foreground/10 transition-colors group"
                                    >
                                        <Github className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamsSection;


