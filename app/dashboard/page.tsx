"use client"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Suspense } from "react";
import ChangeAvatar from "./internal/ChangeAvatar";
import Image from "next/image";

export default function Page(){

    const { data: session, status } = useSession();
    const [userData, setUserData] = useState<any[]>([])
    const [userFiles, setUserFiles] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [auth, setAuth] = useState<boolean>(false);
    const [modal, setModal] = useState<boolean>(false);

    const [refreshToken, setRefreshToken] = useState<number>(Math.random());
    const router = useRouter();

    useEffect(() => {
        if(status === "unauthenticated"){
            router.push("/login");
        }else if(status === "authenticated"){
            if(!session.user){
                signOut();
                router.push("/login");
            }else {
                localStorage.setItem("email", session.user.email? session.user.email : "");
                setAuth(true);
            }
        }
    }, [status, router, session])

    useEffect(() => {
        const request = async () => {
            await fetch("/api/user", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem("email")}`
                }
            }).then(res => res.json())
            .then(data => {
                const array = [data]
                setUserData(array);
            })
        }
        if(auth){
            request();
        }
    }, [auth])

    ///Refresh Dashboard Data after changes
    useEffect(() => {
        const request = async () => {
            await fetch("/api/user", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("email")}`
                }
            }).then(res => res.json())
            .then(data => {
                const array = [data]
                setUserData(array);
            }
            )
        }
        if(refreshToken){
            request();
        }
    }, [refreshToken])


    useEffect(() => {
        if(userData){
            setLoading(false);
        } else {
            setLoading(true);
        }
    }, [userData])


    return (
            auth && loading === false ? (
                <main className="container mx-auto px-6 py-4">
            {userData.map((user) => {
                return (
                    <div key={user.user.id}>
                        <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to Your Dashboard</h1>
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-gray-600 mr-2">Hello, {user.user.name}!</p>
                            <a href="#" className="text-gray-600 hover:text-gray-800 text-sm" onClick={() => {
                                signOut();
                                localStorage.clear();
                            }}>Log Out</a>
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
                                        {user.files.length > 0 ? (
                                            user.files.map((file: any) => {
                                                return (
                                                    <tr key={file.id}>
                                                        <td className="py-2">{file.name}</td>
                                                        <td className="py-2">{file.createdAt}</td>
                                                        <td className="py-2">
                                                            <a href="#" className="text-blue-500 hover:text-blue-800 text-sm">Edit</a>
                                                            <a href="#" className="text-red-500 hover:text-red-800 text-sm">Delete</a>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        ) : (
                                            <tr>
                                                <td className="py-2">No files found</td>
                                            </tr>
                                        )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="mb-6">
                            {modal && (
                                <ChangeAvatar setModal={setModal} setRefreshToken={setRefreshToken}/>
                            )}
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">My Account</h2>
                            <div className="bg-white shadow-md rounded-lg p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center">
                                        {user.user.avatar && (
                                            <Image src={user.user.avatar !== null ? `${user.user.avatar}` : "/images/default-avatar.jpg"} alt="avatar" width={40} height={40} className="w-10 h-10 rounded-full mr-2" />
                                        )}
                                        <div>
                                            <p className="text-gray-700 font-semibold">{user.user.name}</p>
                                            <p className="text-gray-600 text-sm">
                                                <a href="#" className="text-blue-500 hover:text-blue-800" onClick={() => {
                                                    setModal(true);
                                                }}>Change Avatar</a>
                                            </p>
                                        </div>
                                    </div>
                                    <a href="#" className="text-blue-500 hover:text-blue-800 text-sm">Change Password</a>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-semibold mb-2">Name</label>
                                    <input type="text" name="name" id="name" className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none focus:border-blue-500" placeholder={user.user.name} />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
                                    <input type="email" name="email" id="email" className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none focus:border-blue-500" placeholder={user.user.email} />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}       
        </main>
            ) : (
                <div className="flex flex-col items-center justify-center h-screen">
                    <h1 className="text-3xl font-bold">Loading...</h1>
                </div>
            )
        )
    }
