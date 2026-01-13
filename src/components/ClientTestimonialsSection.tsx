import { memo } from 'react';
import { motion } from 'framer-motion';
import { Video } from 'lucide-react';

const ClientTestimonialsSection = memo(() => {
    return (
        <section id="testimonials" className="py-24 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-glow-cyan/5 to-transparent pointer-events-none" />
            <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-glow-violet/10 rounded-full blur-[200px] pointer-events-none -translate-y-1/2" />
            <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-glow-cyan/10 rounded-full blur-[200px] pointer-events-none -translate-y-1/2" />

            <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary text-sm font-semibold uppercase tracking-wider"
                    >
                        Client Success Stories
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6"
                    >
                        What Our{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                            Clients Say
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-muted-foreground"
                    >
                        Hear directly from our clients about their experience working with us
                    </motion.p>
                </div>

                {/* Coming Soon Message */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto"
                >
                    <div className="glass-card rounded-2xl p-16 text-center">
                        <motion.div
                            animate={{
                                scale: [1, 1.05, 1],
                                opacity: [0.7, 1, 0.7]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="mb-6 flex justify-center"
                        >
                            <div className="w-24 h-24 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/20">
                                <Video className="w-12 h-12 text-primary" />
                            </div>
                        </motion.div>
                        <h3 className="text-3xl md:text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4">
                            Coming Soon
                        </h3>
                        <p className="text-lg text-muted-foreground">
                            Client video testimonials are on the way
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
});

ClientTestimonialsSection.displayName = 'ClientTestimonialsSection';

export default ClientTestimonialsSection;
