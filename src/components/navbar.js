'use client'
import Link from 'next/link';
import React from 'react'

import { useState, useEffect } from 'react';

async function fetchCategories(){
    const response = await fetch('https://api.escuelajs.co/api/v1/categories?limit=10');
    const data = await response.json();
    return data;
}

export default function Navbar() {

    return (
        <nav class="w-full fixed top-0 z-20 bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" class="flex items-center">
                    <img src="https://play-lh.googleusercontent.com/PaSl-oIRK6C8AoKsAcNtBUNmN5jb2n2AaPHRhlxor_DJAxUG3UAETE7CDmTkn9Duwq0=s256-rw" class="h-12 mr-3" alt="Flowbite Logo" />
                    <span class="self-center text-2xl font-semibold whitespace-nowrap text-black">Shopify</span>
                </Link>
                <button data-collapse-toggle="navbar-dropdown" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                </button>
                <div class="manu-list hidden w-full md:block md:w-auto" id="navbar-dropdown">
                    <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link href="/" class="block py-2 pl-3 pr-4 text-black bg-white rounded md:bg-transparent md:text-green-700 md:p-0 md:dark:text-green-500 dark:bg-green-600 md:dark:bg-transparent" aria-current="page">Home</Link>
                        </li>
                        
                        <li>
                            <Link href="#" class="block py-2 pl-3 pr-4 text-black bg-white rounded md:bg-transparent md:text-green-700 md:p-0 md:dark:text-green-500 dark:bg-green-600 md:dark:bg-transparent">About</Link>
                        </li>

                        <li>
                            <Link href="#" class="block py-2 pl-3 pr-4 text-black bg-white rounded md:bg-transparent md:text-green-700 md:p-0 md:dark:text-green-500 dark:bg-green-600 md:dark:bg-transparent">Contact us</Link>
                        </li>
                        <li>
                            <Link href={`/add-product`} className='block py-2 pl-3 pr-4 text-black bg-white rounded md:bg-transparent md:text-green-700 md:p-0 md:dark:text-green-500 dark:bg-green-600 md:dark:bg-transparent'>Add product</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}
