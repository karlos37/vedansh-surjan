import './App.css'
import {Suspense} from 'react'
import {Canvas} from '@react-three/fiber'
import {Html, PerspectiveCamera, Stars} from '@react-three/drei'
import {motion} from 'framer-motion'
import {
    AnimatedRings,
    ExperienceNode,
    InteractiveGeometry,
    ParticleField,
    ScrollCamera,
    SkillSphere
} from './components/Scene3D'
import {AbstractRing, CrystalFormation, DNA, GeometricCluster} from './components/ComplexGeometry'
import {Asteroid, Rocket, Satellite, ShootingStar, Spaceship, Sparkles} from './components/SpaceObjects'
import {useScrollProgress} from './hooks/useScrollProgress'
import {ProjectMedia} from './components/ImageLightbox'

type Project = {
  title: string
  description: string
    tech: string
  url: string
    imageSrc?: string
    videoSrc?: string
}

type Experience = {
    company: string
    role: string
    period: string
    location: string
    highlights: string[]
}

function Scene3D() {
    const scrollProgress = useScrollProgress()

  return (
      <>
          <color attach="background" args={['#0a0e1a']}/>
          <fog attach="fog" args={['#0a0e1a', 10, 50]}/>

          <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={75}/>
          <ScrollCamera scrollProgress={scrollProgress}/>

          <ambientLight intensity={0.3}/>
          <directionalLight position={[10, 10, 5]} intensity={1} color="#64ffda"/>
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ff6b35"/>

          <Suspense fallback={<Html center>Loading experience...</Html>}>
              <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1}/>
              <ParticleField/>
              <AnimatedRings/>

              <ExperienceNode position={[-3, 2, -2]} color="#64ffda" scale={1.2}/>
              <ExperienceNode position={[3, -1, -3]} color="#ff6b35" scale={1}/>
              <ExperienceNode position={[0, 4, -5]} color="#ffd166" scale={0.8}/>

              <InteractiveGeometry position={[-5, 1, -8]} type="dodecahedron"/>
              <InteractiveGeometry position={[5, 3, -6]} type="icosahedron"/>
              <InteractiveGeometry position={[0, -2, -4]} type="octahedron"/>
              <InteractiveGeometry position={[-3, -3, -10]} type="torusknot"/>
              <InteractiveGeometry position={[4, 0, -12]} type="tetrahedron"/>

              <DNA position={[-6, -2, -6]}/>
              <GeometricCluster position={[6, 2, -8]}/>
              <CrystalFormation position={[-2, 5, -7]}/>
              <AbstractRing position={[3, -4, -9]}/>

              {/* Space Objects */}
              <Spaceship position={[-8, 3, -5]}/>
              <Rocket position={[7, 1, -7]}/>
              <Satellite position={[-4, 6, -8]}/>
              <Asteroid position={[5, -1, -11]}/>
              <Asteroid position={[-7, 0, -9]}/>

              {/* Shooting Stars */}
              <ShootingStar position={[10, 8, -3]}/>
              <ShootingStar position={[-12, 5, -6]}/>
              <ShootingStar position={[8, 12, -10]}/>

              {/* Sparkles */}
              <Sparkles position={[0, 0, -5]}/>
              <Sparkles position={[-5, 3, -8]}/>
              <Sparkles position={[6, -2, -12]}/>

              <SkillSphere position={[-4, -3, -7]}/>
              <SkillSphere position={[4, -4, -9]}/>
              <SkillSphere position={[0, -5, -11]}/>
      </Suspense>
      </>
  )
}

function Section({id, title, children, className = ''}: {
    id: string;
    title: string;
    children: React.ReactNode;
    className?: string
}) {
  return (
      <section id={id} className={`section ${className}`}>
          <motion.div
              initial={{opacity: 0, y: 30}}
              whileInView={{opacity: 1, y: 0}}
              transition={{duration: 0.6}}
              viewport={{once: true, margin: "-100px"}}
          >
              <h2>{title}</h2>
              {children}
          </motion.div>
    </section>
  )
}

