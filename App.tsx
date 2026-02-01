import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ChevronRight, 
  Calendar,
  Award,
  Code2,
  Layout,
  Terminal,
  Layers
} from 'lucide-react';
import { 
  PERSONAL_INFO, 
  SKILLS, 
  EXPERIENCES, 
  PROJECTS 
} from './constants';
import Section from './components/Section';
import FloatingChat from './components/FloatingChat';

const App: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const followerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (cursorRef.current && followerRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - 6}px, ${e.clientY - 6}px, 0)`;
        followerRef.current.style.transform = `translate3d(${e.clientX - 20}px, ${e.clientY - 20}px, 0) scale(${hovered ? 1.5 : 1})`;
      }
    };

    const handleScroll = () => {
      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Trigger progress based on the middle of the screen
        const startOffset = windowHeight * 0.7;
        const endOffset = windowHeight * 0.3;
        const totalDist = rect.height;
        const currentPos = -rect.top + startOffset;
        const progress = Math.max(0, Math.min(1, currentPos / totalDist));
        setScrollProgress(progress);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('.cursor-pointer')) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hovered]);

  const calculateTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const resetTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <div className="min-h-screen bg-[#020617] text-gray-100 selection:bg-blue-500/30 overflow-hidden">
      {/* Custom Cursor */}
      <div ref={cursorRef} className="custom-cursor hidden md:block" />
      <div ref={followerRef} className={`custom-cursor-follower hidden md:block ${hovered ? 'bg-white/10 border-white/50' : ''}`} />

      {/* Global Scroll Progress Top Bar */}
      <div className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-blue-600 to-indigo-500 z-[100] transition-all duration-100 ease-out" style={{ width: `${(scrollProgress * 100)}%` }} />

      {/* Dynamic Background */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
        <div 
          className="absolute inset-0 higgs-grid transition-transform duration-300 ease-out"
          style={{ transform: `perspective(1000px) rotateX(60deg) translateY(-100px) translateX(${mousePos.x / 50}px)` }}
        />
        <div 
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-blob" 
          style={{ transform: `translate3d(${mousePos.x / 20}px, ${mousePos.y / 20}px, 0)` }}
        />
        <div 
          className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-indigo-600/10 blur-[120px] rounded-full animate-blob [animation-delay:2s]" 
          style={{ transform: `translate3d(${-mousePos.x / 25}px, ${-mousePos.y / 25}px, 0)` }}
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] contrast-150" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center bg-gray-950/40 backdrop-blur-xl border-b border-white/5 m-4 rounded-2xl">
          <div className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 tracking-tighter">
            PK<span className="text-white">.</span>
          </div>
          <div className="hidden md:flex gap-8 items-center text-xs font-bold uppercase tracking-widest">
            <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
            <a href="#skills" className="hover:text-blue-400 transition-colors">Skills</a>
            <a href="#experience" className="hover:text-blue-400 transition-colors">Experience</a>
            <a href="#projects" className="hover:text-blue-400 transition-colors">Projects</a>
            <a href="#contact" className="bg-blue-600 hover:bg-blue-500 px-6 py-2.5 rounded-full text-white transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-600/20">
              Let's Connect
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center px-6 perspective-1000">
        <div 
          className="relative z-10 space-y-8 max-w-5xl transition-transform duration-300 ease-out"
          style={{ transform: `rotateX(${(mousePos.y - window.innerHeight/2) / 100}deg) rotateY(${(window.innerWidth/2 - mousePos.x) / 100}deg)` }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-[0.2em] animate-fade-in">
            <Terminal className="w-4 h-4" /> Engineering Scalable Solutions
          </div>
          
          <div className="relative">
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none preserve-3d">
              <span className="block text-white opacity-90">PANKAJ</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-glow">KUMAR</span>
            </h1>
          </div>

          <p className="text-lg md:text-2xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
            <span className="text-white font-bold underline decoration-blue-500 decoration-2 underline-offset-4">Full-Stack Engineer</span> & <span className="text-white font-bold underline decoration-indigo-500 decoration-2 underline-offset-4">.NET Developer</span> architecting modern digital products.
          </p>

          <div className="flex flex-wrap justify-center gap-6 pt-10">
            <a 
              href="#projects" 
              className="px-10 py-5 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold flex items-center gap-3 transition-all transform hover:scale-110 active:scale-95 shadow-2xl shadow-blue-600/30 group"
            >
              Explore Portfolio <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="flex gap-4">
              <a href={PERSONAL_INFO.linkedin} className="p-5 bg-gray-900/50 border border-white/10 rounded-2xl hover:border-blue-500/50 hover:bg-gray-800 transition-all group backdrop-blur-sm">
                <Linkedin className="w-6 h-6 group-hover:text-blue-400 transition-transform group-hover:scale-110" />
              </a>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="p-5 bg-gray-900/50 border border-white/10 rounded-2xl hover:border-blue-500/50 hover:bg-gray-800 transition-all group backdrop-blur-sm">
                <Mail className="w-6 h-6 group-hover:text-blue-400 transition-transform group-hover:scale-110" />
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-white/10 rounded-full flex justify-center p-2 backdrop-blur-md">
            <div className="w-1.5 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,1)]" />
          </div>
        </div>
      </section>

      {/* Arsenal Section */}
      <Section id="skills" title="Arsenal" subtitle="Powered by modern frameworks and distributed systems.">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {SKILLS.map((skill, i) => (
            <div key={i} className="perspective-1000 group cursor-pointer">
              <div 
                onMouseMove={calculateTilt}
                onMouseLeave={resetTilt}
                className="preserve-3d transition-transform duration-500 bg-gray-900/60 border border-white/5 p-8 rounded-[2rem] flex flex-col items-center gap-4 relative h-40 shadow-xl group-hover:shadow-blue-500/10 group-hover:border-blue-500/20"
              >
                <div className="text-blue-500 group-hover:text-blue-300 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 ease-out drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]">
                  {skill.icon}
                </div>
                <span className="font-bold text-xs tracking-widest uppercase text-gray-400 group-hover:text-white transition-colors">{skill.name}</span>
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] flex items-center justify-center p-4 text-center pointer-events-none opacity-0 group-hover:opacity-100 group-hover:rotate-y-0 transition-opacity duration-300">
                  <span className="text-white text-[10px] font-black uppercase tracking-widest">Mastery</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Experience Evolution with Scroll Animation */}
      <Section id="experience" title="Evolution" subtitle="A legacy of code and collaboration as a Full-Stack Engineer and .NET Specialist.">
        <div className="relative pt-12" ref={timelineRef}>
          {/* Main Timeline Line (Backdrop) */}
          <div className="absolute left-[1.5rem] md:left-1/2 top-0 bottom-0 w-[2px] bg-gray-800/30 md:-ml-[1px] rounded-full" />
          
          {/* Gradually Updating Line */}
          <div 
            className="absolute left-[1.5rem] md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-600 md:-ml-[1px] transition-all duration-300 ease-out shadow-[0_0_20px_rgba(59,130,246,0.4)] rounded-full z-10" 
            style={{ height: `${scrollProgress * 100}%` }}
          />
          
          {EXPERIENCES.map((exp, i) => {
            const itemThreshold = i / EXPERIENCES.length;
            const isVisible = scrollProgress >= itemThreshold;
            
            return (
              <div 
                key={i} 
                className={`relative mb-32 flex flex-col md:flex-row items-start md:items-center gap-12 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Side Box - Appearing with scroll */}
                <div className={`flex-1 w-full z-20 transition-all duration-1000 ease-out perspective-1000 ${
                  isVisible 
                    ? 'opacity-100 translate-x-0 translate-y-0 rotate-x-0' 
                    : i % 2 === 0 ? 'opacity-0 translate-x-20 translate-y-10 -rotate-y-12' : 'opacity-0 -translate-x-20 translate-y-10 rotate-y-12'
                }`}>
                  <div 
                    onMouseMove={calculateTilt}
                    onMouseLeave={resetTilt}
                    className="bg-gray-950/80 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-[2.5rem] hover:border-blue-500/40 transition-all group relative overflow-hidden preserve-3d shadow-2xl shadow-black/50"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl rounded-full group-hover:bg-blue-600/10 transition-colors" />
                    
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
                      <div>
                        <h3 className="text-3xl font-black text-white mb-2 tracking-tight group-hover:text-blue-400 transition-colors">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-3 text-blue-500/80 font-bold uppercase text-[10px] tracking-widest">
                          {exp.company} <div className="w-1.5 h-1.5 bg-gray-700 rounded-full" /> {exp.location}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-gray-900/50 border border-white/5 px-6 py-3 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap backdrop-blur-md">
                        <Calendar className="w-4 h-4 text-blue-500" /> {exp.duration}
                      </div>
                    </div>
                    
                    <ul className="space-y-4">
                      {exp.details.map((detail, idx) => (
                        <li key={idx} className="flex gap-4 text-gray-400 leading-relaxed text-sm">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Timeline Marker - Pulsing as scroll hits */}
                <div 
                  className={`absolute left-0 md:left-1/2 md:-ml-6 w-12 h-12 rounded-[1rem] border-4 border-[#020617] z-30 flex items-center justify-center transition-all duration-700 rotate-45 
                  ${isVisible 
                    ? 'bg-blue-600 shadow-[0_0_30px_rgba(37,99,235,0.7)] scale-110 rotate-[135deg]' 
                    : 'bg-gray-800 shadow-none scale-100'}`}
                >
                  <Layers className={`w-5 h-5 text-white transition-transform duration-700 ${isVisible ? '-rotate-[135deg]' : '-rotate-45'}`} />
                </div>
                
                <div className="flex-1 hidden md:block" />
              </div>
            );
          })}
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects" title="Manifesto" subtitle="Practical implementations of complex logic.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {PROJECTS.map((project, i) => (
            <div 
              key={i} 
              onMouseMove={calculateTilt}
              onMouseLeave={resetTilt}
              className="group relative bg-[#0a0f1d] border border-white/5 rounded-[3rem] overflow-hidden transition-all duration-300 preserve-3d hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_20px_rgba(37,99,235,0.1)] hover:border-blue-500/20"
            >
              <div className="h-64 bg-gradient-to-br from-[#1e293b] to-[#0f172a] flex items-center justify-center p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-blue-600/10 transition-colors" />
                <div className="relative bg-white/5 backdrop-blur-xl p-8 rounded-3xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 border border-white/10 shadow-2xl">
                  <Layout className="w-20 h-20 text-blue-400" />
                </div>
              </div>
              <div className="p-10 relative">
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech, idx) => (
                    <span key={idx} className="px-4 py-1.5 bg-gray-900 border border-white/5 text-blue-400 rounded-full text-[9px] font-black uppercase tracking-widest">
                      {tech}
                    </span>
                  ))}
                </div>
                <h3 className="text-4xl font-black mb-4 tracking-tight group-hover:text-blue-400 transition-colors">{project.title}</h3>
                <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                  {project.description}
                </p>
                <div className="flex items-center gap-4">
                  <a href={project.githubLink} className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-white bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-2xl transition-all shadow-lg shadow-blue-600/20">
                    <Github className="w-5 h-5" /> View Source
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 relative overflow-hidden bg-gradient-to-b from-[#020617] to-[#01040f]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-600/5 blur-[150px] -z-10 rounded-full" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-6xl md:text-8xl font-black mb-10 tracking-tighter leading-none">Let's craft the <span className="text-blue-500 text-glow">Extraordinary</span>.</h2>
          <p className="text-xl md:text-2xl text-gray-400 mb-16 leading-relaxed max-w-3xl mx-auto font-light">
            Passionate about scalable architectures and sleek user interfaces. If you're looking for a partner to elevate your digital product, my inbox is waiting.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <a 
              href={`mailto:${PERSONAL_INFO.email}`}
              className="px-12 py-6 bg-blue-600 hover:bg-blue-500 rounded-3xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-4 transition-all transform hover:scale-110 shadow-2xl shadow-blue-600/30 group"
            >
              <Mail className="w-6 h-6 group-hover:rotate-12 transition-transform" /> Start a Conversation
            </a>
            <a 
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-12 py-6 bg-gray-900/50 border border-white/10 hover:border-blue-500/50 rounded-3xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-4 transition-all transform hover:scale-110 backdrop-blur-md group"
            >
              <Linkedin className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" /> LinkedIn Profile
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 text-center bg-[#01040f]">
        <div className="text-2xl font-black text-white/20 mb-6 tracking-tighter">PK.</div>
        <p className="text-gray-500 text-xs font-black uppercase tracking-[0.4em]">
          &copy; {new Date().getFullYear()} Pankaj Kumar • Crafted for Excellence
        </p>
      </footer>

      {/* Floating AI Chat */}
      <FloatingChat />
    </div>
  );
};

export default App;