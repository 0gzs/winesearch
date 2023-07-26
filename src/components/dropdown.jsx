import React, { useEffect, useState, useRef } from 'react'
import './dropdown.scss'

import regions from '../data/regions.json'
import varietals from '../data/varietals.json'

const Dropdown = ({ onChange, title, icon }) => {
  const element = useRef(null)
  const options = title.toLowerCase() === 'region' ? regions : title.toLowerCase() === 'varietal' ? varietals : [1, 2, 3, 4, 5]

  const [opened, setOpened] = useState(false)
  const [selected, setSelected] = useState(null)
  const [hide, setHide] = useState(() => window.innerWidth < 500)

  const toggle = () => setOpened(!opened)

  const reset = () => {
    setOpened(false)
    setSelected(null)
    onChange(title, '')
  }

  const handleChange = option => {
    toggle()
    onChange(title, option)
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

  useEffect(() => {
    const handleClickOutside = event => {
      if (element.current && !element.current.contains(event.target)) {
        setOpened(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [element])

  return (
    <div className="dropdown" onClick={toggle} ref={element}>
      <i className={icon + " icon-left"}></i>
      {!hide && (
        <button className='button' type="button">
          {selected || title}
        </button>
      )}
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
            {options.map((option, i) => {
              return (
                <p
                  key={i}
                  onClick={() => handleChange(option)}>
                  {option}
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
