'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const DEFAULT_COLORS = [
  '#F97316', // Orange
  '#06B6D4', // Cyan
  '#8B5CF6', // Purple
  '#10B981', // Emerald
  '#EC4899', // Hot Pink
  '#F59E0B', // Amber
  '#3B82F6', // Blue
  '#14B8A6', // Teal
]

/**
 * Antigravity - Interactive 3D particle vortex & magnetic antigravity field
 * Pure Three.js implementation (zero React-Three-Fiber peer dependency conflicts)
 */
const Antigravity = ({
  count = 300,
  magnetRadius = 8,
  ringRadius = 8,
  waveSpeed = 0.4,
  waveAmplitude = 1,
  particleSize = 1.6,
  lerpSpeed = 0.08,
  color,
  colors = DEFAULT_COLORS,
  autoAnimate = true,
  particleVariance = 1,
  rotationSpeed = 0,
  depthFactor = 1,
  pulseSpeed = 3,
  particleShape = 'sphere',
  fieldStrength = 10,
  className = '',
  style = {}
}) => {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    let width = container.clientWidth || window.innerWidth
    let height = container.clientHeight || 500
    if (width === 0) width = 800
    if (height === 0) height = 500

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000)
    camera.position.set(0, 0, 50)

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setSize(width, height)

    const computeViewport = () => {
      const vFOV = (camera.fov * Math.PI) / 180
      const vHeight = 2 * Math.tan(vFOV / 2) * camera.position.z
      const vWidth = vHeight * (width / height)
      return { width: vWidth, height: vHeight }
    }
    let v = computeViewport()

    // Generate particles
    const particles = []
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100
      const factor = 20 + Math.random() * 100
      const speed = 0.01 + Math.random() / 200
      const xFactor = -50 + Math.random() * 100
      const yFactor = -50 + Math.random() * 100
      const zFactor = -50 + Math.random() * 100

      const x = (Math.random() - 0.5) * v.width * 1.2
      const y = (Math.random() - 0.5) * v.height * 1.2
      const z = (Math.random() - 0.5) * 20
      const randomRadiusOffset = (Math.random() - 0.5) * 2

      particles.push({
        t,
        factor,
        speed,
        xFactor,
        yFactor,
        zFactor,
        mx: x,
        my: y,
        mz: z,
        cx: x,
        cy: y,
        cz: z,
        vx: 0,
        vy: 0,
        vz: 0,
        randomRadiusOffset
      })
    }

    // Geometry based on shape (defaults to spherical 3D dot)
    let geometry
    if (particleShape === 'sphere' || particleShape === 'dot') {
      geometry = new THREE.SphereGeometry(0.22, 16, 16)
    } else if (particleShape === 'capsule') {
      geometry = new THREE.CapsuleGeometry(0.12, 0.45, 4, 8)
    } else if (particleShape === 'box') {
      geometry = new THREE.BoxGeometry(0.28, 0.28, 0.28)
    } else if (particleShape === 'tetrahedron') {
      geometry = new THREE.TetrahedronGeometry(0.3)
    } else {
      geometry = new THREE.SphereGeometry(0.22, 16, 16)
    }

    const material = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0.9
    })

    const mesh = new THREE.InstancedMesh(geometry, material, count)
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)

    // Assign different colors to individual particle dots
    const palette = (Array.isArray(colors) && colors.length > 0)
      ? colors
      : (color ? [color] : DEFAULT_COLORS)

    const tempColor = new THREE.Color()
    for (let i = 0; i < count; i++) {
      const chosenHex = palette[i % palette.length]
      tempColor.set(chosenHex)
      mesh.setColorAt(i, tempColor)
    }
    if (mesh.instanceColor) {
      mesh.instanceColor.needsUpdate = true
    }

    scene.add(mesh)

    // Pointer state
    const pointer = { x: 0, y: 0 }
    const lastMousePos = { x: 0, y: 0 }
    let lastMouseMoveTime = 0
    const virtualMouse = { x: 0, y: 0 }

    const onPointerMove = e => {
      const rect = canvas.getBoundingClientRect()
      if (
        e.clientX >= rect.left - 60 &&
        e.clientX <= rect.right + 60 &&
        e.clientY >= rect.top - 60 &&
        e.clientY <= rect.bottom + 60
      ) {
        const clientX = e.clientX - rect.left
        const clientY = e.clientY - rect.top
        pointer.x = (clientX / rect.width) * 2 - 1
        pointer.y = -(clientY / rect.height) * 2 + 1

        const dist = Math.hypot(pointer.x - lastMousePos.x, pointer.y - lastMousePos.y)
        if (dist > 0.001) {
          lastMouseMoveTime = performance.now()
          lastMousePos.x = pointer.x
          lastMousePos.y = pointer.y
        }
      }
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })

    const dummy = new THREE.Object3D()
    const clock = new THREE.Clock()
    let raf = 0

    const animate = () => {
      raf = requestAnimationFrame(animate)

      const elapsedTime = clock.getElapsedTime()
      const now = performance.now()

      let destX = (pointer.x * v.width) / 2
      let destY = (pointer.y * v.height) / 2

      // Gentle auto animation when idle
      if (autoAnimate && (now - lastMouseMoveTime > 2000)) {
        destX = Math.sin(elapsedTime * 0.5) * (v.width / 4)
        destY = Math.cos(elapsedTime * 0.5 * 2) * (v.height / 4)
      }

      const smoothFactor = 0.05
      virtualMouse.x += (destX - virtualMouse.x) * smoothFactor
      virtualMouse.y += (destY - virtualMouse.y) * smoothFactor

      const targetX = virtualMouse.x
      const targetY = virtualMouse.y
      const globalRotation = elapsedTime * rotationSpeed

      for (let i = 0; i < count; i++) {
        const particle = particles[i]
        const { speed, mx, my, mz, cz, randomRadiusOffset } = particle

        particle.t += speed / 2
        const t = particle.t

        const projectionFactor = 1 - cz / 50
        const projectedTargetX = targetX * projectionFactor
        const projectedTargetY = targetY * projectionFactor

        const dx = mx - projectedTargetX
        const dy = my - projectedTargetY
        const dist = Math.hypot(dx, dy)

        let targetPosX = mx
        let targetPosY = my
        let targetPosZ = mz * depthFactor

        if (dist < magnetRadius) {
          const angle = Math.atan2(dy, dx) + globalRotation
          const wave = Math.sin(t * waveSpeed + angle) * (0.5 * waveAmplitude)
          const deviation = randomRadiusOffset * (5 / (fieldStrength + 0.1))
          const currentRingRadius = ringRadius + wave + deviation

          targetPosX = projectedTargetX + currentRingRadius * Math.cos(angle)
          targetPosY = projectedTargetY + currentRingRadius * Math.sin(angle)
          targetPosZ = mz * depthFactor + Math.sin(t) * (1 * waveAmplitude * depthFactor)
        }

        particle.cx += (targetPosX - particle.cx) * lerpSpeed
        particle.cy += (targetPosY - particle.cy) * lerpSpeed
        particle.cz += (targetPosZ - particle.cz) * lerpSpeed

        dummy.position.set(particle.cx, particle.cy, particle.cz)
        dummy.lookAt(projectedTargetX, projectedTargetY, particle.cz)
        dummy.rotateX(Math.PI / 2)

        const currentDistToMouse = Math.hypot(particle.cx - projectedTargetX, particle.cy - projectedTargetY)
        const distFromRing = Math.abs(currentDistToMouse - ringRadius)
        let scaleFactor = Math.max(0, Math.min(1, 1 - distFromRing / 10))
        const finalScale = scaleFactor * (0.8 + Math.sin(t * pulseSpeed) * 0.2 * particleVariance) * particleSize
        dummy.scale.set(finalScale, finalScale, finalScale)

        dummy.updateMatrix()
        mesh.setMatrixAt(i, dummy.matrix)
      }

      mesh.instanceMatrix.needsUpdate = true
      renderer.render(scene, camera)
    }

    animate()

    const ro = new ResizeObserver(() => {
      if (!container) return
      width = container.clientWidth || window.innerWidth
      height = container.clientHeight || 500
      if (width === 0 || height === 0) return

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
      v = computeViewport()
    })
    ro.observe(container)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [
    count,
    magnetRadius,
    ringRadius,
    waveSpeed,
    waveAmplitude,
    particleSize,
    lerpSpeed,
    color,
    colors,
    autoAnimate,
    particleVariance,
    rotationSpeed,
    depthFactor,
    pulseSpeed,
    particleShape,
    fieldStrength
  ])

  return (
    <div
      ref={containerRef}
      className={`antigravity-container${className ? ` ${className}` : ''}`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        ...style
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}
      />
    </div>
  )
}

export default Antigravity
