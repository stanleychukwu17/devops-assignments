// SmoothScrollWrapper.js
import React, { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

const SmoothScrollWrapper = ({ children }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      lerp: 0.1, // smaller = slower scroll
      multiplier: 1.0,
    });

    return () => {
      scroll.destroy();
    };
  }, []);

  return (
    <div data-scroll-container ref={scrollRef}>
      {children}
    </div>
  );
};

export default SmoothScrollWrapper;




// Then wrap your content:
// App.js or wherever
import SmoothScrollWrapper from './SmoothScrollWrapper';

function App() {
  return (
    <SmoothScrollWrapper>
      <section style={{ height: '100vh', background: 'red' }}></section>
      <section style={{ height: '100vh', background: 'blue' }}></section>
      <section style={{ height: '100vh', background: 'green' }}></section>
    </SmoothScrollWrapper>
  );
}


// This gives you buttery, momentum-style scrolling on desktop and mobile, with 
// support for parallax effects, scroll triggers, etc.