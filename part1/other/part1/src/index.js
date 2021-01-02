import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  })

  const handleLeftClick = () =>
    setClicks({ ...clicks, left: clicks.left + 1 })
  
  const handleRightClick = () =>
    setClicks({ ...clicks, right: clicks.right + 1 })

  return (
    <div>
      {clicks.left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {clicks.right}
    </div>
  )
}

// Sometimes many state variables are better than storing all data in one:
// const App = () => {
//   const [left, setLeft] = useState(0)
//   const [right, setRight] = useState(0)

//   return (
//     <div>
//       {left}
//       <button onClick={() => setLeft(left + 1)}>
//         left
//       </button>
//       <button onClick={() => setRight(right + 1)}>
//         right
//       </button>
//       {right}
//     </div>
//   )
// }


ReactDOM.render(
  <App />, 
  document.getElementById('root')
)
