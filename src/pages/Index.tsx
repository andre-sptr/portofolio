import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";

// Lazy load components for performance
const About = React.lazy(() => import("@/components/About"));
const Projects = React.lazy(() => import("@/components/Projects"));
const FreeTools = React.lazy(() => import("@/components/FreeTools"));
const Contact = React.lazy(() => import("@/components/Contact"));
const Footer = React.lazy(() => import("@/components/Footer"));

const LoadingFallback = () => (
  <div className="w-full h-40 flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Portfolio | Professional Web Developer</title>
        <meta name="description" content="Professional portfolio showcasing web development projects, skills, and services. Specialized in React, TypeScript, and modern web technologies." />
        <meta name="keywords" content="web developer, portfolio, react, typescript, frontend, fullstack" />
        <meta property="og:title" content="Portfolio | Professional Web Developer" />
        <meta property="og:description" content="Professional portfolio showcasing web development projects, skills, and services." />
        <meta property="og:type" content="website" />
        <meta name="theme-color" content="#000000" />
      </Helmet>

      <Navigation />
      <Hero />
      
      <Suspense fallback={<LoadingFallback />}>
        <About />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <Projects />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <FreeTools />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <Contact />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
