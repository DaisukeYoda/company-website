import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// 基本的なアニメーション関数をインポート
import { 
  rotate3D, 
  elasticBounce, 
  rippleEffect, 
  splitTextAnimation, 
  createParticles, 
  mouseFollower, 
  scroll3DParallax, 
  complexTimeline 
} from './animations';

// ScrollTriggerプラグインを登録
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// 重複する関数を再エクスポート
export { 
  rotate3D, 
  elasticBounce, 
  rippleEffect, 
  splitTextAnimation, 
  createParticles, 
  mouseFollower, 
  scroll3DParallax, 
  complexTimeline 
};

// === 高度なアニメーション関数（重複しないもの） ===

// インタラクティブホバーエフェクト
export const interactiveHover = (element: string | Element) => {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;

  const tl = gsap.timeline({ paused: true });
  
  tl.to(el, {
    scale: 1.1,
    rotationY: 15,
    rotationX: 5,
    duration: 0.3,
    ease: "power2.out"
  })
  .to(el, {
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
    duration: 0.3,
    ease: "power2.out"
  }, 0);

  el.addEventListener('mouseenter', () => tl.play());
  el.addEventListener('mouseleave', () => tl.reverse());
};

// スクロールベースのカラー変化
export const scrollColorChange = (element: string | Element, colors: string[]) => {
  return gsap.to(element, {
    background: colors[0], // 最初の色を使用
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top center",
      end: "bottom center",
      scrub: 1,
      onUpdate: (self) => {
        const colorIndex = Math.floor(self.progress * (colors.length - 1));
        const color = colors[colorIndex] || colors[0];
        gsap.set(element, { background: color });
      }
    }
  });
};

// マグネットエフェクト
export const magnetEffect = (element: string | Element, strength: number = 0.3) => {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;

  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = (e as MouseEvent).clientX - rect.left - rect.width / 2;
    const y = (e as MouseEvent).clientY - rect.top - rect.height / 2;

    gsap.to(el, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: "power2.out"
    });
  });

  el.addEventListener('mouseleave', () => {
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.3,
      ease: "power2.out"
    });
  });
};

// フローティングアニメーション
export const floatingAnimation = (element: string | Element) => {
  return gsap.to(element, {
    y: -20,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut"
  });
};

// スピンアニメーション
export const spinAnimation = (element: string | Element, duration: number = 2) => {
  return gsap.to(element, {
    rotation: 360,
    duration,
    repeat: -1,
    ease: "none"
  });
};

// パルスアニメーション
export const pulseAnimation = (element: string | Element) => {
  return gsap.to(element, {
    scale: 1.1,
    duration: 1,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut"
  });
};

// ワイプエフェクト
export const wipeEffect = (element: string | Element, direction: 'left' | 'right' | 'up' | 'down' = 'left') => {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;

  const clipPath = {
    left: 'inset(0 100% 0 0)',
    right: 'inset(0 0 0 100%)',
    up: 'inset(100% 0 0 0)',
    down: 'inset(0 0 100% 0)'
  };

  gsap.set(el, { clipPath: clipPath[direction] });

  return gsap.to(el, {
    clipPath: 'inset(0 0 0 0)',
    duration: 1,
    ease: "power2.inOut"
  });
};

// モーフィングアニメーション（CSSプロパティ）
export const morphAnimation = (element: string | Element, fromProps: any, toProps: any, duration: number = 1) => {
  return gsap.fromTo(element, fromProps, {
    ...toProps,
    duration,
    ease: "power2.inOut"
  });
};

// スクロールベースのスケール
export const scrollScale = (element: string | Element, minScale: number = 0.5, maxScale: number = 1.5) => {
  return gsap.to(element, {
    scale: maxScale,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        const scale = minScale + (maxScale - minScale) * self.progress;
        gsap.set(element, { scale });
      }
    }
  });
}; 