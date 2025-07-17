// install the package
// npm install @studio-freight/lenis


// use the package
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

function useLenisScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth easing
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);
}


// Use the hook in your app:
function App() {
  useLenisScroll();

  return (
    <main>
      <section style={{ height: '100vh', background: 'lightpink' }}>Section 1</section>
      <section style={{ height: '100vh', background: 'lightblue' }}>Section 2</section>
      <section style={{ height: '100vh', background: 'lightgreen' }}>Section 3</section>
    </main>
  );
}

// Lenis is performant, React-friendly, and has a nice native scroll feel.

// | Library               | Feel/Quality        | React Support   | Recommended For          |
// | --------------------- | ------------------- | --------------- | ------------------------ |
// | **Locomotive Scroll** | High-end, momentum  | Manual setup    | Parallax + smooth scroll |
// | **Lenis**             | Modern, smooth      | ✅ Hook-friendly | General smooth scroll    |
