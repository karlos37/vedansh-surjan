import {useRef} from 'react'
import {useFrame} from '@react-three/fiber'
import {Float} from '@react-three/drei'
import * as THREE from 'three'

export function DNA({position}: { position: [number, number, number] }) {
    const groupRef = useRef<THREE.Group>(null)

    useFrame(({clock}) => {
        if (!groupRef.current) return
        groupRef.current.rotation.y = clock.getElapsedTime() * 0.3
    })

    const helixPoints = []
    for (let i = 0; i < 30; i++) {
        const angle = (i / 30) * Math.PI * 4
        const radius = 0.5
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const y = (i / 30) * 3 - 1.5
        helixPoints.push([x, y, z] as [number, number, number])
    }

    return (
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
            <group ref={groupRef} position={position}>
                {helixPoints.map((point, i) => (
                    <mesh key={i} position={point}>
                        <sphereGeometry args={[0.08, 8, 8]}/>
                        <meshStandardMaterial
                            color="#64ffda"
                            emissive="#64ffda"
                            emissiveIntensity={0.5}
                        />
                    </mesh>
                ))}
            </group>
        </Float>
    )
}

export function GeometricCluster({position}: { position: [number, number, number] }) {
    const groupRef = useRef<THREE.Group>(null)

    useFrame(({clock}) => {
        if (!groupRef.current) return
        groupRef.current.rotation.x = clock.getElapsedTime() * 0.2
        groupRef.current.rotation.y = clock.getElapsedTime() * 0.3
    })

    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
            <group ref={groupRef} position={position}>
                <mesh position={[0, 0, 0]}>
                    <icosahedronGeometry args={[0.6, 1]}/>
                    <meshStandardMaterial
                        color="#ff6b35"
                        emissive="#ff6b35"
                        emissiveIntensity={0.3}
                        metalness={0.7}
                        roughness={0.3}
                        wireframe
                    />
                </mesh>

                <mesh position={[0, 0, 0]}>
                    <octahedronGeometry args={[0.4, 0]}/>
                    <meshStandardMaterial
                        color="#ffd166"
                        emissive="#ffd166"
                        emissiveIntensity={0.4}
                        metalness={0.9}
                        roughness={0.1}
                    />
                </mesh>
            </group>
        </Float>
    )
}

export function CrystalFormation({position}: { position: [number, number, number] }) {
    const groupRef = useRef<THREE.Group>(null)

    useFrame(({clock}) => {
        if (!groupRef.current) return
        const time = clock.getElapsedTime()
        groupRef.current.rotation.y = time * 0.4
        groupRef.current.rotation.z = Math.sin(time * 0.5) * 0.1
    })

    const crystals = [
        {pos: [0, 0, 0], scale: 1, rotation: 0},
        {pos: [0.3, 0.5, 0.2], scale: 0.6, rotation: Math.PI / 3},
        {pos: [-0.3, 0.4, -0.2], scale: 0.7, rotation: -Math.PI / 4},
        {pos: [0.2, -0.3, 0.3], scale: 0.5, rotation: Math.PI / 6},
    ]

    return (
        <Float speed={1} rotationIntensity={0.3} floatIntensity={0.6}>
            <group ref={groupRef} position={position}>
                {crystals.map((crystal, i) => (
                    <mesh
                        key={i}
                        position={crystal.pos as [number, number, number]}
                        rotation={[0, crystal.rotation, 0]}
                        scale={crystal.scale}
                    >
                        <coneGeometry args={[0.15, 0.8, 6]}/>
                        <meshStandardMaterial
                            color="#64ffda"
                            emissive="#64ffda"
                            emissiveIntensity={0.4}
                            metalness={0.9}
                            roughness={0.1}
                            transparent
                            opacity={0.8}
                        />
                    </mesh>
                ))}
            </group>
        </Float>
    )
}

export function AbstractRing({position}: { position: [number, number, number] }) {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame(({clock}) => {
        if (!meshRef.current) return
        meshRef.current.rotation.x = clock.getElapsedTime() * 0.4
        meshRef.current.rotation.y = clock.getElapsedTime() * 0.3
    })

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <mesh ref={meshRef} position={position}>
                <torusKnotGeometry args={[0.6, 0.15, 120, 20, 3, 2]}/>
                <meshStandardMaterial
                    color="#ffd166"
                    emissive="#ff6b35"
                    emissiveIntensity={0.3}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>
        </Float>
    )
}

