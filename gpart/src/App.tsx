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
            <li><a href='https://google.com' className='w-10 text-3xl text-blue-500 hover:bg-blue-100 hover:text-gray-500' >sample</a></li>
            <li><a href='https://yahoo.co.jp'className='shadow-sm'>sample</a></li>
            <li><a href='https://cisco.com' className='shadow-sm btn m1'>sample</a></li>
            <li><a href='https://github.com'className='shadow-sm avatar'>sample</a></li>
            <li><a href='https://zenn.dev' className='shadow-sm'>sample</a></li>
            <li><a href='https://zenn.dev' className='shadow-sm'>sample</a></li>
            <li><a href='https://zenn.dev' className='shadow-sm'>sample</a></li>
            <li><a href='https://zenn.dev' className='shadow-sm'>sample</a></li>
            <li><a href='https://zenn.dev' className='shadow-sm'>sample</a></li>
            <li><a href='https://zenn.dev' className='shadow-sm'>sample</a></li>
            <li><a href='https://zenn.dev' className='shadow-sm'>sample</a></li>
            <li><a href='https://zenn.dev' className='shadow-sm'>sample</a></li>
          </ul>
        </div>
      </div>
      <div className="avatar">
      <div className="w-14 rounded-full">
        <img alt="" src="https://placeimg.com/192/192/people" />
      </div>
    </div>
    <input type="text" placeholder="Type here" className="input input-bordered input-info w-full max-w-xs" />
    <div className="form-control">
      <label className="label cursor-pointer">
        <input type="checkbox" checked className="checkbox " />
      </label>
    </div>
    <div className="navbar bg-base-100">
  <div className="flex-1">
    <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
  </div>
  <div className="flex-none gap-2">
    <div className="form-control">
      <input type="text" placeholder="Search" className="input input-bordered" />
    </div>
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt=""src="https://placeimg.com/80/80/people" />
        </div>
      </label>
      <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
    </body>
    
  );
}

export default App;
