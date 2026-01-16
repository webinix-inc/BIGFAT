import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import { blogPosts } from '@/data/blogPosts';
import { Calendar, User, ArrowLeft, Tag, Share2 } from 'lucide-react';
import NotFound from './NotFound';

const BlogPost = () => {
    const { slug } = useParams<{ slug: string }>();
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        return <NotFound />;
    }

    return (
        <>
            <Helmet>
                <title>{`${post.title} - BIGFAT AI Blog`}</title>
                <meta name="description" content={post.excerpt} />
                <meta name="keywords" content={`${post.title}, BIGFAT AI blog, ${post.category}, AI insights, generative AI, enterprise AI`} />
                
                {/* Open Graph Tags */}
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.excerpt} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`https://bigfatai.com/blog/${post.slug}`} />
                <meta property="og:site_name" content="BIGFAT AI Labs" />
                <meta property="og:image" content={post.image} />
                <meta property="article:section" content={post.category} />
                <meta property="article:published_time" content={post.date} />
                
                {/* Twitter Card Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={post.title} />
                <meta name="twitter:description" content={post.excerpt} />
                <meta name="twitter:image" content={post.image} />
                
                {/* Canonical URL */}
                <link rel="canonical" href={`https://bigfatai.com/blog/${post.slug}`} />
                
                {/* Structured Data */}
                <script type="application/ld+json">
                  {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BlogPosting",
                    "headline": post.title,
                    "description": post.excerpt,
                    "image": post.image,
                    "author": {
                      "@type": "Organization",
                      "name": post.author
                    },
                    "publisher": {
                      "@type": "Organization",
                      "name": "BIGFAT AI Labs",
                      "logo": {
                        "@type": "ImageObject",
                        "url": "https://bigfatai.com/logo.png"
                      }
                    },
                    "datePublished": post.date,
                    "dateModified": post.date,
                    "mainEntityOfPage": {
                      "@type": "WebPage",
                      "@id": `https://bigfatai.com/blog/${post.slug}`
                    }
                  })}
                </script>
            </Helmet>

            <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
                <ParticleBackground />
                <Navbar />

                <main className="pt-32 pb-24 relative z-10">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Back Button */}
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Blog
                        </Link>

                        {/* Post Header */}
                        <header className="mb-12">
                            <div className="flex items-center gap-2 mb-6 text-primary font-semibold uppercase tracking-widest text-xs">
                                <Tag className="w-3 h-3" />
                                <span>{post.category}</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-display font-bold mb-8 leading-tight">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-muted-foreground border-y border-foreground/10 py-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/20">
                                        <User className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <span className="block text-sm font-semibold text-foreground">{post.author}</span>
                                        <span className="text-xs">Author</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span className="text-sm">{post.date}</span>
                                </div>
                                <button className="ml-auto flex items-center gap-2 text-sm hover:text-primary transition-colors">
                                    <Share2 className="w-4 h-4" />
                                    Share
                                </button>
                            </div>
                        </header>

                        {/* Featured Image */}
                        <div className="relative h-[300px] md:h-[500px] rounded-3xl overflow-hidden mb-12 border border-foreground/10">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover"
                                loading="eager"
                                fetchPriority="high"
                                decoding="async"
                                width={960}
                                height={540}
                            />
                        </div>

                        {/* Post Content */}
                        <div className="prose prose-invert prose-lg max-w-none">
                            <p className="lead text-xl text-muted-foreground mb-8 font-medium">
                                {post.excerpt}
                            </p>
                            <div className="text-muted-foreground leading-relaxed space-y-6">
                                {/* For demo purposes, we're just showing the content. In a real app, this would be markdown/HTML */}
                                <p>{post.content}</p>
                                <p>
                                    At BIGFAT AI LABS, we understand that the landscape of artificial intelligence is changing rapidly.
                                    Our mission is to help enterprises navigate this complexity by providing scalable, secure, and highly
                                    effective AI solutions tailored to their specific needs.
                                </p>
                                <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Key Takeaways</h2>
                                <ul className="list-disc pl-6 space-y-4">
                                    <li>Integration of domain-specific knowledge is crucial for AI accuracy.</li>
                                    <li>Autonomous agents are moving from simple automation to complex decision-making.</li>
                                    <li>Security and compliance remain top priorities for enterprise AI deployment.</li>
                                </ul>
                                <p>
                                    As we continue to innovate, we remain committed to pushing the boundaries of what's possible with Generative AI.
                                    Stay tuned for more updates and deep dives into our latest projects and technologies.
                                </p>
                            </div>
                        </div>

                        {/* CTA / Footer */}
                        <footer className="mt-24 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
                            <h3 className="text-2xl font-display font-bold mb-4">Have questions about our AI solutions?</h3>
                            <p className="text-muted-foreground mb-8">
                                Our team of experts is ready to help you implement the latest AI technologies in your business.
                            </p>
                            <Link
                                to="/contact"
                                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                            >
                                Get in Touch
                            </Link>
                        </footer>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
};

export default BlogPost;
