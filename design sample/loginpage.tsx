import React from 'react';

const login = () => {
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
  <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
    <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-8">Login</h2>

    <form className="max-w-lg border rounded-lg mx-auto">
      <div className="flex flex-col gap-4 p-4 md:p-8">
        <div>
          <label form="email" className="inline-block text-gray-800 text-sm sm:text-base mb-2">Email</label>
          <input name="email" className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
        </div>

        <div>
          <label form="password" className="inline-block text-gray-800 text-sm sm:text-base mb-2">Password</label>
          <input name="password" className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
        </div>

        <button className="block bg-gray-800 hover:bg-gray-700 active:bg-gray-600 focus-visible:ring ring-gray-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">Log in</button>

        <div className="flex justify-center items-center relative">
          <span className="h-px bg-gray-300 absolute inset-x-0"></span>
          <span className="bg-white text-gray-400 text-sm relative px-4">Log in with social</span>
        </div>
      </div>

      <div className="flex justify-center items-center bg-gray-100 p-4">
        <p className="text-gray-500 text-sm text-center">Don't have an account? <a href="#" className="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 transition duration-100">Register</a></p>
      </div>
    </form>
  </div>
</div>
  );
}

export default login();