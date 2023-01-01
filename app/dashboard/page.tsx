"use client"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



export default function Page(){
    const { data: session, status } = useSession();
    const [userData, setUserData] = useState<any>([])
    const router = useRouter();

    useEffect(() => {
        
        const request = async () => {
            const res = await fetch("/api/user", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem("email")}`
                }
            });
            const json = await res.json();
            if(json){
                if(json.error){
                    console.log(`Error: ${json.error}`)
                }
                setUserData(json);
            }
        }
        request();
    }, [])

    
    if (status === "loading") {
        return <p>Loading...</p>
      }
    
      if (status === "unauthenticated") {
        return router.push("/login");
      }


    return (
            <main className="container mx-auto px-6 py-4">
                 <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to Your Dashboard</h1>
            <div className="flex items-center justify-between mb-6">
                {userData.map((user: any) => {
                    <>
                     <p className="text-gray-600 mr-2">Hello, {user.name}!</p>
                    <a href="#" className="text-gray-600 hover:text-gray-800 text-sm" onClick={() => {
                        signOut();
                        localStorage.clear();
                  }}>Log Out</a>
                  
                    </>
                })}
            </div>
            <div className="mb-6">
               <h2 className="text-2xl font-bold text-gray-800 mb-4">My HTML Files</h2>
            <div className="bg-white shadow-md rounded-lg p-4">
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="text-gray-600 text-sm font-semibold py-2">Filename</th>
                  <th className="text-gray-600 text-sm font-semibold py-2">Date Created</th>
                  <th className="text-gray-600 text-sm font-semibold py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-t text-gray-700 text-sm py-2">index.html</td>
                  <td className="border-t text-gray-700 text-sm py-2">Jan 1, 2021</td>
                  <td className="border-t text-gray-700 text-sm py-2">
                    <a href="#" className="text-blue-500 hover:text-blue-800 text-sm mr-2">View</a>
                    <a href="#" className="text-blue-500 hover:text-blue-800 text-sm mr-2">Edit</a>
                    <a href="#" className="text-red-500 hover:text-red-800 text-sm">Delete</a>
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
        
        <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">My Account</h2>
            <div className="bg-white shadow-md rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items
                    -center">
                        
                        <div>
                            <p className="text-gray-700 font-semibold">User Name</p>
                            <p className="text-gray-600 text-sm">
                                <a href="#" className="text-blue-500 hover:text-blue-800">Change Avatar</a>
                            </p>
                        </div>
                    </div>
                    <a href="#" className="text-blue-500 hover:text-blue-800 text-sm">Change Password</a>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Name</label>
                    <input type="text" name="name" id="name" className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none focus:border-blue-500" placeholder="Your Name"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
                    <input type="email" name="email" id="email" className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none focus:border-blue-500" placeholder="Your Email"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Bio</label>
                    <textarea name="bio" id="bio" className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none focus:border-blue-500" placeholder="Your Bio"></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" >Avatar</label>
                    <input type="file" name="avatar" id="avatar" className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none focus:border-blue-500"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" >Password</label>
                    <input type="password" name="password" id="password" className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none focus:border-blue-500" placeholder="Your Password"/>
                </div>
                </div>
            </div>
        </main>
        )
    }
