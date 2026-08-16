"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

/**
 * The hero's signature background: a slow-drifting constellation of nodes with
 * proximity links — a graph, which is the honest visual metaphor for the work,
 * rather than generic floating dots.
 *
 * Performance notes:
 *  - Colours are read from CSS custom properties (--viz-node/--viz-link) so the
 *    field re-tints with the theme instead of hardcoding a palette.
 *  - The loop is paused by IntersectionObserver once scrolled out of view, and
 *    by the tab's visibility state.
 *  - prefers-reduced-motion renders a single static frame and stops.
 *  - Link search is O(n²) over ~90 nodes, which is trivially cheap; a spatial
 *    grid would be premature here.
 */
export default function ParticleField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let frame = 0;
    let visible = true;

    const pointer = { x: -9999, y: -9999, active: false };

    // Read theme colours off the element so a theme switch re-tints the field.
    const styles = getComputedStyle(canvas);
    const nodeRGB = styles.getPropertyValue("--viz-node").trim() || "240 168 108";
    const linkRGB = styles.getPropertyValue("--viz-link").trim() || "240 168 108";

    const LINK_DISTANCE = 132;
    const POINTER_RADIUS = 170;

    function seed() {
      // Density scales with area so a wide desktop hero isn't sparse and a
      // phone isn't overloaded.
      const count = Math.min(96, Math.max(28, Math.round((width * height) / 17000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.4 + 0.7,
      }));
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (reduced) draw();
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);

      // Links first so nodes sit on top of them.
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > LINK_DISTANCE) continue;

          const strength = 1 - dist / LINK_DISTANCE;
          ctx!.strokeStyle = `rgba(${linkRGB} / ${(strength * 0.28).toFixed(3)})`;
          ctx!.lineWidth = 0.6;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.stroke();
        }
      }

      for (const n of nodes) {
        // Nodes near the cursor brighten — makes the field feel responsive
        // without moving anything jarringly.
        const near = pointer.active
          ? Math.max(0, 1 - Math.hypot(n.x - pointer.x, n.y - pointer.y) / POINTER_RADIUS)
          : 0;
        const alpha = 0.35 + near * 0.5;

        ctx!.fillStyle = `rgba(${nodeRGB} / ${alpha.toFixed(3)})`;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r + near * 1.2, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function step() {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;

        // Wrap rather than bounce: bouncing creates visible clustering at the
        // edges over time.
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;

        // Gentle repulsion from the cursor.
        if (pointer.active) {
          const dx = n.x - pointer.x;
          const dy = n.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < POINTER_RADIUS && dist > 0.01) {
            const push = (1 - dist / POINTER_RADIUS) * 0.35;
            n.x += (dx / dist) * push;
            n.y += (dy / dist) * push;
          }
        }
      }

      draw();
      frame = requestAnimationFrame(step);
    }

    function start() {
      if (reduced || frame) return;
      frame = requestAnimationFrame(step);
    }

    function stop() {
      if (!frame) return;
      cancelAnimationFrame(frame);
      frame = 0;
    }

    function onPointerMove(e: PointerEvent) {
      if (e.pointerType !== "mouse") return;
      const rect = canvas!.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    }

    function onPointerLeave() {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    }

    function onVisibility() {
      if (document.hidden) stop();
      else if (visible) start();
    }

    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // Don't burn frames animating a canvas that's scrolled off screen.
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !document.hidden) start();
        else stop();
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(canvas);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);

    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
    // Re-running on theme change re-reads the CSS colour variables.
  }, [resolvedTheme]);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
