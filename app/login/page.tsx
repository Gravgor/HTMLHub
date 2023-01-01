"use client"
import {useForm, Resolver,SubmitHandler } from "react-hook-form"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormValues, Error } from "../../lib/interfaces";
import { UserLoginInput } from "../../lib/schema";
import { ZodError } from "zod";



const resolver: Resolver<FormValues> = async (values) => {
    return {
        values: values.email ? values : {} && values.password ? values : {},
        errors: values.email ? {} : {email: {type: "required", message: "Email is required"}} && values.password ? {} : {password: {type: "required", message: "Password is required"}}
    }
}


export default function Page(){
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver });

    const [emailError, setEmailError] = useState<string[]>([]);
    const [passwordError, setPasswordError] = useState<string[]>([]);
    const [error, setError] = useState<Error>();

    const onSubmit: SubmitHandler<FormValues> = data => {
        async function signInUser(){
            try{
                const parse = UserLoginInput.parse({
                    email: data.email,
                    password: data.password
                })
                const result = await signIn("credentials", {
                    redirect: false,
                    email: data.email,
                    password: data.password
                });
                if(result){
                    if (result.error) {
                        const newErrors: Error = {
                                type: "Server Error",
                                message: result.error
                        }
                        setError(newErrors);
                        setTimeout(() => {
                            setError(undefined);
                        }, 3000);
                    }else{
                        localStorage.setItem("email", data.email);
                        router.push("/dashboard");
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
                        if(errorType[i] === "email"){
                            setEmailError([...emailError, errorList[i]]);
                            setTimeout(() => {
                                setEmailError([]);
                            }, 3000);
                        }
                        if(errorType[i] === "password"){
                            setPasswordError([...passwordError, errorList[i]]);
                            setTimeout(() => {
                                setPasswordError([]);
                            }, 3000);
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
    signInUser();
}



return (
    <form className="bg-white rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-col my-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label className="block font-bold text-gray-700 text-sm mb-2">
          Email
       </label>
       <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Email" {...register("email")}/>
       {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
         {emailError.map((error) => {
                return <p key={0} className="text-red-500 text-xs italic">{error}</p>
         })}
     </div>
     <div className="mb-6">
        <label className="block font-bold text-gray-700 text-sm mb-2">
          Password
        </label>
       <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" {...register("password")}/>
         {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
         {passwordError.map((error) => {
                return <p key={0} className="text-red-500 text-xs italic">{error}</p>
         })}
         {error && <p className="text-red-500 text-xs italic">{error.message}</p>}
      </div>
      <div className="flex items-center">
           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="submit">
             Sign In
           </button>
          <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 ml-auto" href="#">
            Forgot Password?
         </a>
    </div>
  </form>
 )
}