import { useState, useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const Stars = (props) => {
  const ref = useRef();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(30000), { radius: 1.5 })
  );
  const [scrollSpeed, setScrollSpeed] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollTimeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY);

      const newScrollSpeed = Math.min(scrollDelta / 40, 2.5);
      setScrollSpeed(newScrollSpeed);

      lastScrollY = currentScrollY;

      clearTimeout(scrollTimeout);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  useFrame((state, delta) => {
    const baseSpeed = 0.4;

    if (scrollSpeed > 0) {
      setScrollSpeed((prev) => Math.max(0, prev - delta * 0.8));
    }

    const speedMultiplier = 1 + scrollSpeed * 3.5;
    ref.current.rotation.x -= (delta / 10) * baseSpeed * speedMultiplier;
    ref.current.rotation.y -= (delta / 15) * baseSpeed * speedMultiplier;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.0008}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  return (
    <div className="w-full h-auto absolute inset-0 z-[-1]">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
