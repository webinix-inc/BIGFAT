import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import { blogPosts } from '@/data/blogPosts';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
    return (
        <>
            <Helmet>
                <title>Blog - BIGFAT AI | Insights on Generative AI & Enterprise PRoducts</title>
                <meta
                    name="description"
                    content="Read our latest insights on Generative AI, Conversational AI, and Enterprise Automation. Stay updated with BIGFAT AI LABS."
                />
                <meta name="keywords" content="AI blog, generative ai insights, enterprise ai articles, bigfat ai labs news" />
            </Helmet>

            <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
                <ParticleBackground />
                <Navbar />

                <main className="pt-32 pb-24 relative z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <header className="mb-16 text-center">
                            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                                Our <span className="gradient-text">Insights</span>
                            </h1>
                            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
                                Discover the latest trends in AI, deep dives into our technologies, and industry updates.
                            </p>
                        </header>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogPosts.map((post) => (
                                <article
                                    key={post.id}
                                    className="glass-card group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:translate-y-[-8px] border border-foreground/10"
                                >
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-primary text-primary-foreground rounded-full">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-8 flex flex-col flex-grow">
                                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                <span>{post.date}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <User className="w-3 h-3" />
                                                <span>{post.author}</span>
                                            </div>
                                        </div>

                                        <h2 className="text-2xl font-display font-bold mb-4 group-hover:text-primary transition-colors line-clamp-2">
                                            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                                        </h2>
                                        <p className="text-muted-foreground mb-8 line-clamp-3 leading-relaxed">
                                            {post.excerpt}
                                        </p>

                                        <div className="mt-auto">
                                            <Link
                                                to={`/blog/${post.slug}`}
                                                className="inline-flex items-center gap-2 font-semibold text-primary transition-all hover:gap-3"
                                            >
                                                Read Article <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
};

export default Blog;
