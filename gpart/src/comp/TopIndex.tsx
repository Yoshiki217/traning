import { FC } from "react";
import { useNavigate } from "react-router-dom";
import top_pic from 'localhost://public/Chris_Bumstead.png'

export const TopIndex : FC = () => {
    const gate = useNavigate()
    const toRegister = () => {
        gate('register')
    }
    const toLogin = () => {
        gate('login')
    }
    return (
        <>  
            {/* <button onClick={toRegister}>登録</button>
            <button onClick={toLogin}>ログイン</button> */}
            <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
            <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
                <header className="flex justify-between items-center py-4 md:py-8 mb-4">

                <a href="/" className="inline-flex items-center text-blue-800 text-2xl md:text-3xl font-bold gap-2.5" aria-label="logo">
                    <svg width="95" height="94" viewBox="0 0 95 94" className="w-6 h-auto text-indigo-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M96 0V47L48 94H0V47L48 0H96Z" />
                    </svg>
            
                    G Part
                </a>

                <nav className="hidden lg:flex gap-12">
                    <a href="#" className="text-indigo-500 text-lg font-semibold">Home</a>
                    <a href="#" className="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100">Features</a>
                    <a href="#" className="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100">Pricing</a>
                    <a href="#" className="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100">About</a>
                </nav>

                <a href="#" onClick={toLogin} className="hidden lg:inline-block bg-gray-200 hover:bg-gray-300 focus-visible:ring ring-indigo-300 text-gray-500 active:text-gray-700 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">Log in</a>
            
                <button type="button" className="inline-flex items-center lg:hidden bg-gray-200 hover:bg-gray-300 focus-visible:ring ring-indigo-300 text-gray-500 active:text-gray-700 text-sm md:text-base font-semibold rounded-lg gap-2 px-2.5 py-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
                    </svg>
            
                    Menu
                </button>
                </header>
            
                <section className="min-h-96 flex justify-center items-center flex-1 shrink-0 bg-gray-100 overflow-hidden shadow-lg rounded-lg relative py-16 md:py-20 xl:py-48">

                <img src='http://localhost:3000/Chris_Bumstead.png' loading="lazy" alt="Photo by Fakurian Design" className="w-full h-full object-cover object-center absolute inset-0" />

                <div className="bg-indigo-500 mix-blend-multiply absolute inset-0"></div>

                <div className="sm:max-w-xl flex flex-col items-center relative p-4">
                    <p className="text-indigo-200 text-lg sm:text-xl text-center mb-4 md:mb-8">Very proud to introduce</p>
                    <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-8 md:mb-12">top</h1>
            
                    <div className="w-full flex flex-col sm:flex-row sm:justify-center gap-2.5">
                    <a href="#"  className="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">Start now </a>
            
                    <a href="#" className="inline-block bg-gray-200 hover:bg-gray-300 focus-visible:ring ring-indigo-300 text-gray-500 active:text-gray-700 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">Take tour</a>
                    </div>
                </div>

                </section>
            </div>
        </div>
        </>
    )
}