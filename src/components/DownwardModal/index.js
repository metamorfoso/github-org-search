import React, { useState } from 'react'

import downArrow from './keyboard_arrow_down-24px.svg'
import upArrow from './keyboard_arrow_up-24px.svg'

import './index.css'

const DownArrow = () => (
  <img className="toggleIcon" src={downArrow} alt="toggleShow--icon" />
)

const UpArrow = () => (
  <img className="toggleIcon" src={upArrow} alt="toggleHide--icon" />
)

const DownwardModal = ({ heading, children }) => {
  const [showComp, setShowComp] = useState(false)

  const toggleShowComp = (event) => {
    event.preventDefault()
    setShowComp(!showComp)
  }

  const arrow = showComp
    ? <UpArrow />
    : <DownArrow />

  return (
    <React.Fragment>
      <button className="toggleComponent" onClick={toggleShowComp}><span className="bold">{heading}</span> {arrow}</button>
      {showComp ? children : null}
    </React.Fragment>
  )
}

export {
  DownwardModal
}
