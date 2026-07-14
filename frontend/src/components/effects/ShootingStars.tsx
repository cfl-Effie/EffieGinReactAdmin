import React, { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  speed: number
  delay: number
  tail: number
}

const ShootingStars: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // 静态星空
    const bgStars: { x: number; y: number; size: number; opacity: number }[] = []
    for (let i = 0; i < 120; i++) {
      bgStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      })
    }

    // 流星
    let shootingStars: Star[] = []

    const spawnStar = () => {
      shootingStars.push({
        x: Math.random() * canvas.width * 1.2 - canvas.width * 0.1,
        y: Math.random() * canvas.height * 0.3,
        size: Math.random() * 2 + 1,
        opacity: 1,
        speed: Math.random() * 8 + 4,
        delay: 0,
        tail: Math.random() * 60 + 30,
      })
    }

    let lastSpawn = 0

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 绘制静态星星（闪烁）
      bgStars.forEach((star, i) => {
        const twinkle = Math.sin(time * 0.001 + i * 1.5) * 0.3 + 0.7
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`
        ctx.fill()
      })

      // 生成流星
      if (time - lastSpawn > 2000 + Math.random() * 4000) {
        spawnStar()
        lastSpawn = time
      }

      // 绘制并更新流星
      shootingStars = shootingStars.filter((star) => {
        star.x += star.speed * 0.8
        star.y += star.speed
        star.opacity -= 0.008

        if (star.opacity <= 0) return false

        // 流星尾迹
        const gradient = ctx.createLinearGradient(
          star.x, star.y,
          star.x - star.tail * 0.6,
          star.y - star.tail * 0.8
        )
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`)
        gradient.addColorStop(0.3, `rgba(168, 85, 247, ${star.opacity * 0.3})`)
        gradient.addColorStop(1, `rgba(99, 102, 241, 0)`)

        ctx.beginPath()
        ctx.moveTo(star.x, star.y)
        ctx.lineTo(star.x - star.tail * 0.6, star.y - star.tail * 0.8)
        ctx.strokeStyle = gradient
        ctx.lineWidth = star.size
        ctx.lineCap = 'round'
        ctx.stroke()

        // 发光头部
        const glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 4)
        glow.addColorStop(0, `rgba(255, 255, 255, ${star.opacity * 0.6})`)
        glow.addColorStop(1, `rgba(168, 85, 247, 0)`)
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size * 4, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()

        return true
      })

      requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}

export { ShootingStars }
