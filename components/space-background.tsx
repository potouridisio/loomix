"use client";

import * as React from "react";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface Star {
  x: number;
  y: number;
  z: number;
  speed: number;
  size: number;
  alpha: number;
  fade: number;
  fadeSpeed: number;
  tintStrength: number;
}

export interface SpaceBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  starCount?: number;
}

export function SpaceBackground({ className, starCount = 140, ...props }: SpaceBackgroundProps) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  const isMobile = useIsMobile(640);
  const isTablet = useIsMobile(1024);

  const effectiveStarCount = React.useMemo(() => {
    if (isMobile) return Math.round(starCount * 0.55);
    if (isTablet) return Math.round(starCount * 0.75);
    return starCount;
  }, [isMobile, isTablet, starCount]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animationFrame = 0;

    const stars: Star[] = [];

    const random = (min: number, max: number) => Math.random() * (max - min) + min;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.imageSmoothingEnabled = false;
    };

    const resetStar = (star: Star, initial = false) => {
      const safeRadius = Math.min(width, height) * 0.34;
      const angle = random(0, Math.PI * 2);
      const radius = Math.sqrt(Math.random()) * safeRadius;

      star.x = Math.cos(angle) * radius;
      star.y = Math.sin(angle) * radius;
      star.z = initial ? random(0.16, 1) : 1;

      star.speed = random(0.00065, 0.0022);
      star.size = random(1.2, 2.3);

      if (Math.random() < 0.18) {
        star.size *= random(1.5, 2);
        star.speed *= 1.12;
      }

      if (Math.random() < 0.08) {
        star.size *= 0.78;
        star.speed *= 0.9;
      }

      star.alpha = random(0.7, 1);
      star.fade = 0;
      star.fadeSpeed = random(0.012, 0.028);
      star.tintStrength = random(0.08, 0.22);
    };

    const createStars = () => {
      stars.length = 0;

      for (let i = 0; i < effectiveStarCount; i++) {
        const star: Star = {
          x: 0,
          y: 0,
          z: 1,
          speed: 0.001,
          size: 1,
          alpha: 1,
          fade: 0,
          fadeSpeed: 0.02,
          tintStrength: 0.14,
        };

        resetStar(star, true);
        stars.push(star);
      }
    };

    const drawStars = () => {
      const centerX = width / 2;
      const centerY = height / 2;

      context.clearRect(0, 0, width, height);

      for (const star of stars) {
        const previousZ = star.z;
        star.z -= star.speed;

        const x = centerX + star.x / star.z;
        const y = centerY + star.y / star.z;
        const prevX = centerX + star.x / previousZ;
        const prevY = centerY + star.y / previousZ;

        const isVisible = x >= -120 && x <= width + 120 && y >= -120 && y <= height + 120;

        if (!isVisible || star.z <= 0.003) {
          resetStar(star);
          continue;
        }

        star.fade = Math.min(1, star.fade + star.fadeSpeed);

        const depth = 1 - star.z;
        const alpha = Math.min(1, star.alpha * (0.24 + depth * 0.92) * star.fade);
        const coreSize = Math.max(1, star.size + depth * 1.22);
        const trailAlpha = alpha * (0.16 + depth * 0.16);

        context.beginPath();
        context.strokeStyle = `rgba(115,125,255,${trailAlpha})`;
        context.lineWidth = Math.max(0.45, coreSize * 0.2);
        context.moveTo(prevX, prevY);
        context.lineTo(x, y);
        context.stroke();

        const px = Math.round(x);
        const py = Math.round(y);
        const size = Math.max(1, Math.round(coreSize * 0.9));

        context.fillStyle = `rgba(248,248,248,${alpha})`;
        context.fillRect(px, py, size, size);
      }
    };

    const render = () => {
      drawStars();
      animationFrame = window.requestAnimationFrame(render);
    };

    const handleResize = () => {
      resizeCanvas();
      createStars();
    };

    resizeCanvas();
    createStars();
    render();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [effectiveStarCount]);

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none fixed inset-0 -z-20 overflow-hidden", className)}
      {...props}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* subtle top gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.015),transparent_18%,transparent_80%,rgba(0,0,0,0.12))]" />

      {/* main cosmic glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_20%,rgba(115,125,255,0.12),transparent_46%)] md:bg-[radial-gradient(circle_at_28%_20%,rgba(115,125,255,0.14),transparent_48%)]" />

      {/* secondary faint glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_72%,rgba(115,125,255,0.07),transparent_54%)] md:bg-[radial-gradient(circle_at_72%_72%,rgba(115,125,255,0.09),transparent_56%)]" />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_58%,rgba(0,0,0,0.22)_100%)]" />
    </div>
  );
}
