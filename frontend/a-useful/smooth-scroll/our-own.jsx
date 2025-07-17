// # What we're building
// To replicate that "phone-like smooth scroll" manually, you’ll essentially:

// 1. Hijack native scrolling — disable it or prevent the browser from handling it
// 2. Track scroll position yourself — using a scroll container and requestAnimationFrame
// 3. Interpolate movement — using easing (lerp, spring, or bezier) to smoothly move content
// 4. Render at each frame — use requestAnimationFrame to drive the animation loop

// ## How It Works (Conceptually)
// You simulate scroll with something like this:
  current = lerp(current, target, ease);

  // where:
  // target is the scroll amount you want to get to (e.g., from the user's wheel or touch)
  // current is what you're currently displaying
  // ease (or lerp factor) controls how smooth it feels — smaller = smoother

// # 🚀 React Implementation
// 1. Create a SmoothScroll Component

// SmoothScroll.jsx
import React, { useEffect, useRef } from 'react';

const lerp = (start, end, factor) => start * (1 - factor) + end * factor;

const SmoothScroll = ({ children, ease = 0.1 }) => {
  const scrollContainerRef = useRef(null);
  const scrollPos = useRef(0);
  const currentPos = useRef(0);
  const rafRef = useRef();

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    document.body.style.height = `${scrollContainer.getBoundingClientRect().height}px`;

    const onScroll = () => {
      scrollPos.current = window.scrollY;
    };

    const smoothScroll = () => {
      currentPos.current = lerp(currentPos.current, scrollPos.current, ease);
      scrollContainer.style.transform = `translate3d(0, ${-currentPos.current}px, 0)`;
      rafRef.current = requestAnimationFrame(smoothScroll);
    };

    window.addEventListener('scroll', onScroll);
    rafRef.current = requestAnimationFrame(smoothScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
      document.body.style.height = 'auto';
    };
  }, [ease]);

  return (
    <div
      ref={scrollContainerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};

export default SmoothScroll;



// 2. Use It in Your App
// App.jsx
import React from 'react';
import SmoothScroll from './SmoothScroll';

function App() {
  return (
    <SmoothScroll ease={0.075}>
      <section style={{ height: '100vh', background: '#ff0' }}>One</section>
      <section style={{ height: '100vh', background: '#0ff' }}>Two</section>
      <section style={{ height: '100vh', background: '#f0f' }}>Three</section>
    </SmoothScroll>
  );
}



// # ✅ Pros of This Custom Approach
// Full control over scroll feel
// Can add parallax and scroll-based animations easily
// Lightweight and dependency-free
// Easily extendable (e.g., add spring easing, touch gestures, direction detection)

// # ⚠️ Things to Watch Out For
// Accessibility: You override native scroll — test for keyboard and screen reader compatibility
// Scroll-based animations: You’ll need to base them on currentPos instead of window.scrollY
// Performance: Use will-change: transform and avoid reflows


// # Final notes
// You can extend this with scroll-triggered animations, parallax, or direction
// detection (like scroll up/down events)