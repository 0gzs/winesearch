import useScrollEffect from '../hooks/useScrollEffect.js'
import { useEffect, useState } from 'react'

import './header.scss'

const Header = () => {
  const [shrink, setShrink] = useState(false)
  const { scrolled } = useScrollEffect(100, 50)

  useEffect(() => {
    if (scrolled) {
      setShrink(true)
    } else setShrink(false)
  }, [scrolled])

  return (
    <header className={shrink ? 'shrink' : ''}>
      <h3>wineglass</h3>
    </header>
  )
}

export default Header
