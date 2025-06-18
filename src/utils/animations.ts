import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

// プラグインを登録
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin, DrawSVGPlugin, MotionPathPlugin);
}

// フェードインアニメーション
export const fadeInUp = (element: string | Element, delay: number = 0) => {
  return gsap.fromTo(element, 
    {
      y: 60,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      delay,
      ease: "power3.out"
    }
  );
};

// スケールアニメーション
export const scaleIn = (element: string | Element, delay: number = 0) => {
  return gsap.fromTo(element,
    {
      scale: 0.8,
      opacity: 0
    },
    {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      delay,
      ease: "back.out(1.7)"
    }
  );
};

// スライドインアニメーション
export const slideInLeft = (element: string | Element, delay: number = 0) => {
  return gsap.fromTo(element,
    {
      x: -100,
      opacity: 0
    },
    {
      x: 0,
      opacity: 1,
      duration: 1,
      delay,
      ease: "power3.out"
    }
  );
};

export const slideInRight = (element: string | Element, delay: number = 0) => {
  return gsap.fromTo(element,
    {
      x: 100,
      opacity: 0
    },
    {
      x: 0,
      opacity: 1,
      duration: 1,
      delay,
      ease: "power3.out"
    }
  );
};

// 回転アニメーション
export const rotateIn = (element: string | Element, delay: number = 0) => {
  return gsap.fromTo(element,
    {
      rotation: -180,
      scale: 0,
      opacity: 0
    },
    {
      rotation: 0,
      scale: 1,
      opacity: 1,
      duration: 1,
      delay,
      ease: "back.out(1.7)"
    }
  );
};

// ストラグルアニメーション（文字を一文字ずつ表示）
export const staggerText = (element: string | Element, delay: number = 0) => {
  return gsap.fromTo(element,
    {
      y: 100,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      delay,
      stagger: 0.05,
      ease: "power3.out"
    }
  );
};

// パララックス効果
export const parallax = (element: string | Element, speed: number = 0.5) => {
  return gsap.to(element, {
    yPercent: -50 * speed,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
};

// ホバーアニメーション
export const hoverScale = (element: string | Element) => {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;
  
  const tl = gsap.timeline({ paused: true });
  tl.to(el, {
    scale: 1.05,
    duration: 0.3,
    ease: "power2.out"
  });
  
  el.addEventListener('mouseenter', () => tl.play());
  el.addEventListener('mouseleave', () => tl.reverse());
};

// スクロールトリガー付きフェードイン
export const scrollFadeIn = (element: string | Element, delay: number = 0) => {
  return gsap.fromTo(element,
    {
      y: 50,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    }
  );
};

// カウンターアニメーション
export const counterAnimation = (element: string | Element, target: number, duration: number = 2) => {
  return gsap.to(element, {
    innerHTML: target,
    duration,
    snap: { innerHTML: 1 },
    ease: "power2.out"
  });
};

// 背景グラデーションアニメーション
export const gradientAnimation = (element: string | Element) => {
  return gsap.to(element, {
    backgroundPosition: "200% 200%",
    duration: 3,
    repeat: -1,
    ease: "none"
  });
};

// === 高度なアニメーション ===

// 3D回転アニメーション
export const rotate3D = (element: string | Element, delay: number = 0) => {
  return gsap.fromTo(element,
    {
      rotationX: -90,
      rotationY: 45,
      opacity: 0,
      scale: 0.5
    },
    {
      rotationX: 0,
      rotationY: 0,
      opacity: 1,
      scale: 1,
      duration: 1.2,
      delay,
      ease: "back.out(1.7)"
    }
  );
};

// 弾性バウンスアニメーション
export const elasticBounce = (element: string | Element, delay: number = 0) => {
  return gsap.fromTo(element,
    {
      scale: 0,
      opacity: 0
    },
    {
      scale: 1,
      opacity: 1,
      duration: 1.5,
      delay,
      ease: "elastic.out(1, 0.3)"
    }
  );
};

// 波紋エフェクト
export const rippleEffect = (element: string | Element) => {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;

  el.addEventListener('click', (e) => {
    const rect = el.getBoundingClientRect();
    const { clientX, clientY } = e as MouseEvent;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.width = '0px';
    ripple.style.height = '0px';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.6)';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.pointerEvents = 'none';

    (el as HTMLElement).style.position = 'relative';
    el.appendChild(ripple);

    gsap.to(ripple, {
      width: '300px',
      height: '300px',
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => {
        el.removeChild(ripple);
      }
    });
  });
};

// テキスト分割アニメーション
export const splitTextAnimation = (element: string | Element, delay: number = 0) => {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;

  const text = el.textContent || '';
  el.innerHTML = '';
  
  const chars = text.split('').map(char => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.display = 'inline-block';
    span.style.opacity = '0';
    span.style.transform = 'translateY(50px)';
    el.appendChild(span);
    return span;
  });

  return gsap.to(chars, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay,
    stagger: 0.03,
    ease: "back.out(1.7)"
  });
};

