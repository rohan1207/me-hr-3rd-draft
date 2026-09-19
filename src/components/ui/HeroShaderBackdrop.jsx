"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Soft liquid shader atmosphere, brand greys only.
 * Pauses when off-screen or when reduced-motion is preferred.
 */
export default function HeroShaderBackdrop({ className = "" }) {
 const canvasRef = useRef(null);
 const reduce = useReducedMotion();

 useEffect(() => {
 const canvas = canvasRef.current;
 if (!canvas || reduce) return;

 const gl = canvas.getContext("webgl", {
 alpha: false,
 antialias: false,
 powerPreference: "low-power",
 });
 if (!gl) return;

 const vs = `
 attribute vec2 a;
 void main(){ gl_Position = vec4(a,0.0,1.0); }
 `;
 const fs = `
 precision mediump float;
 uniform vec2 u_res;
 uniform float u_t;

 // Value noise
 float hash(vec2 p){
 p = fract(p*vec2(123.34,456.21));
 p += dot(p,p+45.32);
 return fract(p.x*p.y);
 }
 float noise(vec2 p){
 vec2 i=floor(p), f=fract(p);
 f=f*f*(3.0-2.0*f);
 return mix(
 mix(hash(i),hash(i+vec2(1,0)),f.x),
 mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),
 f.y
 );
 }
 float fbm(vec2 p){
 float v=0.0, a=0.5;
 for(int i=0;i<5;i++){
 v+=a*noise(p);
 p=p*2.02+vec2(1.7,9.2);
 a*=0.5;
 }
 return v;
 }

 void main(){
 vec2 uv = gl_FragCoord.xy/u_res.xy;
 vec2 p = (uv-0.5)*vec2(u_res.x/u_res.y,1.0);
 float t = u_t*0.08;

 // Slow liquid swirl
 float n = fbm(p*1.35 + vec2(t*0.6, -t*0.4));
 float n2 = fbm(p*2.1 - vec2(t*0.35, t*0.5) + n*0.85);
 float field = mix(n, n2, 0.55);

 // Soft vignette
 float vig = smoothstep(1.15, 0.25, length(p*1.05));

 // Brand palette: ink → deep → charcoal
 vec3 c1 = vec3(0.067, 0.067, 0.067); // #111
 vec3 c2 = vec3(0.122, 0.161, 0.216); // #1f2937
 vec3 c3 = vec3(0.169, 0.188, 0.212); // #2b3036
 vec3 col = mix(c1, c2, smoothstep(0.28, 0.72, field));
 col = mix(col, c3, smoothstep(0.55, 0.95, field)*0.55);
 col *= 0.72 + 0.28*vig;

 // Very subtle sheen (not neon)
 float sheen = pow(smoothstep(0.4, 0.85, field), 2.2)*0.08;
 col += vec3(sheen);

 gl_FragColor = vec4(col, 1.0);
 }
 `;

 const compile = (type, src) => {
 const s = gl.createShader(type);
 gl.shaderSource(s, src);
 gl.compileShader(s);
 return s;
 };
 const prog = gl.createProgram();
 gl.attachShader(prog, compile(gl.VERTEX_SHADER, vs));
 gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fs));
 gl.linkProgram(prog);
 gl.useProgram(prog);

 const buf = gl.createBuffer();
 gl.bindBuffer(gl.ARRAY_BUFFER, buf);
 gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
 const loc = gl.getAttribLocation(prog, "a");
 gl.enableVertexAttribArray(loc);
 gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

 const uRes = gl.getUniformLocation(prog, "u_res");
 const uT = gl.getUniformLocation(prog, "u_t");

 let raf = 0;
 let start = performance.now();
 let visible = true;

 const resize = () => {
 const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
 const w = canvas.clientWidth;
 const h = canvas.clientHeight;
 canvas.width = Math.max(1, Math.floor(w * dpr));
 canvas.height = Math.max(1, Math.floor(h * dpr));
 gl.viewport(0, 0, canvas.width, canvas.height);
 gl.uniform2f(uRes, canvas.width, canvas.height);
 };

 const ro = new ResizeObserver(resize);
 ro.observe(canvas);
 resize();

 const io = new IntersectionObserver(
 ([e]) => {
 visible = e.isIntersecting;
 },
 { threshold: 0.05 }
 );
 io.observe(canvas);

 const frame = (now) => {
 raf = requestAnimationFrame(frame);
 if (!visible) return;
 gl.uniform1f(uT, (now - start) / 1000);
 gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
 };
 raf = requestAnimationFrame(frame);

 return () => {
 cancelAnimationFrame(raf);
 ro.disconnect();
 io.disconnect();
 gl.getExtension("WEBGL_lose_context")?.loseContext();
 };
 }, [reduce]);

 if (reduce) {
 return (
 <div
 className={`absolute inset-0 bg-gradient-to-br from-mehr-ink via-mehr-deep to-mehr-charcoal ${className}`}
 aria-hidden
 />
 );
 }

 return (
 <canvas
 ref={canvasRef}
 className={`absolute inset-0 h-full w-full ${className}`}
 aria-hidden
 />
 );
}
