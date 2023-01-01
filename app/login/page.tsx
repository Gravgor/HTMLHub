"use client"
import {useForm, Resolver,SubmitHandler } from "react-hook-form"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type FormValues = {
    email: string;
    password: string;
}

const resolver: Resolver<FormValues> = async (values) => {
    return {
        values: values.email ? values : {} && values.password ? values : {},
        errors: values.email ? {} : {email: {type: "required", message: "Email is required"}} && values.password ? {} : {password: {type: "required", message: "Password is required"}}
    }
}


export default function Page(){
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver });
    const onSubmit: SubmitHandler<FormValues> = data => {
        async function signInUser(){
            try{
                const result = await signIn("credentials", {
                    redirect: false,
                    email: data.email,
                    password: data.password
                });
                if(result){
                    if (result.error) {
                        console.log(result.error);
                    }else{
                        router.push("/dashboard");
                    }
                }
            }
            catch(error){
                console.log(error);
            }
        }
        signInUser();
    }
    return (
<form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-col my-2" onSubmit={handleSubmit(onSubmit)}>
  <div className="mb-4">
    <label className="block font-bold text-gray-700 text-sm mb-2">
      Email
    </label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Email" {...register("email")}/>
    {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
  </div>
  <div className="mb-6">
    <label className="block font-bold text-gray-700 text-sm mb-2">
      Password
    </label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" {...register("password")}/>
    {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
  </div>
  <div className="flex items-center justify-between">
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="submit">
      Sign In
    </button>
    <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
      Forgot Password?
    </a>
  </div>
</form>
    )

}