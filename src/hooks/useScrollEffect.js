import { useState, useEffect } from 'react'

const useScrollEffect = (offset, offsetOff) => {
 const [scrolled, setScrolled] = useState(false)  
  
  useEffect(() => {
    let rafId = null

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId)

        rafId = requestAnimationFrame(() => {
          const currentOffset = window.pageYOffset
          
          if (Math.floor(currentOffset) >= offset && !scrolled) setScrolled(true)
          else if (Math.floor(currentOffset) < offsetOff && scrolled) setScrolled(false)
        })
    }

    window.addEventListener('scroll', onScroll)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll);
    }
  }, [scrolled, offset, offsetOff]) 

  return { scrolled }
}

export default useScrollEffect
