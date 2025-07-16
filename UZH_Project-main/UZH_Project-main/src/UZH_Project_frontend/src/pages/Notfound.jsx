import React from 'react'
import { TbError404 } from "react-icons/tb";
import { Link } from 'react-router-dom';

const Notfound = () => {
  return (
    <div>
      <TbError404 />
      <h1>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  )
}

export default Notfound