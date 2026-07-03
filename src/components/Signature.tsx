import { useEffect } from "react";

let printed = false;

const Signature = () => {
  useEffect(() => {
    if (printed || typeof window === "undefined") return;
    printed = true;

    const art = `
   █████╗ ███╗   ██╗██████╗ ██████╗ ███████╗
  ██╔══██╗████╗  ██║██╔══██╗██╔══██╗██╔════╝
  ███████║██╔██╗ ██║██║  ██║██████╔╝█████╗
  ██╔══██║██║╚██╗██║██║  ██║██╔══██╗██╔══╝
  ██║  ██║██║ ╚████║██████╔╝██║  ██║███████╗
  ╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ ╚═╝  ╚═╝╚══════╝
`;

    const styles = {
      art: "color:#3B55C0;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;line-height:1.1;",
      hi: "color:#2B2520;font-size:14px;font-weight:600;",
      label: "color:#3B55C0;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;",
      value: "color:#6E675C;font-size:12px;",
      hint: "color:#8A8375;font-size:11px;font-style:italic;",
    };

    console.log(`%c${art}`, styles.art);
    console.log("%c👋 Hi developer — inspecting the code?", styles.hi);
    console.log(
      "%cEMAIL  %candresaputra07012019@gmail.com",
      styles.label,
      styles.value,
    );
    console.log(
      "%cGITHUB %cgithub.com/andre-sptr",
      styles.label,
      styles.value,
    );
    console.log(
      "%cSTACK  %cReact 19 · TypeScript · Vite · Tailwind 4 · GSAP · Three.js",
      styles.label,
      styles.value,
    );
    console.log(
      "%cIf you want to chat about the build, drop me a line ↑",
      styles.hint,
    );
  }, []);

  return null;
};

export default Signature;
