import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border py-4 px-4 flex justify-center items-center">
      <div className="flex items-center gap-2 text-muted-foreground">
        <span>© {currentYear} Andre Saputra.</span>
      </div>
    </footer>
  );
};

export default Footer;