export default function App() {
  const projects: Project[] = [
    {
        title: 'UTD ISA Mobile App',
        description: 'iOS app in Swift to list upcoming ISA events, manage airport-pickup requests, and launch a student housing marketplace.',
        tech: 'Swift, PostgreSQL',
        url: 'https://github.com/karlos37/utdisa_xcode/',
        imageSrc: '/images/utd-isa-app.png',
        videoSrc: '/images/utd-isa-demo.mp4',
    },
    {
        title: 'UTD Trends',
        description: 'Web application to compare courses offered at UTD by different professors, reducing enrollment process time by 50%.',
        tech: 'React, Java, MongoDB',
        url: 'https://github.com/UTDNebula/utd-trends',
    },
  ]

    const experiences: Experience[] = [
        {
            company: 'Mimosa Networks',
            role: 'Software Engineer Intern',
            period: 'May 2024 - May 2025',
            location: 'Dallas, USA',
            highlights: [
                'Improved REST API response times by 30% for MMP platform managing 300,000+ devices',
                'Upgraded 25 microservices from Java 8 to Java 17, cutting production incidents by 40%',
                'Added custom Grafana dashboards to monitor Kafka message failure rates'
            ]
        },
        {
            company: 'Société Générale Global Solution Center',
            role: 'Senior Software Engineer',
            period: 'Aug 2020 - July 2023',
            location: 'Bangalore, India',
            highlights: [
                'Engineered scalable full-stack inventory-finance web application, driving 35% revenue increase',
                'Reduced API latency by 50% (900ms → 450ms) through caching and optimization',
                'Improved microservices security with OAuth2, reducing vulnerabilities by 80%'
            ]
        },
        {
            company: 'Aditya Birla Group',
            role: 'Computer Vision Intern',
            period: 'June 2019 - June 2020',
            location: 'Bangalore, India',
            highlights: [
                'Developed real-time helmet detection system with 90%+ accuracy at 60 FPS',
                'Published research paper on irregularities in DeepFashionV2 dataset'
            ]
        }
    ]

    const skills = {
        languages: ['Java', 'Kotlin', 'C++', 'JavaScript', 'TypeScript', 'Python', 'Go', 'SQL', 'Swift'],
        databases: ['PostgreSQL', 'MySQL', 'Redis', 'Cassandra', 'MongoDB', 'Oracle'],
        tools: ['Docker', 'Kafka', 'Git', 'Maven', 'Flutter', 'React', 'Angular'],
        cloud: ['AWS (EC2, S3, Redshift)', 'Azure', 'Elastic Search', 'REST API']
    }

  return (
    <div className="app">
        <Canvas className="webgl-canvas">
            <Scene3D/>
        </Canvas>

        <div className="content-overlay">
            <nav className="nav">
                <div className="nav-logo">VS</div>
                <div className="nav-links">
                    <a href="#about">About</a>
                    <a href="#experience">Experience</a>
                    <a href="#skills">Skills</a>
                    <a href="#projects">Projects</a>
                    <a href="#contact">Contact</a>
                </div>
            </nav>

            <header className="hero">
                <motion.div
                    className="hero-content"
                    initial={{opacity: 0, y: 40}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 1, delay: 0.2}}
                >
                    <span className="hero-greeting">Hi, my name is</span>
                    <h1 className="hero-name">Vedansh Surjan</h1>
                    <h2 className="hero-tagline">Building scalable systems & beautiful interfaces</h2>
                    <p className="hero-description">
                        Full-stack Software Engineer specializing in Java Spring Boot microservices,
                        React applications, and cloud infrastructure. Currently pursuing MS in Computer Science at UT
                        Dallas.
                    </p>
                    <div className="hero-cta">
                        <a className="button button--primary" href="#projects">View My Work</a>
                        <a className="button button--secondary" href="mailto:vedansh008@gmail.com">Get in Touch</a>
                    </div>
                    <div className="hero-scroll-indicator">
                        <span>Scroll to explore</span>
                        <div className="scroll-arrow"></div>
                    </div>
                </motion.div>
            </header>

            <Section id="about" title="About Me">
                <div className="about-content">
                    <div className="about-main">
                        <motion.div
                            className="about-photo"
                            initial={{opacity: 0, scale: 0.8}}
                            whileInView={{opacity: 1, scale: 1}}
                            transition={{duration: 0.5}}
                            viewport={{once: true}}
                        >
                            <img src="/images/graduation.jpg" alt="Vedansh Surjan at UTD Graduation"/>
                            <div className="photo-caption">UTD Graduation 2025</div>
                        </motion.div>
                        <div className="about-text">
                            <p>
                                I'm a Software Engineer with a passion for building scalable, high-performance systems
                                and creating delightful user experiences. Currently completing my Master's in Computer
                                Science
                                at UT Dallas (GPA: 3.8), I bring 3+ years of professional experience building production
                                systems
                                that serve hundreds of thousands of users.
                            </p>
                            <p>
                                My journey spans from optimizing microservices at Société Générale to improving API
                                performance
                                at Mimosa Networks, where I work with Java Spring Boot, AWS, and modern web
                                technologies.
                                I'm particularly interested in distributed systems, real-time applications, and the
                                intersection
                                of backend architecture with frontend innovation.
                            </p>
                            <p>
                                Beyond coding, I've led the UTD Indian Students Association and enjoy solving complex
                                algorithmic challenges that push the boundaries of system design.
                            </p>
                        </div>
                    </div>
                    <div className="about-education">
                        <h3>Education</h3>
                        <div className="education-item">
                            <h4>The University of Texas at Dallas</h4>
                            <p className="degree">Master of Science, Computer Science</p>
                            <p className="meta">May 2025 · GPA: 3.8/4.0</p>
                        </div>
                        <div className="education-item">
                            <h4>BITS Pilani, India</h4>
                            <p className="degree">Master of Science, Mathematics</p>
                            <p className="meta">July 2020 · GPA: 3.6/4.0 · INSPIRE Scholarship</p>
                        </div>
                    </div>
                </div>
            </Section>

            <Section id="experience" title="Professional Experience">
                <div className="timeline">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.company}
                            className="timeline-item"
                            initial={{opacity: 0, x: index % 2 === 0 ? -50 : 50}}
                            whileInView={{opacity: 1, x: 0}}
                            transition={{duration: 0.5, delay: index * 0.1}}
                            viewport={{once: true}}
                        >
                            <div className="timeline-content">
                                <div className="timeline-header">
                                    <h3>{exp.role}</h3>
                                    <span className="company">{exp.company}</span>
                                </div>
                                <div className="timeline-meta">
                                    <span className="period">{exp.period}</span>
                                    <span className="location">{exp.location}</span>
                                </div>
                                <ul className="timeline-highlights">
                                    {exp.highlights.map((highlight, i) => (
                                        <li key={i}>{highlight}</li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Section>

            <Section id="skills" title="Technical Skills">
                <div className="skills-grid">
                    <div className="skill-category">
                        <h3>Languages</h3>
                        <div className="tags">
                            {skills.languages.map((skill) => (
                                <span key={skill} className="tag">{skill}</span>
                            ))}
                        </div>
                    </div>
                    <div className="skill-category">
                        <h3>Databases</h3>
                        <div className="tags">
                            {skills.databases.map((skill) => (
                                <span key={skill} className="tag">{skill}</span>
                            ))}
                        </div>
                    </div>
                    <div className="skill-category">
                        <h3>Tools & Frameworks</h3>
                        <div className="tags">
                            {skills.tools.map((skill) => (
                                <span key={skill} className="tag">{skill}</span>
                            ))}
                        </div>
                    </div>
                    <div className="skill-category">
                        <h3>Cloud & Infrastructure</h3>
                        <div className="tags">
                            {skills.cloud.map((skill) => (
                                <span key={skill} className="tag">{skill}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </Section>

            <Section id="projects" title="Featured Projects">
                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            className="project-card"
                            initial={{opacity: 0, y: 30}}
                            whileInView={{opacity: 1, y: 0}}
                            whileHover={{y: -8, scale: 1.02}}
                            transition={{duration: 0.3, delay: index * 0.1}}
                            viewport={{once: true}}
                        >
                            <div className="project-number">0{index + 1}</div>

                            {(project.imageSrc || project.videoSrc) && (
                                <ProjectMedia
                                    imageSrc={project.imageSrc}
                                    videoSrc={project.videoSrc}
                                    alt={`${project.title} screenshot`}
                                />
                            )}

                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <div className="project-tech">{project.tech}</div>
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noreferrer"
                                className="project-link"
                            >
                                View on GitHub →
                            </a>
                        </motion.div>
                    ))}
                </div>
            </Section>

            <Section id="contact" title="Get In Touch" className="contact-section">
                <div className="contact-content">
                    <p className="contact-text">
                        I'm currently open to new opportunities and interesting projects.
                        Whether you have a question or just want to say hi, feel free to reach out!
                    </p>
                    <div className="contact-links">
                        <a href="mailto:vedansh008@gmail.com" className="contact-item">
                            <span className="contact-icon">✉</span>
                            <span>vedansh008@gmail.com</span>
                        </a>
                        <a href="https://www.linkedin.com/in/vsurjan" target="_blank" rel="noreferrer"
                           className="contact-item">
                            <span className="contact-icon">💼</span>
                            <span>linkedin.com/in/vsurjan</span>
                        </a>
                        <a href="https://github.com/karlos37" target="_blank" rel="noreferrer" className="contact-item">
                            <span className="contact-icon">🔗</span>
                            <span>github.com/karlos37</span>
                        </a>
                        <a href="tel:+19452748792" className="contact-item">
                            <span className="contact-icon">📱</span>
                            <span>(945) 274-8792</span>
                        </a>
                    </div>
                    <div className="location">
                        <span className="location-icon">📍</span>
                        <span>Dallas, Texas, 75252</span>
                    </div>
                </div>
            </Section>

            <footer className="footer">
                <p>Designed & Built by Vedansh Surjan</p>
                <p className="footer-year">© {new Date().getFullYear()}</p>
            </footer>
        </div>
    </div>
  )
}
