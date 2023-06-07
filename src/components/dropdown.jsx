import React, { useEffect, useState } from 'react'
import './dropdown.scss'
import fieldData from '../data/fieldData.js'

const Dropdown = ({ onChange, title, icon, name }) => {
  const options = fieldData[name]

  const [opened, setOpened] = useState(false)
  const [selected, setSelected] = useState(null)
  const [hide, setHide] = useState(false)

  const toggle = () => setOpened(!opened)

  const reset = () => {
    setOpened(false)
    setSelected(null)
    onChange(name, '')
  }

  const handleChange = option => {
    onChange(name, option)
    toggle()
    setSelected(option)
  }

  useEffect(() => {
    // on resize if screen size is less than 400 set hide to true
    const handleResize = () => {
      if (window.innerWidth < 450) setHide(true)
      else setHide(false)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="dropdown" onClick={toggle}>
      <i className={icon + " icon-left"}></i>
      <button className='button' type="button">
        {hide ? '' : selected ? selected : title}
      </button>
      {opened && !selected ? (
            <i className="fa-solid fa-chevron-up icon-right"></i>
          ) : !selected ? (
            <i className='fa-solid fa-chevron-down icon-right'></i>
          ) : (
            <i className='fa-solid fa-xmark icon-right exit' onClick={reset}></i>
          )
        }
      {opened && (
        <div className="items-container" onMouseLeave={() => {
          if (opened) setOpened(false)
        }}>
          <div>
            {options.map((value, i) => {
              return (
                <p
                  key={i}
                  onClick={() => handleChange(value, name)}>
                  {value}
                </p>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dropdown
