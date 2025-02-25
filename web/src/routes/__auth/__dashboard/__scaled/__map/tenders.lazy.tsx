import * as React from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'
import { cn } from '~/lib/utils'
import { motion } from 'motion/react'

export const Route = createLazyFileRoute(
  '/__auth/__dashboard/__scaled/__map/tenders',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    // setMounted(true);
    // setTimeout(() => {
    //   setMounted(true);
    // }, 400);
  }, [])

  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
        <div
          className={cn(
            'relative h-40 w-40 bg-white animate-in slide-in-from-top-0',
            // !mounted && "-translate-y-full",
          )}
        >
          <FlippingCard />
        </div>
      </div>
    </>
  )
}

const FlippingCard = () => {
  const [isFlipped, setIsFlipped] = React.useState(false)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipped((prev) => !prev)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="card-container"
      style={{
        width: '454px',
        height: '271px',
        perspective: '1000px', // Adds depth for 3D animation
      }}
    >
      <motion.div
        className="card"
        animate={{ rotateY: isFlipped ? 180 : 0 }} // Animates the flip
        transition={{ duration: 1 }} // Controls the flip speed
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d', // Enables 3D effect
        }}
      >
        {/* Front Side */}
        <motion.div
          className="card-front"
          style={{
            position: 'absolute',
            backfaceVisibility: 'hidden', // Ensures only one side is visible
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div>123</div>
        </motion.div>

        {/* Back Side */}
        <motion.div
          className="card-back"
          style={{
            position: 'absolute',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)', // Flips the back face
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div>abc</div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
