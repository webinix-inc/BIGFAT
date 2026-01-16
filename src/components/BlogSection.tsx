import { Button } from '@/components/ui/button';
import { blogPosts } from '@/data/blogPosts';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { memo } from 'react';
import { Link } from 'react-router-dom';

const BlogSection = memo(() => {
    return (
        <section id="blog" className="py-24 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-glow-violet/5 to-transparent pointer-events-none" />
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-glow-cyan/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-primary text-sm font-semibold uppercase tracking-wider">
                        Insights & Updates
                    </span>
                    <h2 className="text-3xl md:text-4xl font-display font-bold mt-4 mb-6">
                        Latest from our <span className="gradient-text">Blog</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Stay ahead of the curve with our latest research, industry insights, and AI technology updates.
                    </p>
                </div>

                {/* Blog Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.slice(0, 3).map((post, index) => (
                        <article
                            key={post.id}
                            className="glass-card group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:translate-y-[-8px] hover:shadow-2xl hover:shadow-primary/10 border border-foreground/10"
                        >
                            {/* Image Container */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    loading="lazy"
                                    decoding="async"
                                    width={640}
                                    height={384}
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-primary text-primary-foreground rounded-full">
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content Container */}
                            <div className="p-6 flex flex-col flex-grow">
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

                                <h3 className="text-xl font-display font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                                </h3>
                                <p className="text-muted-foreground text-sm mb-6 line-clamp-3 leading-relaxed">
                                    {post.excerpt}
                                </p>

                                <div className="mt-auto">
                                    <Link
                                        to={`/blog/${post.slug}`}
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all hover:gap-3"
                                    >
                                        Read More <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-16">
                    <Button variant="outline" className="rounded-full px-8 py-6 border-primary/50 hover:bg-primary/10 transition-all font-semibold group" asChild>
                        <Link to="/blog">
                            View All Insights
                            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
});

BlogSection.displayName = 'BlogSection';

export default BlogSection;
