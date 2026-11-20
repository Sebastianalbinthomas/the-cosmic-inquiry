import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { SOLAR_SYSTEM_PLANETS } from '../../lib/cosmic-data';
import type { Planet } from '../../lib/types';
import { Play, Pause, RotateCcw, ExternalLink, Info, Compass, Sparkles } from 'lucide-react';

export default function SolarSystem3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // References to communicate with Three.js animation loop
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const planetsMeshMap = useRef<Map<string, THREE.Mesh>>(new Map());
  const orbitsGroupRef = useRef<THREE.Group | null>(null);
  const isPausedRef = useRef(false);
  isPausedRef.current = isPaused;

  const targetCameraPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 45, 80));
  const targetLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // SCENE & CAMERA
    const width = container.clientWidth;
    const height = container.clientHeight;
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1500);
    camera.position.set(0, 45, 80);
    cameraRef.current = camera;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0x222238, 1.2);
    scene.add(ambientLight);

    const sunPointLight = new THREE.PointLight(0xfff5ea, 3.5, 600, 0.4);
    sunPointLight.position.set(0, 0, 0);
    scene.add(sunPointLight);

    // BACKGROUND STAR PARTICLES (Three.js points)
    const starCount = 1200;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      const radius = THREE.MathUtils.randFloat(150, 400);
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const phi = THREE.MathUtils.randFloat(0, Math.PI);
      starPositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i + 2] = radius * Math.cos(phi);

      const isTinted = Math.random() > 0.7;
      starColors[i] = isTinted ? 0.6 : 1.0;
      starColors[i + 1] = isTinted ? 0.7 : 1.0;
      starColors[i + 2] = 1.0;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    const starMaterial = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });
    const starPoints = new THREE.Points(starGeometry, starMaterial);
    scene.add(starPoints);

    // SOLAR SYSTEM GROUP
    const orbitsGroup = new THREE.Group();
    scene.add(orbitsGroup);
    orbitsGroupRef.current = orbitsGroup;

    // 1. THE SUN
    const sunGeom = new THREE.SphereGeometry(4.8, 32, 32);
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xffa500 });
    const sunMesh = new THREE.Mesh(sunGeom, sunMat);
    sunMesh.name = 'sun';
    orbitsGroup.add(sunMesh);
    planetsMeshMap.current.set('sun', sunMesh);

    // Sun Glow Halo
    const glowGeom = new THREE.SphereGeometry(5.6, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xff7700,
      transparent: true,
      opacity: 0.35,
      side: THREE.BackSide
    });
    const sunGlow = new THREE.Mesh(glowGeom, glowMat);
    sunMesh.add(sunGlow);

    // Planet parameters for visual layout
    interface PlanetVisualConfig {
      slug: string;
      radius: number;
      orbitDistance: number;
      speed: number;
      color: number;
      roughness: number;
      hasRings?: boolean;
    }

    const planetConfigs: PlanetVisualConfig[] = [
      { slug: 'mercury', radius: 0.7, orbitDistance: 9.5, speed: 0.04, color: 0x9ca3af, roughness: 0.9 },
      { slug: 'venus', radius: 1.1, orbitDistance: 13.5, speed: 0.025, color: 0xeab308, roughness: 0.7 },
      { slug: 'earth', radius: 1.2, orbitDistance: 18.0, speed: 0.018, color: 0x38bdf8, roughness: 0.4 },
      { slug: 'mars', radius: 0.85, orbitDistance: 23.0, speed: 0.014, color: 0xef4444, roughness: 0.8 },
      { slug: 'jupiter', radius: 2.8, orbitDistance: 31.0, speed: 0.008, color: 0xf97316, roughness: 0.5 },
      { slug: 'saturn', radius: 2.3, orbitDistance: 40.0, speed: 0.006, color: 0xfbbf24, roughness: 0.6, hasRings: true },
      { slug: 'uranus', radius: 1.6, orbitDistance: 48.0, speed: 0.004, color: 0x22d3ee, roughness: 0.3 },
      { slug: 'neptune', radius: 1.5, orbitDistance: 55.0, speed: 0.003, color: 0x3b82f6, roughness: 0.3 }
    ];

    const planetPivots: { pivot: THREE.Group; mesh: THREE.Mesh; config: PlanetVisualConfig }[] = [];

    planetConfigs.forEach((cfg) => {
      // Orbit Line
      const orbitCurve = new THREE.EllipseCurve(0, 0, cfg.orbitDistance, cfg.orbitDistance, 0, 2 * Math.PI, false, 0);
      const points = orbitCurve.getPoints(100);
      const orbitGeometry = new THREE.BufferGeometry().setFromPoints(
        points.map((p) => new THREE.Vector3(p.x, 0, p.y))
      );
      const orbitMaterial = new THREE.LineBasicMaterial({
        color: 0x334155,
        transparent: true,
        opacity: 0.25
      });
      const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);
      orbitsGroup.add(orbitLine);

      // Pivot for rotation
      const pivot = new THREE.Group();
      orbitsGroup.add(pivot);

      // Planet Mesh
      const geom = new THREE.SphereGeometry(cfg.radius, 32, 32);
      const mat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        roughness: cfg.roughness,
        metalness: 0.1
      });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(cfg.orbitDistance, 0, 0);
      mesh.name = cfg.slug;
      pivot.add(mesh);

      planetsMeshMap.current.set(cfg.slug, mesh);

      // Saturn Rings
      if (cfg.hasRings) {
        const ringGeom = new THREE.RingGeometry(cfg.radius * 1.4, cfg.radius * 2.3, 40);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0xd97706,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.6
        });
        const ring = new THREE.Mesh(ringGeom, ringMat);
        ring.rotation.x = Math.PI / 2.3;
        mesh.add(ring);
      }

      // Earth Moon
      if (cfg.slug === 'earth') {
        const moonGeom = new THREE.SphereGeometry(0.3, 16, 16);
        const moonMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db });
        const moonMesh = new THREE.Mesh(moonGeom, moonMat);
        moonMesh.position.set(2.0, 0.4, 0);
        mesh.add(moonMesh);
      }

      // Initial random angle
      pivot.rotation.y = Math.random() * Math.PI * 2;
      planetPivots.push({ pivot, mesh, config: cfg });
    });

    setIsLoaded(true);

    // MOUSE / TOUCH INTERACTION
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousMousePosition = { x: clientX, y: clientY };
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      if (isDragging) {
        const deltaX = clientX - previousMousePosition.x;
        const deltaY = clientY - previousMousePosition.y;

        orbitsGroup.rotation.y += deltaX * 0.005;
        orbitsGroup.rotation.x = Math.max(-0.6, Math.min(0.6, orbitsGroup.rotation.x + deltaY * 0.003));

        previousMousePosition = { x: clientX, y: clientY };
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomFactor = e.deltaY * 0.05;
      camera.position.z = Math.max(25, Math.min(160, camera.position.z + zoomFactor));
      camera.position.y = Math.max(15, Math.min(100, camera.position.y + zoomFactor * 0.5));
    };

    // Click to select planet via raycasting
    const onClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const meshes = Array.from(planetsMeshMap.current.values());
      const intersects = raycaster.intersectObjects(meshes, true);

      if (intersects.length > 0) {
        let hitObject = intersects[0].object;
        while (hitObject.parent && hitObject.parent !== orbitsGroup && !planetsMeshMap.current.has(hitObject.name)) {
          if (hitObject.parent instanceof THREE.Mesh) {
            hitObject = hitObject.parent;
          } else {
            break;
          }
        }
        const planetSlug = hitObject.name;
        const found = SOLAR_SYSTEM_PLANETS.find((p) => p.slug === planetSlug);
        if (found) {
          handleSelectPlanet(found);
        }
      }
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onPointerDown);
    dom.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    dom.addEventListener('wheel', onWheel, { passive: false });
    dom.addEventListener('click', onClick);

    dom.addEventListener('touchstart', onPointerDown, { passive: true });
    dom.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // RESIZE
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // ANIMATION LOOP
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Rotate Sun
      sunMesh.rotation.y += 0.002;

      // Orbit movement
      if (!isPausedRef.current) {
        planetPivots.forEach(({ pivot, mesh, config }) => {
          pivot.rotation.y += config.speed * 0.35;
          mesh.rotation.y += 0.02;
        });
      }

      // Smooth camera interpolation towards target
      camera.position.lerp(targetCameraPos.current, 0.04);
      currentLookAt.current.lerp(targetLookAt.current, 0.04);
      camera.lookAt(currentLookAt.current);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      dom.removeEventListener('mousedown', onPointerDown);
      dom.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      dom.removeEventListener('wheel', onWheel);
      dom.removeEventListener('click', onClick);
      dom.removeEventListener('touchstart', onPointerDown);
      dom.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (dom.parentElement) {
        dom.parentElement.removeChild(dom);
      }
    };
  }, []);

  const handleSelectPlanet = (planet: Planet) => {
    setSelectedPlanet(planet);

    const mesh = planetsMeshMap.current.get(planet.slug);
    if (mesh) {
      const worldPos = new THREE.Vector3();
      mesh.getWorldPosition(worldPos);

      // Position camera close to planet
      targetLookAt.current = worldPos;
      targetCameraPos.current = new THREE.Vector3(
        worldPos.x + (planet.slug === 'sun' ? 18 : 6),
        worldPos.y + (planet.slug === 'sun' ? 10 : 3.5),
        worldPos.z + (planet.slug === 'sun' ? 22 : 8)
      );
    }
  };

  const handleResetCamera = () => {
    setSelectedPlanet(null);
    targetLookAt.current = new THREE.Vector3(0, 0, 0);
    targetCameraPos.current = new THREE.Vector3(0, 45, 80);
  };

  return (
    <div className="relative w-full h-[650px] sm:h-[750px] rounded-3xl overflow-hidden bg-gradient-to-b from-cosmic-950 via-cosmic-900 to-cosmic-950 border border-violet-500/20 shadow-2xl">
      {/* 3D Canvas Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Header controls overlay */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
        <div className="pointer-events-auto flex items-center gap-2 bg-cosmic-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-violet-500/20 text-xs font-mono text-slate-300">
          <Sparkles className="w-3.5 h-3.5 text-stellar-gold animate-pulse" />
          <span>Interactive 3D Planetary Observatory</span>
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={() => setIsPaused((prev) => !prev)}
            className="p-2 rounded-full bg-cosmic-900/80 backdrop-blur-md border border-violet-500/20 text-slate-300 hover:text-white hover:bg-violet-900/40 transition-all"
            title={isPaused ? 'Resume Orbital Dynamics' : 'Pause Orbital Dynamics'}
            aria-label="Pause or Resume Orbit"
          >
            {isPaused ? <Play className="w-4 h-4 text-cyan-400" /> : <Pause className="w-4 h-4" />}
          </button>

          <button
            onClick={handleResetCamera}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cosmic-900/80 backdrop-blur-md border border-violet-500/20 text-xs font-mono text-slate-300 hover:text-white hover:bg-violet-900/40 transition-all"
            title="Reset Camera View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset View</span>
          </button>
        </div>
      </div>

      {/* Horizontal Planet Quick Select Bar */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-1.5 sm:gap-2 overflow-x-auto py-2 z-10 pointer-events-auto scrollbar-none">
        {SOLAR_SYSTEM_PLANETS.map((p) => {
          const isSelected = selectedPlanet?.slug === p.slug;
          return (
            <button
              key={p.slug}
              onClick={() => handleSelectPlanet(p)}
              className={`flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-violet-900/80 border-violet-400 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)] scale-105'
                  : 'bg-cosmic-900/70 border-violet-500/20 text-slate-400 hover:text-white hover:border-violet-500/50'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: p.colorHex, boxShadow: `0 0 6px ${p.glowColor}` }}
              />
              <span>{p.name}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Planet HUD Card */}
      {selectedPlanet && (
        <div className="absolute top-16 right-4 sm:right-6 w-80 sm:w-96 max-w-[calc(100vw-2rem)] p-5 rounded-2xl bg-cosmic-900/90 backdrop-blur-xl border border-violet-500/30 shadow-2xl text-slate-200 z-20 animate-fade-in">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest">
                {selectedPlanet.type}
              </span>
              <h3 className="text-xl font-bold font-heading text-white flex items-center gap-2 mt-0.5">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: selectedPlanet.colorHex, boxShadow: `0 0 10px ${selectedPlanet.glowColor}` }}
                />
                {selectedPlanet.name}
              </h3>
            </div>
            <button
              onClick={() => setSelectedPlanet(null)}
              className="text-slate-400 hover:text-white text-xs font-mono p-1 rounded-lg hover:bg-cosmic-800"
            >
              ✕
            </button>
          </div>

          <p className="mt-2 text-xs text-slate-300 leading-relaxed">
            {selectedPlanet.shortDescription}
          </p>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-violet-500/20 text-xs font-mono">
            <div className="p-2 rounded-lg bg-cosmic-950/60 border border-violet-500/10">
              <span className="text-[10px] text-slate-400 block">Radius</span>
              <span className="text-white font-semibold">{selectedPlanet.radiusKm.toLocaleString()} km</span>
            </div>
            <div className="p-2 rounded-lg bg-cosmic-950/60 border border-violet-500/10">
              <span className="text-[10px] text-slate-400 block">Solar Distance</span>
              <span className="text-white font-semibold">
                {selectedPlanet.distanceFromSunMillionKm === 0 ? 'Center' : `${selectedPlanet.distanceFromSunMillionKm}M km`}
              </span>
            </div>
            <div className="p-2 rounded-lg bg-cosmic-950/60 border border-violet-500/10">
              <span className="text-[10px] text-slate-400 block">Orbital Period</span>
              <span className="text-white font-semibold">
                {selectedPlanet.orbitalPeriodDays === 0 ? 'N/A' : `${selectedPlanet.orbitalPeriodDays} days`}
              </span>
            </div>
            <div className="p-2 rounded-lg bg-cosmic-950/60 border border-violet-500/10">
              <span className="text-[10px] text-slate-400 block">Confirmed Moons</span>
              <span className="text-white font-semibold">{selectedPlanet.moonsCount}</span>
            </div>
          </div>

          {/* Explore Planet Button */}
          <a
            href={`/explore/${selectedPlanet.slug}`}
            className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-heading text-xs font-semibold tracking-wider uppercase transition-all shadow-lg shadow-violet-600/30 group"
          >
            <span>Explore {selectedPlanet.name}</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      )}

      {/* Touch / interaction helper tooltip */}
      <div className="hidden sm:flex absolute bottom-16 left-6 items-center gap-2 text-[11px] font-mono text-slate-400 bg-cosmic-950/70 backdrop-blur-sm px-3 py-1 rounded-full border border-violet-500/15 pointer-events-none">
        <Compass className="w-3.5 h-3.5 text-violet-400" />
        <span>Drag to rotate • Scroll to zoom • Click planet to inspect</span>
      </div>

      {/* Scientific disclaimer badge per Part 3.3 */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 hidden md:block text-[10px] font-mono text-slate-500 pointer-events-none">
        Astronomical Model: Planetary scale & orbital distances optimized for visual clarity
      </div>
    </div>
  );
}
