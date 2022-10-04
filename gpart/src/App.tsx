import React from 'react';
import './App.css';

function App() {
  return (
    <body className='bg-gray-200'>
      <div className=''>
        <div className='bg-blue-500 font-bold text-white rounded p-4'>Gpart</div>
        <button className="bg-indigo-700 font-semibold text-white py-2 px-4 ">aa</button>
        <button className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">Message</button>
        <div className=' rounded '>
          <ul className='relative bg-sakura-50 px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 ml-5 sm:max-w-lg sm:rounded-sm sm:px-10 space-y-6'>
            <li><a href='https://google.com' className='shadow-sm  w-10 text-3xl text-blue-500 hover:bg-blue-100 hover:text-gray-500' >sample</a></li>
            <li><a href='https://yahoo.co.jp'className='shadow-sm'>sample</a></li>
            <li><a href='https://cisco.com' className='shadow-sm'>sample</a></li>
            <li><a href='https://github.com'className='shadow-sm'>sample</a></li>
            <li><a href='https://zenn.com' className='shadow-sm'>sample</a></li>
            <li><a href='https://zenn.com' className='shadow-sm'>sample</a></li>
            <li><a href='https://zenn.com' className='shadow-sm'>sample</a></li>
            <li><a href='https://zenn.com' className='shadow-sm'>sample</a></li>
            <li><a href='https://zenn.com' className='shadow-sm'>sample</a></li>
            <li><a href='https://zenn.com' className='shadow-sm'>sample</a></li>
            <li><a href='https://zenn.com' className='shadow-sm'>sample</a></li>
            <li><a href='https://zenn.com' className='shadow-sm'>sample</a></li>
          </ul>
        </div>
      </div>
    </body>
  );
}

export default App;
