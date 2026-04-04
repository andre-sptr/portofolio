import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorOutline = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = cursorDot.current;
    const outline = cursorOutline.current;

    if (!dot || !outline) return;

    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Move dot instantly
      gsap.to(dot, {
        x: clientX,
        y: clientY,
        duration: 0,
      });

      // Move outline with delay (smooth)
      gsap.to(outline, {
        x: clientX,
        y: clientY,
        duration: 0.15,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', moveCursor);

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .interactive');
    
    const onHover = () => {
      gsap.to(outline, {
        scale: 1.5,
        duration: 0.2
      });
      if (outline) outline.classList.add('cursor-hover');
    };

    const onLeave = () => {
      gsap.to(outline, {
        scale: 1,
        duration: 0.2
      });
      if (outline) outline.classList.remove('cursor-hover');
    };

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', onHover);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', onHover);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorDot} className="cursor-dot hidden md:block" />
      <div ref={cursorOutline} className="cursor-outline hidden md:block" />
    </>
  );
};

export default CustomCursor;
