import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "404 - Page Not Found",
    "description": "The page you are looking for does not exist on BIGFAT AI Labs website.",
    "url": `https://bigfatai.com${location.pathname}`,
    "isPartOf": {
      "@type": "WebSite",
      "name": "BIGFAT AI Labs",
      "url": "https://bigfatai.com"
    }
  };

  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | BIGFAT AI Labs</title>
        <meta name="description" content="The page you are looking for does not exist on BIGFAT AI Labs. Return to our homepage to explore enterprise AI solutions." />
        <meta name="keywords" content="404 error, page not found, BIGFAT AI, enterprise AI solutions, AI company" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="404 - Page Not Found | BIGFAT AI Labs" />
        <meta property="og:description" content="The page you are looking for does not exist on BIGFAT AI Labs. Return to our homepage to explore enterprise AI solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://bigfatai.com${location.pathname}`} />
        <meta property="og:site_name" content="BIGFAT AI Labs" />
        <meta property="og:image" content="https://bigfatai.com/og-image.jpg" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="404 - Page Not Found | BIGFAT AI Labs" />
        <meta name="twitter:description" content="The page you are looking for does not exist on BIGFAT AI Labs. Return to our homepage to explore enterprise AI solutions." />
        <meta name="twitter:image" content="https://bigfatai.com/twitter-image.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://bigfatai.com/404" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center px-4">
          <h1 className="mb-4 text-6xl font-bold text-primary">404</h1>
          <h2 className="mb-4 text-2xl font-semibold">Oops! Page Not Found</h2>
          <p className="mb-8 text-lg text-muted-foreground max-w-md mx-auto">
            The page you're looking for doesn't exist. Let's get you back to exploring our enterprise AI solutions.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
