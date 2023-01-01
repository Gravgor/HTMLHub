"use client"
import Link from 'next/link';
import {useForm, Resolver,SubmitHandler } from "react-hook-form"
import { FormValuesRegister, Error } from '../../lib/interfaces';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UserRegisterInput } from '../../lib/schema';
import { ZodError } from "zod";



const resolver: Resolver<FormValuesRegister> = async (values) => {
    return {
        values: values.name ? values : {} && values.email ? values : {} && values.password ? values : {},
        errors: values.name ? {} : {name: {type: "required", message: "Name is required"}} && values.email ? {} : {email: {type: "required", message: "Email is required"}} && values.password ? {} : {password: {type: "required", message: "Password is required"}}
    }
}

export default function Page(){
    const { register, handleSubmit, formState: { errors } } = useForm<FormValuesRegister>({ resolver });
    const router = useRouter();
    const [error, setError] = useState<Error>();
    const [nameError, setNameError] = useState<string[]>([]);
    const [emailError, setEmailError] = useState<string[]>([]);
    const [passwordError, setPasswordError] = useState<string[]>([]);

    const onSubmit: SubmitHandler<FormValuesRegister> = data => {
        async function registerUser(){
            try{
                const parse = UserRegisterInput.parse({
                    name: data.name,
                    email: data.email,
                    password: data.password
                })
                const request = await fetch("/api/auth/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: data.name,
                        email: data.email,
                        password: data.password,
                    })
                })
                const response = await request.json();
                if(response){
                    if (response.error) {
                        const newErrors: Error = {
                                type: "Server Error",
                                message: response.error
                        }
                        setError(newErrors);
                        setTimeout(() => {
                            setError(undefined);
                        }, 3000);
                    }else{
                        router.push("/login");
                    }
                }
            }
         catch(error){
            if(error instanceof ZodError){
                const errorList = error.errors.map((error) => {
                    return error.message;
                })
                const errorType = error.errors.map((error) => {
                    return error.path[0];
                })
                const errorLength = errorList.length;
                for(let i = 0; i < errorLength; i++){
                    if(errorType[i] === "name"){
                        setNameError([...nameError,  errorList[i]]);
                    }else if(errorType[i] === "email"){
                        setEmailError([...emailError, errorList[i]]);
                    }else if(errorType[i] === "password"){
                        setPasswordError([...passwordError, errorList[i]]);
                    }
                }
                if(errorList.length === 0){
                    const newErrors: Error = {
                        type: "Server Error",
                        message: "Something went wrong"
                    }
                    setError(newErrors);
                    setTimeout(() => {
                        setError(undefined);
                    }, 3000);
                }
            }
        }
    }
    registerUser();
}
    
    return (
        <main className="container mx-auto px-6 py-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Create Your Account</h1>
        <form className="bg-white shadow-md rounded-lg p-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" {...register("name")}/>
            {
                errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>
            }
            {nameError.map((error) => {
                return <p key={0} className="text-red-500 text-xs italic">{error}</p>
            })
            }
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" {...register("email")}/>
            {
                errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>
            }
            {emailError.map((error) => {
                return <p key={0} className="text-red-500 text-xs italic">{error}</p>
            })
            }
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" {...register("password")}/>
            {
                errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>
            }
            {passwordError.map((error) => {
                return <p key={0} className="text-red-500 text-xs italic">{error}</p>
            })
            }
          </div>
            <div className="flex items-center justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="submit">Sign Up</button>
        <Link href="/login" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">Already have an account? Log in!</Link>
      </div>
    </form>
  </main>
    )
}