// パーティクルエフェクト
export const createParticles = (container: string | Element, count: number = 50) => {
  const cont = typeof container === 'string' ? document.querySelector(container) : container;
  if (!cont) return;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      position: absolute;
      width: 4px;
      height: 4px;
      background: linear-gradient(45deg, #667eea, #764ba2);
      border-radius: 50%;
      pointer-events: none;
      opacity: 0;
    `;
    
    cont.appendChild(particle);

    gsap.set(particle, {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      scale: 0
    });

    gsap.to(particle, {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      scale: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.2,
      duration: Math.random() * 3 + 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: Math.random() * 2
    });
  }
};

// マウス追従エフェクト
export const mouseFollower = (element: string | Element) => {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;

  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  gsap.ticker.add(() => {
    currentX += (mouseX - currentX) * 0.1;
    currentY += (mouseY - currentY) * 0.1;
    
    gsap.set(el, {
      x: currentX - 25,
      y: currentY - 25
    });
  });
};

// スクロールベースの3Dパララックス
export const scroll3DParallax = (element: string | Element, depth: number = 0.5) => {
  return gsap.to(element, {
    rotationY: 360,
    rotationX: 180,
    z: -1000 * depth,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: 1
    }
  });
};

// モーフィングアニメーション（SVG用）
export const morphShape = (element: string | Element, morphTo: string, duration: number = 1) => {
  return gsap.to(element, {
    morphSVG: morphTo,
    duration,
    ease: "power2.inOut"
  });
};

// ドローアニメーション（SVG用）
export const drawSVG = (element: string | Element, duration: number = 1) => {
  return gsap.fromTo(element,
    { drawSVG: "0%" },
    { drawSVG: "100%", duration, ease: "power2.inOut" }
  );
};

// 複雑なタイムラインアニメーション
export const complexTimeline = (elements: (string | Element)[], delay: number = 0) => {
  const tl = gsap.timeline({ delay });
  
  elements.forEach((element, index) => {
    tl.fromTo(element,
      {
        scale: 0,
        rotation: index * 45,
        opacity: 0,
        y: 100
      },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
      },
      index * 0.2
    );
  });

  return tl;
};

// スクロールベースのストラグル
export const scrollStagger = (elements: (string | Element)[], stagger: number = 0.1) => {
  return gsap.fromTo(elements,
    {
      y: 100,
      opacity: 0,
      scale: 0.8
    },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: elements[0],
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    }
  );
};

// カスタムイージングアニメーション
export const customEaseAnimation = (element: string | Element, delay: number = 0) => {
  const customEase = gsap.parseEase("M0,0 C0.126,0.382 0.382,0.874 1,1");
  
  return gsap.fromTo(element,
    {
      scale: 0,
      rotation: 720,
      opacity: 0
    },
    {
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: 2,
      delay,
      ease: customEase
    }
  );
};

