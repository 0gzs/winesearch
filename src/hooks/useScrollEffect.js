import { useEffect } from 'react'

const useScrollEffect = (containerRef, results, effectState) => {
  const { effect, setEffect } = effectState 

  useEffect(() => {
    const container = containerRef.current
    const onScroll = () => {
      if (container.scrollTop > 0 && !effect) setEffect(true)
      if (container.scrollTop === 0 && effect) setEffect(false)
    }

    if (container) {
      container.addEventListener("scroll", onScroll)
    }
  }, [containerRef, results, effect, setEffect])
}

export default useScrollEffect
