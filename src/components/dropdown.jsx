import React, { useEffect, useState } from 'react'
import './dropdown.scss'

import regions from '../data/regions.json'
import varietals from '../data/varietals.json'

const Dropdown = ({ handler, onChange, title, icon }) => {
  const options = title.toLowerCase() === 'region' ? regions : title.toLowerCase() === 'varietal' ? varietals : [1, 2, 3, 4, 5]

  const [selected, setSelected] = useState(null)
  const [hide, setHide] = useState(() => window.innerWidth < 500)

  const toggle = () => {
    if (handler.opened && handler.dropdownName === title) {
      handler.setOpened(false)
      handler.setDropdownName('')
    } else {
      handler.setOpened(true)
      handler.setDropdownName(title)
    }
  }

  const reset = () => {
    handler.setOpened(false)
    handler.setDropdownName('')
    setSelected(null)
    onChange(title, '')
  }

  const handleChange = option => {
    onChange(title, option)
    toggle()
    handler.setDropdownName(title)
    setSelected(option)
  }

  useEffect(() => {
    // on resize if screen size is less than 400 set hide to true
    const handleResize = () => {
      if (window.innerWidth < 500) setHide(true)
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
      {!hide && (
        <button className='button' type="button">
          {selected || title}
        </button>
      )}
      {handler.opened && handler.dropdownName === title && !selected ? (
        <i className="fa-solid fa-chevron-up icon-right"></i>
      ) : !selected ? (
        <i className='fa-solid fa-chevron-down icon-right'></i>
      ) : (
        <i className='fa-solid fa-xmark icon-right exit' onClick={reset}></i>
      )
      }
      {handler.opened && handler.dropdownName === title && (
        <div className="items-container" onMouseLeave={() => {
          if (handler.opened) handler.setOpened(false)
        }}>
          <div>
            {options.map((value, i) => {
              return (
                <p
                  key={i}
                  onClick={() => handleChange(value)}>
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
