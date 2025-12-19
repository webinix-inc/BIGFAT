import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ScrollToHashElement = () => {
    const { hash, pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (hash) {
            const element = document.getElementById(hash.replace("#", ""));

            // Function to remove hash using React Router to keep state in sync
            const removeHash = () => {
                navigate(pathname, { replace: true });
            };

            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
                // Remove hash after a small delay to ensure scroll is registered/started
                // and to avoid interfering with immediate browser behavior
                setTimeout(() => {
                    removeHash();
                }, 100);
            } else {
                // Retry after a short delay to allow for rendering (e.g. lazy loaded content)
                setTimeout(() => {
                    const el = document.getElementById(hash.replace("#", ""));
                    if (el) {
                        el.scrollIntoView({ behavior: "smooth", block: "start" });
                        removeHash();
                    }
                }, 100);
            }
        }
    }, [hash, pathname, navigate]);

    return null;
};

export default ScrollToHashElement;
