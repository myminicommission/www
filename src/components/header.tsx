import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = () => (
  <header className="flex flex-shrink-0">
    <div className="flex-shrink-0 px-4 py-3 bg-black w-64">
      <Link to="/">
        <span className="ml-4 text-xl font-medium text-white">
          My Mini Commission
        </span>
      </Link>
    </div>
    <div className="flex-1 flex bg-black px-6 items-center justify-between">
      <nav>
        <Link
          to="/"
          className="hover:bg-gray-600 inline-block text-sm font-medium text-white px-3 py-2 leading-none"
        >
          Home
        </Link>
        <Link
          to="/page-2/"
          className="ml-2 hover:bg-gray-600 inline-block text-sm font-medium text-white px-3 py-2 leading-none"
        >
          Pricing
        </Link>
        <Link
          to="/using-typescript/"
          className="hover:bg-gray-600 inline-block text-sm font-medium text-white px-3 py-2 leading-none"
        >
          About
        </Link>
      </nav>
      <div className="flex items-center">
        <button className="ml-6 text-gray-400 hover:text-gray-200">
          Login / Register
        </button>
      </div>
    </div>
  </header>
)

export default Header
