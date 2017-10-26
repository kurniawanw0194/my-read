import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className='error-container'>
      <h1>404</h1>
      <p>Sorry, we can't seem to find the page you are looking for.</p>
      <Link to='/'>MyRead Home</Link>
    </div>
  )
}

export default ErrorPage