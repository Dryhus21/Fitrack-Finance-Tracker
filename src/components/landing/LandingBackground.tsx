"use client";

import DotField from "./DotField";

export function LandingBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden
      style={{
        WebkitMaskImage:
          "radial-gradient(ellipse 90% 80% at 50% 30%, black 40%, transparent 100%)",
        maskImage:
          "radial-gradient(ellipse 90% 80% at 50% 30%, black 40%, transparent 100%)",
      }}
    >
      <DotField
        dotRadius={1.5}
        dotSpacing={14}
        bulgeStrength={67}
        glowRadius={160}
        sparkle={false}
        waveAmplitude={0}
        gradientFrom="#0a6c4b"
        gradientTo="#1c7356"
        glowColor="#0c0a08"
      />
    </div>
  );
}
