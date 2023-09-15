import useScrollEffect from '../hooks/useScrollEffect.js'

const Header = () => {
  const { scrolled } = useScrollEffect(100, 50) 

  let headerClass = ''
  if (scrolled) headerClass = 'shrink'

  return (
    <div id='header' className={`header ${headerClass}`}>
      <h3>wineglass</h3>
    </div>
  )
}

export default Header
