import { getAllByTestId } from '@testing-library/react';
import React from 'react'
import { useNavigate } from 'react-router-dom'



export const Header = (links: {
    label:string,
    url:string
}[]) => {

  const gate = useNavigate();

  return (
    <div>
      <header className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a onClick={()=>{gate('/top')}} className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-blue-500 rounded-full" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
                <span className="ml-3 text-xl">Gpart</span>
                </a>
                <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                {/* <a href="https://google.com" className="mr-5 hover:text-gray-900">First Link</a>
                <a href="https://google.com" className="mr-5 hover:text-gray-900">Second Link</a>
                <a href="https://google.com" className="mr-5 hover:text-gray-900">Third Link</a>
                <a href="https://google.com" className="mr-5 hover:text-gray-900">Fourth Link</a> */}
                </nav>
                {
                    links?.map(link=>
                        <div className="mx-2" key={link.url}><a href="#" onClick={()=>{gate(link.url)}} className="hidden lg:inline-block bg-gray-200 hover:bg-gray-300 focus-visible:ring ring-indigo-300 text-gray-500 active:text-gray-700 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">{link.label}</a></div>
                    )
                }
            </div>
        </header>
    </div>
  )
}

export default Header