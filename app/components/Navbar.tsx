import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <nav className="w-full bg-white p-4 flex justify-between items-center shadow-md">
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center px-4">
        <Link to="/">
          <p className="text-2xl font-extrabold text-gray-900 tracking-tight">
            RESUMIND
          </p>
        </Link>
        <Link
          to="/upload"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-base transition"
        >
          Upload Resume
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
