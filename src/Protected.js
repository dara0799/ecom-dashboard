import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Protected(props) {
  const history = useNavigate()
  let Cmp = props.Cmp
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      history('/')
    }
  }, [])
  return (
    <div>
      <Cmp />
    </div>
  )
}

export default Protected
