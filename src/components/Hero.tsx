import { useGSAP } from "@gsap/react"
import { SplitText } from "gsap/all"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef } from "react"
import { useMediaQuery } from "react-responsive"

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const isMobile = useMediaQuery({ maxWidth: 767 })

  useGSAP(() => {
    const heroSplit = new SplitText(".title", {
      type: "chars, words",
    })
    const paragraphSplit = new SplitText(".subtitle", {
      type: "lines",
    })

    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"))

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.05,
    })

    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.05,
      delay: 1,
    })

    // Animate the leaves
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(".left-leaf", { y: -200 }, 0)
      .to(".right-leaf", { y: 200 }, 0)

    const startValue = isMobile ? "top 40%" : "center 60%"
    const endValue = isMobile ? "120% top" : "bottom top"

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "video",
        start: startValue,
        end: endValue,
        scrub: true,
        pin: true,
      },
    })

    if (videoRef.current) {
      videoRef.current.onloadedmetadata = () => {
        if (videoRef.current)
          tl.to(videoRef.current, {
            currentTime: videoRef.current.duration,
          })
      }
    }
  }, [])

  return (
    <>
      <section id='hero' className='noisy'>
        <h1 className='title'>MOJITO</h1>
        <img
          src='/images/hero-left-leaf.png'
          alt='left leaf'
          className='left-leaf'
        />
        <img
          src='/images/hero-right-leaf.png'
          alt='right leaf'
          className='right-leaf'
        />
        <div className='body'>
          <div className='content'>
            <div className='space-y-5 hidden md:block'>
              <p>Cool Crips Classic.</p>
              <p className='subtitle'>
                Sirotez l'esprit <br /> de l'été
              </p>
            </div>
            <div className='view-cocktails'>
              <p className='subtitle'>
                Chaque cocktail de notre carte est un mélange d'ingrédients de
                qualité supérieure, de créativité, d'originalité et de recettes
                intemporelles – conçus pour ravir vos sens.
              </p>
              <a href='#cocktails' className='btn'>
                Voir nos Cocktails
              </a>
            </div>
          </div>
        </div>
      </section>
      <div className='video absolute inset-0'>
        <video
          src='/videos/output.mp4'
          playsInline
          preload='auto'
          muted
          ref={videoRef}
        />
      </div>
    </>
  )
}
