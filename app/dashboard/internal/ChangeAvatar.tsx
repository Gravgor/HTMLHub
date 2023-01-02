"use client"
import { useState } from "react";
import { useForm, Resolver, SubmitHandler } from "react-hook-form"

interface FormValues {
    file: string;
}

type Props = {
    setModal: (modal: boolean) => void;
    setRefreshToken: (refreshToken: number) => void;
}

const resolver: Resolver<FormValues> = async (values) => {
    return {
        values: values.file ? values : {},
        errors: values.file ? {} : {file: {type: "required", message: "File is required"}}
    }
}

export default function ChangeAvatar({setModal, setRefreshToken}: Props){

    const { register, handleSubmit, formState: {errors} } = useForm<FormValues>({ resolver });

    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    const [imageBase64, setImageBase64] = useState<string>('');

    function onSubmit(){
        fetch("/api/user/avatar", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("email")}`
            },
            body: imageBase64
        }).then(res => res.json())
        .then(data => {
            if(data.error){
                setError(data.error);
                setTimeout(() => {
                    setError('');
                }, 3000);
            }else {
                setSuccess(data.message);
                setTimeout(() => {
                    setSuccess('');
                    setModal(false);
                    setRefreshToken(Math.random());
                }, 3000);
            }
        })
    }


    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Change Avatar</h3>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="avatar">
                        Avatar
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="avatar" type="file" accept="image/*"  onChange={(e) => {
                        if(!e.target.files) return setError('File is required');
                        if(e.target.files[0].size > 1000000) return setError('File is too large');
                        if(!e.target.files[0].type.includes('image')) return setError('File is not an image');
                        const file = e.target.files[0];
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () => {
                            setImageBase64(reader.result as string);
                            setSuccess('File is valid - ready to upload');
                        }
                    }}/>
                    {!error && <p className="text-gray-600 text-xs italic">Only .jpg, .jpeg, .png</p>}
                    {error && <p className="text-red-500 text-xs italic">{error}</p>}
                    {success && <p className="text-green-500 text-xs italic">{success}</p>}
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => {
                        onSubmit();
                    }}>
                        Save
                    </button>
                    <a href="#" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" onClick={() => {
                        setModal(false)
                    }}>
                        Cancel
                    </a>
                </div>
            </form>
        </div>
    )
}