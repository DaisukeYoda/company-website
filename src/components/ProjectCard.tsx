import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  gradient: string;
  icon: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, tech, gradient, icon }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const techRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const icon = iconRef.current;
    const title = titleRef.current;
    const description = descriptionRef.current;
    const tech = techRef.current;

    if (!card || !icon || !title || !description || !tech) return;

    // 初期状態を設定
    gsap.set([icon, title, description, tech], { opacity: 0, y: 30 });

    // ホバーアニメーション
    const handleMouseEnter = () => {
      gsap.to(icon, { rotation: 360, duration: 0.6, ease: "back.out(1.7)" });
      gsap.to(card, { 
        scale: 1.02, 
        duration: 0.3, 
        ease: "power2.out",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(icon, { rotation: 0, duration: 0.6, ease: "back.out(1.7)" });
      gsap.to(card, { 
        scale: 1, 
        duration: 0.3, 
        ease: "power2.out",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    // 要素が画面に入った時のアニメーション
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const tl = gsap.timeline();
          tl.to(icon, { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" })
            .to(title, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
            .to(description, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
            .to(tech, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4");
          
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(card);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 cursor-pointer"
    >
      {/* グラデーション背景 */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-15 transition-all duration-500`}></div>
      
      {/* ホバー時の光効果 */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      
      <div className="relative p-8">
        {/* アイコン */}
        <div 
          ref={iconRef}
          className="text-5xl mb-6 transform transition-transform duration-300"
        >
          {icon}
        </div>
        
        {/* タイトル */}
        <h3 
          ref={titleRef}
          className="text-2xl font-bold mb-4 text-gray-900 dark:text-white leading-tight"
        >
          {title}
        </h3>
        
        {/* 説明 */}
        <p 
          ref={descriptionRef}
          className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed"
        >
          {description}
        </p>
        
        {/* 技術スタック */}
        <div 
          ref={techRef}
          className="flex flex-wrap gap-2"
        >
          {tech.map((item, index) => (
            <span 
              key={index}
              className="px-3 py-1.5 text-sm rounded-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 font-medium shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
            >
              {item}
            </span>
          ))}
        </div>
        
        {/* 詳細ボタン */}
        <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="inline-flex items-center text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
            詳細を見る
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;