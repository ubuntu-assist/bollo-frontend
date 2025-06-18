'use client'

import React, { useEffect, useRef } from 'react'
import {
  Engine,
  Render,
  Events,
  MouseConstraint,
  Mouse,
  World,
  Bodies,
  Bounds,
  Body,
} from 'matter-js'

interface PhysicsBody extends Body {
  url?: string
}

interface MouseConstraintEvent {
  source: {
    bodyB?: Body
    mouse: {
      position: { x: number; y: number }
    }
  }
}

const GetHelpSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const engineRef = useRef<Engine | null>(null)
  const renderRef = useRef<Render | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const cleanupRef = useRef<(() => void) | null>(null)

  const initSimulation = (): void => {
    if (!containerRef.current) {
      console.error('Container not found')
      return
    }

    // Create an engine
    const engine = Engine.create()
    const world = engine.world
    engineRef.current = engine

    // Get the container element and its dimensions
    const containerElement = containerRef.current

    // Ensure we get the full container dimensions
    const containerWidth =
      containerElement.offsetWidth || containerElement.clientWidth
    const containerHeight =
      containerElement.offsetHeight || containerElement.clientHeight

    // Fallback to ensure minimum dimensions
    const width = containerWidth > 0 ? containerWidth : 1200
    const height = containerHeight > 0 ? containerHeight : 400

    // Create a renderer
    const render = Render.create({
      element: containerElement,
      engine: engine,
      options: {
        width: width,
        height: height,
        pixelRatio: 2,
        background: '#fff',
        wireframes: false,
      },
    })
    renderRef.current = render

    // Create bounds - adjusted for 400px height
    const ground = Bodies.rectangle(width / 2, height + 40, width + 160, 80, {
      render: { fillStyle: '#fff' },
      isStatic: true,
    })

    const wallLeft = Bodies.rectangle(-40, height / 2, 80, height, {
      isStatic: true,
    })

    const wallRight = Bodies.rectangle(width + 40, height / 2, 80, height, {
      isStatic: true,
    })

    const roof = Bodies.rectangle(width / 2, -40, width + 160, 80, {
      isStatic: true,
    })

    // Object variables
    const radius = 20

    // Create physics bodies for categories - better distributed in 400px space
    const categories: Body[] = [
      // Top row (around Y: 100-120)
      Bodies.rectangle(width / 2 - 200, 100, 164, 56, {
        chamfer: { radius },
        render: {
          sprite: {
            texture: '/assets/images/01.png',
            xScale: 1,
            yScale: 1,
          },
        },
      }),
      Bodies.rectangle(width / 2 - 50, 110, 122, 56, {
        chamfer: { radius },
        render: {
          sprite: {
            texture: '/assets/images/02.png',
            xScale: 1,
            yScale: 1,
          },
        },
      }),
      Bodies.rectangle(width / 2 + 100, 105, 204, 56, {
        chamfer: { radius },
        render: {
          sprite: {
            texture: '/assets/images/03.png',
            xScale: 1,
            yScale: 1,
          },
        },
      }),
      Bodies.rectangle(width / 2 + 250, 115, 204, 56, {
        chamfer: { radius },
        render: {
          sprite: {
            texture: '/assets/images/04.png',
            xScale: 1,
            yScale: 1,
          },
        },
      }),

      // Second row (around Y: 160-180)
      Bodies.rectangle(width / 2 - 250, 160, 194, 56, {
        chamfer: { radius },
        render: {
          sprite: {
            texture: '/assets/images/05.png',
            xScale: 1,
            yScale: 1,
          },
        },
      }),
      Bodies.rectangle(width / 2 - 80, 170, 216, 56, {
        chamfer: { radius },
        render: {
          sprite: {
            texture: '/assets/images/06.png',
            xScale: 1,
            yScale: 1,
          },
        },
      }),
      Bodies.rectangle(width / 2 + 80, 165, 167, 56, {
        chamfer: { radius },
        render: {
          sprite: {
            texture: '/assets/images/07.png',
            xScale: 1,
            yScale: 1,
          },
        },
      }),
      Bodies.rectangle(width / 2 + 220, 175, 260, 56, {
        chamfer: { radius },
        render: {
          sprite: {
            texture: '/assets/images/08.png',
            xScale: 1,
            yScale: 1,
          },
        },
      }),

      // Third row (around Y: 220-240)
      Bodies.rectangle(width / 2 - 200, 220, 174, 56, {
        chamfer: { radius },
        render: {
          sprite: {
            texture: '/assets/images/09.png',
            xScale: 1,
            yScale: 1,
          },
        },
      }),
      Bodies.rectangle(width / 2 - 20, 230, 285, 56, {
        chamfer: { radius },
        render: {
          sprite: {
            texture: '/assets/images/10.png',
            xScale: 1,
            yScale: 1,
          },
        },
      }),
      Bodies.rectangle(width / 2 + 150, 225, 170, 56, {
        chamfer: { radius },
        render: {
          sprite: {
            texture: '/assets/images/11.png',
            xScale: 1,
            yScale: 1,
          },
        },
      }),

      // Fourth row (around Y: 280-300)
      Bodies.rectangle(width / 2 - 250, 280, 60, 56, {
        chamfer: { radius },
        render: {
          sprite: {
            texture: '/assets/images/12.png',
            xScale: 1,
            yScale: 1,
          },
        },
      }),
      Bodies.rectangle(width / 2 - 150, 290, 110, 56, {
        chamfer: { radius },
        render: {
          sprite: {
            texture: '/assets/images/13.png',
            xScale: 1,
            yScale: 1,
          },
        },
      }),
      Bodies.rectangle(width / 2 - 50, 285, 201, 56, {
        chamfer: { radius },
        render: {
          sprite: {
            texture: '/assets/images/14.png',
            xScale: 1,
            yScale: 1,
          },
        },
      }),
      Bodies.rectangle(width / 2 + 80, 295, 101, 56, {
        chamfer: { radius },
        render: {
          sprite: {
            texture: '/assets/images/15.png',
            xScale: 1,
            yScale: 1,
          },
        },
      }),

      // Fifth row (around Y: 340-360)
      Bodies.rectangle(width / 2 - 180, 340, 201, 56, {
        chamfer: { radius },
        render: {
          sprite: {
            texture: '/assets/images/16.png',
            xScale: 1,
            yScale: 1,
          },
        },
      }),
      Bodies.rectangle(width / 2 - 20, 350, 201, 56, {
        chamfer: { radius },
        render: {
          sprite: {
            texture: '/assets/images/17.png',
            xScale: 1,
            yScale: 1,
          },
        },
      }),
      Bodies.rectangle(width / 2 + 120, 345, 201, 56, {
        chamfer: { radius },
        render: {
          sprite: {
            texture: '/assets/images/18.png',
            xScale: 1,
            yScale: 1,
          },
        },
      }),
      Bodies.rectangle(width / 2 + 250, 355, 201, 56, {
        chamfer: { radius },
        render: {
          sprite: {
            texture: '/assets/images/19.png',
            xScale: 1,
            yScale: 1,
          },
        },
      }),
    ]

    // Add all bodies to the world
    World.add(engine.world, [ground, wallLeft, wallRight, roof, ...categories])

    // Add mouse control
    const mouse = Mouse.create(render.canvas)
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    })

    World.add(world, mouseConstraint)

    // Keep the mouse in sync with rendering
    render.mouse = mouse

    // Allow page scrolling in matter.js window
    if (mouse.element && (mouse as any).mousewheel) {
      mouse.element.removeEventListener('mousewheel', (mouse as any).mousewheel)
      mouse.element.removeEventListener(
        'DOMMouseScroll',
        (mouse as any).mousewheel
      )
    }

    // Detect clicks vs. drags
    let click = false

    const handleMouseDown = (): void => {
      click = true
    }

    const handleMouseMove = (): void => {
      click = false
    }

    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mousemove', handleMouseMove)

    const mouseUpHandler = (event: MouseConstraintEvent) => {
      const mouseConstraint = event.source
      const bodies = engine.world.bodies

      if (!mouseConstraint.bodyB) {
        for (let i = 0; i < bodies.length; i++) {
          const body = bodies[i] as PhysicsBody
          if (click === true) {
            if (Bounds.contains(body.bounds, mouseConstraint.mouse.position)) {
              const bodyUrl = body.url

              if (bodyUrl !== undefined) {
                window.open(bodyUrl, '_blank')
              }
              break
            }
          }
        }
      }
    }

    Events.on(mouseConstraint, 'mouseup', mouseUpHandler)

    Engine.run(engine)
    Render.run(render)

    cleanupRef.current = () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mousemove', handleMouseMove)
      Events.off(mouseConstraint, 'mouseup', mouseUpHandler)

      if (renderRef.current) {
        Render.stop(renderRef.current)
        if (renderRef.current.canvas) {
          renderRef.current.canvas.remove()
        }
      }

      if (engineRef.current) {
        Engine.clear(engineRef.current)
        World.clear(engineRef.current.world, false)
      }
    }
  }

  useEffect(() => {
    // Create intersection observer
    if (containerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Small delay to ensure container has proper dimensions
              setTimeout(() => {
                initSimulation()
              }, 100)

              // Disconnect the observer after triggering
              if (observerRef.current) {
                observerRef.current.disconnect()
              }
            }
          })
        },
        { threshold: 0.1 }
      )

      observerRef.current.observe(containerRef.current)
    }

    // Cleanup function
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }

      if (cleanupRef.current) {
        cleanupRef.current()
      }
    }
  }, [])

  return (
    <section className='stp-30'>
      <div className='relative flex items-center justify-center'>
        <h2 className='heading-2 relative font-bold text-n900'>
          Get help <span className='text-b300 underline'>Today</span>
          <img
            src='/assets/images/get_help_icon.png'
            alt=''
            className='absolute -bottom-24 right-0 z-20 sm:-bottom-20 sm:-right-28'
          />
        </h2>
      </div>

      <div className='overflow-hidden'>
        <div
          ref={containerRef}
          className='tags-container relative'
          style={{
            height: '400px',
            width: '100%',
            display: 'block',
            minHeight: '400px',
            minWidth: '100%',
          }}
        />
      </div>
    </section>
  )
}

export default GetHelpSection
