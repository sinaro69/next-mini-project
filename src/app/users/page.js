'use client'
import React, { useState, useEffect } from 'react'
import { BASE_URL } from '../constant/constant';

async function fetchData() {
    const response = await fetch(`https://api.escuelajs.co/api/v1/users?limit=8`);
    const data = await response.json();
    return data; 
}

export default async function Users() {
    const [users, setUser] = useState([])
    useEffect(() => {
        fetchData().then(data => setUser(data))
    }, [])
    return (
        <section>
            <p className='text-5xl font-semibold mt-20 text-center'>Our Users</p>
            <div className="flex mt-10 justify-center items-center">
                <div className='flex items-center justify-center flex-wrap'>
                    {
                        users.map((user) => (
                            <div key={user.id} class="card p-5 m-10 flex items-center space-x-4 cursor-pointer">
                                <img class="w-10 h-10 rounded-full" src={user.avatar} alt="" />
                                <div class="font-medium dark:text-white">
                                    <div>{user.name}</div>
                                    <div class="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}
