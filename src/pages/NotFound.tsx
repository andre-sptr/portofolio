import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--surface-0)] px-4">
      <div className="panel-raised rounded-2xl px-10 py-12 text-center">
        <p className="section-label mb-4">Error 404</p>
        <h1 className="mb-3 text-5xl font-bold text-foreground [text-shadow:0_2px_0_hsl(0_0%_100%/0.6)]">404</h1>
        <p className="mb-8 text-lg text-muted-foreground">Oops! Page not found</p>
        <a
          href="/"
          className="btn-tactile-primary inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
