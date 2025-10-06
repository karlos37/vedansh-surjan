import {useRef} from 'react'
import {useFrame} from '@react-three/fiber'
import {Float} from '@react-three/drei'
import * as THREE from 'three'

export function Spaceship({position}: { position: [number, number, number] }) {
    const groupRef = useRef<THREE.Group>(null)

    useFrame(({clock}) => {
        if (!groupRef.current) return
        const time = clock.getElapsedTime()
        groupRef.current.rotation.y = time * 0.2
        groupRef.current.position.x = position[0] + Math.sin(time * 0.5) * 0.3
        groupRef.current.position.z = position[2] + Math.cos(time * 0.3) * 0.2
    })

    return (
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
            <group ref={groupRef} position={position}>
                {/* Main body */}
                <mesh position={[0, 0, 0]}>
                    <capsuleGeometry args={[0.3, 1.2, 4, 8]}/>
                    <meshStandardMaterial
                        color="#64ffda"
                        emissive="#64ffda"
                        emissiveIntensity={0.3}
                        metalness={0.9}
                        roughness={0.1}
                    />
                </mesh>

                {/* Wings */}
                <mesh position={[-0.4, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
                    <boxGeometry args={[0.1, 0.8, 0.3]}/>
                    <meshStandardMaterial
                        color="#ff6b35"
                        emissive="#ff6b35"
                        emissiveIntensity={0.2}
                        metalness={0.8}
                        roughness={0.2}
                    />
                </mesh>
                <mesh position={[0.4, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
                    <boxGeometry args={[0.1, 0.8, 0.3]}/>
                    <meshStandardMaterial
                        color="#ff6b35"
                        emissive="#ff6b35"
                        emissiveIntensity={0.2}
                        metalness={0.8}
                        roughness={0.2}
                    />
                </mesh>

                {/* Engine glow */}
                <mesh position={[0, -0.8, 0]}>
                    <sphereGeometry args={[0.2, 8, 8]}/>
                    <meshStandardMaterial
                        color="#ffd166"
                        emissive="#ffd166"
                        emissiveIntensity={0.8}
                        transparent
                        opacity={0.6}
                    />
                </mesh>
            </group>
        </Float>
    )
}

export function Rocket({position}: { position: [number, number, number] }) {
    const groupRef = useRef<THREE.Group>(null)

    useFrame(({clock}) => {
        if (!groupRef.current) return
        const time = clock.getElapsedTime()
        groupRef.current.rotation.y = time * 0.1
        groupRef.current.position.y = position[1] + Math.sin(time * 2) * 0.4
    })

    return (
        <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.4}>
            <group ref={groupRef} position={position}>
                {/* Main body */}
                <mesh position={[0, 0, 0]}>
                    <cylinderGeometry args={[0.2, 0.3, 1.5, 8]}/>
                    <meshStandardMaterial
                        color="#e6f1ff"
                        emissive="#64ffda"
                        emissiveIntensity={0.2}
                        metalness={0.7}
                        roughness={0.3}
                    />
                </mesh>

                {/* Nose cone */}
                <mesh position={[0, 0.9, 0]}>
                    <coneGeometry args={[0.2, 0.4, 8]}/>
                    <meshStandardMaterial
                        color="#ff6b35"
                        emissive="#ff6b35"
                        emissiveIntensity={0.3}
                        metalness={0.8}
                        roughness={0.2}
                    />
                </mesh>

                {/* Fins */}
                {[0, Math.PI / 2, Math.PI, 3 * Math.PI / 2].map((angle, i) => (
                    <mesh key={i} position={[Math.cos(angle) * 0.25, -0.6, Math.sin(angle) * 0.25]}
                          rotation={[0, angle, 0]}>
                        <boxGeometry args={[0.1, 0.3, 0.2]}/>
                        <meshStandardMaterial
                            color="#ffd166"
                            emissive="#ffd166"
                            emissiveIntensity={0.2}
                            metalness={0.6}
                            roughness={0.4}
                        />
                    </mesh>
                ))}

                {/* Engine flame */}
                <mesh position={[0, -1, 0]}>
                    <coneGeometry args={[0.15, 0.5, 8]}/>
                    <meshStandardMaterial
                        color="#ff6b35"
                        emissive="#ff6b35"
                        emissiveIntensity={1}
                        transparent
                        opacity={0.7}
                    />
                </mesh>
            </group>
        </Float>
    )
}

export function ShootingStar({position}: { position: [number, number, number] }) {
    const groupRef = useRef<THREE.Group>(null)
    const trailRef = useRef<THREE.Points>(null)

    useFrame(({clock}) => {
        if (!groupRef.current || !trailRef.current) return
        const time = clock.getElapsedTime()

        // Move the star
        groupRef.current.position.x = position[0] - time * 2
        groupRef.current.position.y = position[1] - time * 0.5
        groupRef.current.position.z = position[2] - time * 1.5

        // Rotate the star
        groupRef.current.rotation.z = time * 5

        // Update trail
        const trailPositions = []
        for (let i = 0; i < 20; i++) {
            const t = time - i * 0.1
            trailPositions.push(
                position[0] - t * 2,
                position[1] - t * 0.5,
                position[2] - t * 1.5
            )
        }
        trailRef.current.geometry.setAttribute('position', new THREE.Float32BufferAttribute(trailPositions, 3))
    })

    return (
        <group ref={groupRef} position={position}>
            {/* Main star */}
            <mesh>
                <octahedronGeometry args={[0.1, 0]}/>
                <meshStandardMaterial
                    color="#ffffff"
                    emissive="#64ffda"
                    emissiveIntensity={1}
                />
            </mesh>

            {/* Trail */}
            <points ref={trailRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={20}
                        array={new Float32Array(60)}
                        itemSize={3}
                        args={[new Float32Array(60), 3]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.02}
                    color="#64ffda"
                    transparent
                    opacity={0.8}
                    sizeAttenuation
                />
            </points>
        </group>
    )
}

export function Sparkles({position}: { position: [number, number, number] }) {
    const pointsRef = useRef<THREE.Points>(null)

    useFrame(({clock}) => {
        if (!pointsRef.current) return
        const time = clock.getElapsedTime()

        // Create sparkle positions
        const sparklePositions = []
        const sparkleColors = []

        for (let i = 0; i < 50; i++) {
            const angle = (i / 50) * Math.PI * 2
            const radius = 1 + Math.sin(time * 2 + i) * 0.3
            const height = Math.sin(time * 3 + i * 0.5) * 0.5

            sparklePositions.push(
                position[0] + Math.cos(angle) * radius,
                position[1] + height,
                position[2] + Math.sin(angle) * radius
            )

            // Color based on position
            const color = new THREE.Color()
            color.setHSL((time * 0.1 + i * 0.02) % 1, 0.8, 0.7)
            sparkleColors.push(color.r, color.g, color.b)
        }

        pointsRef.current.geometry.setAttribute('position', new THREE.Float32BufferAttribute(sparklePositions, 3))
        pointsRef.current.geometry.setAttribute('color', new THREE.Float32BufferAttribute(sparkleColors, 3))
    })

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={50}
                    array={new Float32Array(150)}
                    itemSize={3}
                    args={[new Float32Array(150), 3]}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={50}
                    array={new Float32Array(150)}
                    itemSize={3}
                    args={[new Float32Array(150), 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    )
}

export function Satellite({position}: { position: [number, number, number] }) {
    const groupRef = useRef<THREE.Group>(null)

    useFrame(({clock}) => {
        if (!groupRef.current) return
        const time = clock.getElapsedTime()
        groupRef.current.rotation.y = time * 0.5
        groupRef.current.position.x = position[0] + Math.sin(time * 0.3) * 0.2
        groupRef.current.position.z = position[2] + Math.cos(time * 0.3) * 0.2
    })

    return (
        <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.2}>
            <group ref={groupRef} position={position}>
                {/* Main body */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[0.3, 0.2, 0.4]}/>
                    <meshStandardMaterial
                        color="#a8b2d1"
                        emissive="#64ffda"
                        emissiveIntensity={0.2}
                        metalness={0.9}
                        roughness={0.1}
                    />
                </mesh>

                {/* Solar panels */}
                <mesh position={[-0.4, 0, 0]}>
                    <boxGeometry args={[0.6, 0.05, 0.3]}/>
                    <meshStandardMaterial
                        color="#1a2139"
                        emissive="#ffd166"
                        emissiveIntensity={0.1}
                        metalness={0.8}
                        roughness={0.2}
                    />
                </mesh>
                <mesh position={[0.4, 0, 0]}>
                    <boxGeometry args={[0.6, 0.05, 0.3]}/>
                    <meshStandardMaterial
                        color="#1a2139"
                        emissive="#ffd166"
                        emissiveIntensity={0.1}
                        metalness={0.8}
                        roughness={0.2}
                    />
                </mesh>

                {/* Antenna */}
                <mesh position={[0, 0.2, 0]}>
                    <cylinderGeometry args={[0.01, 0.01, 0.3, 4]}/>
                    <meshStandardMaterial
                        color="#64ffda"
                        emissive="#64ffda"
                        emissiveIntensity={0.5}
                    />
                </mesh>
            </group>
        </Float>
    )
}

export function Asteroid({position}: { position: [number, number, number] }) {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame(({clock}) => {
        if (!meshRef.current) return
        const time = clock.getElapsedTime()
        meshRef.current.rotation.x = time * 0.3
        meshRef.current.rotation.y = time * 0.4
        meshRef.current.rotation.z = time * 0.2
        meshRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.1
    })

    return (
        <Float speed={0.5} rotationIntensity={0.4} floatIntensity={0.1}>
            <mesh ref={meshRef} position={position}>
                <dodecahedronGeometry args={[0.4, 0]}/>
                <meshStandardMaterial
                    color="#6b7595"
                    emissive="#ff6b35"
                    emissiveIntensity={0.1}
                    metalness={0.3}
                    roughness={0.8}
                />
            </mesh>
        </Float>
    )
}
