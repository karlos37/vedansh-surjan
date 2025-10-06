import {useMemo, useRef} from 'react'
import {useFrame, useThree} from '@react-three/fiber'
import {Float, MeshTransmissionMaterial} from '@react-three/drei'
import * as THREE from 'three'

export function ParticleField() {
    const points = useRef<THREE.Points>(null)
    const particleCount = 1500

    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < particleCount; i++) {
            const x = (Math.random() - 0.5) * 50
            const y = (Math.random() - 0.5) * 50
            const z = (Math.random() - 0.5) * 50
            temp.push(x, y, z)
        }
        return new Float32Array(temp)
    }, [])

    useFrame(({clock}) => {
        if (!points.current) return
        points.current.rotation.y = clock.getElapsedTime() * 0.05
        points.current.rotation.x = clock.getElapsedTime() * 0.02
    })

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particles.length / 3}
                    array={particles}
                    itemSize={3}
                    args={[particles, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#64ffda"
                transparent
                opacity={0.6}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    )
}

export function ExperienceNode({position, color = "#64ffda", scale = 1}: {
    position: [number, number, number],
    color?: string,
    scale?: number
}) {
    const mesh = useRef<THREE.Mesh>(null)

    useFrame(({clock}) => {
        if (!mesh.current) return
        mesh.current.rotation.x = clock.getElapsedTime() * 0.3
        mesh.current.rotation.y = clock.getElapsedTime() * 0.2
    })

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={mesh} position={position} scale={scale}>
                <octahedronGeometry args={[0.5, 0]}/>
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.5}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>
        </Float>
    )
}

export function SkillSphere({position}: { position: [number, number, number] }) {
    return (
        <Float speed={3} rotationIntensity={0.3} floatIntensity={0.8}>
            <mesh position={position} scale={0.4}>
                <sphereGeometry args={[1, 16, 16]}/>
                <MeshTransmissionMaterial
                    backside
                    samples={4}
                    thickness={0.5}
                    chromaticAberration={0.5}
                    anisotropy={1}
                    distortion={0.3}
                    distortionScale={0.2}
                    temporalDistortion={0.1}
                    color="#64ffda"
                />
            </mesh>
        </Float>
    )
}

export function ScrollCamera({scrollProgress}: { scrollProgress: number }) {
    const {camera} = useThree()

    useFrame(() => {
        const targetZ = 10 - scrollProgress * 20
        const targetY = scrollProgress * 5
        const targetX = Math.sin(scrollProgress * Math.PI) * 3

        camera.position.x += (targetX - camera.position.x) * 0.05
        camera.position.y += (targetY - camera.position.y) * 0.05
        camera.position.z += (targetZ - camera.position.z) * 0.05
        camera.lookAt(0, scrollProgress * 3, 0)
    })

    return null
}

export function InteractiveGeometry({position, type}: {
    position: [number, number, number],
    type: 'dodecahedron' | 'torusknot' | 'icosahedron' | 'octahedron' | 'tetrahedron'
}) {
    const mesh = useRef<THREE.Mesh>(null)

    useFrame(({clock}) => {
        if (!mesh.current) return
        const time = clock.getElapsedTime()
        mesh.current.rotation.x = time * 0.3
        mesh.current.rotation.y = time * 0.5
        mesh.current.rotation.z = time * 0.2
        mesh.current.position.y = position[1] + Math.sin(time * 2 + position[0]) * 0.5
    })

    const geometry = {
        dodecahedron: <dodecahedronGeometry args={[0.8, 0]}/>,
        torusknot: <torusKnotGeometry args={[0.5, 0.18, 100, 16]}/>,
        icosahedron: <icosahedronGeometry args={[0.8, 0]}/>,
        octahedron: <octahedronGeometry args={[0.9, 0]}/>,
        tetrahedron: <tetrahedronGeometry args={[1, 0]}/>
    }[type]

    return (
        <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1}>
            <mesh ref={mesh} position={position}>
                {geometry}
                <meshStandardMaterial
                    color="#ffd166"
                    emissive="#ff6b35"
                    emissiveIntensity={0.3}
                    metalness={0.8}
                    roughness={0.2}
                    wireframe={false}
                />
            </mesh>
        </Float>
    )
}

export function AnimatedRings() {
    const group = useRef<THREE.Group>(null)

    useFrame(({clock}) => {
        if (!group.current) return
        group.current.rotation.x = clock.getElapsedTime() * 0.1
        group.current.rotation.y = clock.getElapsedTime() * 0.15
    })

    return (
        <group ref={group} position={[0, 0, -5]}>
            {[...Array(3)].map((_, i) => (
                <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[2 + i * 1.5, 0.05, 16, 100]}/>
                    <meshBasicMaterial
                        color="#64ffda"
                        transparent
                        opacity={0.3 - i * 0.08}
                    />
                </mesh>
            ))}
        </group>
    )
}

