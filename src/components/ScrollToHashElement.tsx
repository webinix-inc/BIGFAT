import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ScrollToHashElement = () => {
    const { hash, pathname } = useLocation();
    const navigate = useNavigate();

    // 1. Scroll to top on pathname change (if no hash)
    useEffect(() => {
        if (!hash) {
            window.scrollTo(0, 0);
        }
    }, [pathname]); // Only trigger when pathname changes

    // 2. Handle hash scrolling
    useEffect(() => {
        if (hash) {
            const element = document.getElementById(hash.replace("#", ""));

            const removeHash = () => {
                navigate(pathname, { replace: true });
            };

            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
                setTimeout(removeHash, 100);
            } else {
                // Retry for dynamic content
                setTimeout(() => {
                    const el = document.getElementById(hash.replace("#", ""));
                    if (el) {
                        el.scrollIntoView({ behavior: "smooth", block: "start" });
                        removeHash();
                    }
                }, 100);
            }
        }
    }, [hash, navigate, pathname]);

    return null;
};

export default ScrollToHashElement;
