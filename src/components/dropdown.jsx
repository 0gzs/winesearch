import React, { useEffect, useState, useRef } from 'react'
import './dropdown.scss'

const Dropdown = ({ selectState, title, options, icon }) => {
  const element = useRef(null)
  const { selection, setSelection } = selectState
  const [opened, setOpened] = useState(false)

  const toggle = () => opened ? setOpened(false) : setOpened(true)

  const reset = () => {
    setSelection(false)
    setOpened(false)
  }

  const handleChange = option => {
    toggle()
    setSelection(option)
  }

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
    <button className="dropdown" onClick={toggle} ref={element}>
      <i className={icon + " icon-left"}></i>
      {selection || title}
      {
        opened && !selection ? <i className="fa-solid fa-chevron-up icon-right"></i>
          : !selection ? <i className='fa-solid fa-chevron-down icon-right'></i>
            : <i className='fa-solid fa-xmark icon-right exit' onClick={reset}></i>
      }

      {
        opened && (
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
        )
      }
    </button>
  )
}

export default Dropdown
