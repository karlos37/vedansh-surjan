import './App.css'
import { Suspense, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls, Stars } from '@react-three/drei'
import { motion } from 'framer-motion'

type Project = {
  title: string
  description: string
  url: string
}

function Player() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    ref.current.position.y = Math.sin(t * 2) * 0.2
    ref.current.rotation.y += 0.01
  })
  return (
    <mesh ref={ref} castShadow>
      <icosahedronGeometry args={[0.5, 1]} />
      <meshStandardMaterial color="#64ffda" metalness={0.3} roughness={0.2} />
    </mesh>
  )
}

function Collectible({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    ref.current.rotation.y = t
  })
  return (
    <mesh ref={ref} position={position}>
      <torusKnotGeometry args={[0.2, 0.06, 64, 16]} />
      <meshStandardMaterial color="#ffd166" emissive="#553311" emissiveIntensity={0.2} />
    </mesh>
  )
}

function MiniGame() {
  const collectibles = useMemo(() =>
    new Array(12).fill(0).map((_, i) => {
      const a = (i / 12) * Math.PI * 2
      const r = 3 + (i % 3)
      return [Math.cos(a) * r, 0.3, Math.sin(a) * r] as [number, number, number]
    }), []
  )

  return (
    <Canvas shadows camera={{ position: [0, 3, 8], fov: 60 }} style={{ height: 520 }}>
      <color attach="background" args={[0x0b132b]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
      <Stars radius={80} depth={40} count={2000} factor={4} fade speed={1} />
      <Suspense fallback={<Html>Loading scene…</Html>}>
        <Player />
        {collectibles.map((pos, i) => (
          <Collectible key={i} position={pos} />
        ))}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#1c2541" />
        </mesh>
      </Suspense>
      <OrbitControls enablePan={false} minDistance={4} maxDistance={12} />
    </Canvas>
  )
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="section">
      <h2>{title}</h2>
      {children}
    </section>
  )
}

export default function App() {
  const projects: Project[] = [
    {
      title: 'IITD RA Mobile App',
      description: 'Cross-platform app for research assistants; auth, workflows, and dashboards.',
      url: 'https://github.com/charles97/raioss_work/',
    },
    {
      title: 'IITD Trends',
      description: 'Data-driven insights visualized with modern charts and a clean UI.',
      url: 'https://github.com/IITDelhi/iitd-trends',
    },
  ]

  return (
    <div className="app">
      <nav className="nav">
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>

      <header className="hero">
        <div className="hero-text">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            Vedansh Surjan
          </motion.h1>
          <p>Full‑stack developer crafting delightful apps with React, Three.js, and Flutter.</p>
          <div className="cta">
            <a className="button" href="#projects">See Projects</a>
            <a className="button button--ghost" href="#contact">Get in Touch</a>
          </div>
        </div>
        <div className="hero-scene">
          <MiniGame />
        </div>
      </header>

      <Section id="about" title="About">
        <p>
          Builder at heart. I enjoy turning complex ideas into simple, reliable interfaces.
          Passionate about real‑time UIs, 3D interactions, and product polish.
        </p>
      </Section>

      <Section id="skills" title="Skills">
        <ul className="tags">
          {['React', 'TypeScript', 'Three.js', 'R3F', 'Node.js', 'Flutter', 'Dart', 'GraphQL', 'PostgreSQL'].map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </Section>

      <Section id="projects" title="Projects">
        <div className="grid">
          {projects.map((p) => (
            <a key={p.title} className="card" href={p.url} target="_blank" rel="noreferrer">
              <h3>{p.title}</h3>
              <p>{p.description}</p>
            </a>
          ))}
        </div>
      </Section>

      <Section id="contact" title="Contact">
        <p>
          Email: <a href="mailto:vedansh99@gmail.com">vedansh99@gmail.com</a> · LinkedIn: <a href="https://www.linkedin.com/in/vsurjan" target="_blank" rel="noreferrer">/in/vsurjan</a> · GitHub: <a href="https://github.com/charles97" target="_blank" rel="noreferrer">@charles97</a>
        </p>
      </Section>

      <footer className="footer">© {new Date().getFullYear()} Vedansh Surjan</footer>
    </div>
  )
}
