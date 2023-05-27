'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

async function fetchCategories(){
    const response = await fetch('https://api.escuelajs.co/api/v1/categories?limit=10');
    const data = await response.json();
    return data;
}

export default function Categories() {
    const [categories, SetCategories] = useState([]);
    useEffect(() => {
        fetchCategories().then(data => SetCategories(data))
    })

    return (
        <section >
            <p className='text-5xl font-semibold mt-20 text-center'>Categories Collection</p>
            <div className='mt-10 flex flex-wrap gap-5 justify-center items-start'>
                {categories.map(Category => (
                    <div class="max-w-sm max-h-fit bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <Link href={`/categories/${Category.id}`}>
                            <img class="rounded-t-lg" src={Category.image} alt="" />
                        </Link>
                        <div class="p-5">
                            <Link href={`/categories/${Category.id}`}>
                                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{Category.name}</h5>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
