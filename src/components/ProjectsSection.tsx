import { memo, useState } from 'react';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProjectsSection = memo(() => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <section id="projects" className="py-20 relative overflow-hidden bg-foreground/5">
            <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

                    {/* Left Column: Content */}
                    <div className="text-left order-2 md:order-1">
                        <span className="text-primary text-sm font-semibold uppercase tracking-wider">
                            BIGFAT AI Lab
                        </span>
                        <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 mb-4">
                            Next-Gen <span className="gradient-text">Generative AI</span>
                        </h2>
                        <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                            Experience the power of our proprietary Large Language Models (LLMs) capable of generating
                            production-grade code, marketing copy, and realistic visual assets in milliseconds.
                        </p>

                        <div className="flex flex-wrap gap-2 mb-8">
                            {['Generative AI', 'LLM', 'Auto-GPT', 'Neural Networks'].map((tag) => (
                                <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-background/50 border border-foreground/10 text-muted-foreground">
                                    {tag}
                                </span>
                            ))}
                        </div>

                    </div>

                    {/* Right Column: Video (Smaller Footprint) */}
                    <div className="order-1 md:order-2">
                        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-foreground/10 bg-black/50 group hover:ring-2 ring-primary/20 transition-all duration-300">
                            {!isPlaying ? (
                                <div
                                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                                    onClick={() => setIsPlaying(true)}
                                >
                                    {/* Thumbnail Background */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-violet-900 to-cyan-900 opacity-90 transition-opacity duration-300 group-hover:opacity-100"></div>

                                    {/* Play Button */}
                                    <div className="relative z-10 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-lg">
                                        <Play className="w-6 h-6 text-white fill-white ml-1" />
                                    </div>

                                    <div className="absolute bottom-4 left-4 z-10">
                                        <p className="text-white/90 text-sm font-medium">Watch Demo: GenAI Engine v2.0</p>
                                    </div>
                                </div>
                            ) : (
                                <iframe
                                    className="w-full h-full"
                                    src="https://www.youtube.com/embed/refXmRj3k90?autoplay=1"
                                    title="GenAI Abstract Demo"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
});

ProjectsSection.displayName = 'ProjectsSection';

export default ProjectsSection;
