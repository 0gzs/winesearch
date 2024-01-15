import './header.scss'

const Header = ({ effectState }) => {
  const { effect } = effectState 

  return (
    <header className={effect ? 'shrink' : ''}>
      <h3>wineglass</h3>
    </header>
  )
}

export default Header
