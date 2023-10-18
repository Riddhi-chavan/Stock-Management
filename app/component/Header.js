"use client"
import React, { useState } from 'react'
import Addtocart from './Addtocart'


const Header =   () => {
  const [showcart , setshowcart] =  useState(false);

  const handleclose = () => {
    setshowcart(false)
  }

  return (
   <>
     <Addtocart  onClose={handleclose} visible={showcart}/>
   <header className="text-gray-600 body-font">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg>
      <span className="ml-3 text-xl">Stock Management System</span>
    </a>
    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
       <button onClick={() => setshowcart(true)}>
        Add to cart  
       </button>
    </nav>
  </div>
  
</header>
   </>
  )
}

export default Header
