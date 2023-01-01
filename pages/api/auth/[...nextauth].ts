import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                username: { label: "Email", type: "email", placeholder: "jsmith@email.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any) {
                const res = await fetch(process.env.API_URL + "/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password
                    })
                })
                const data = await res.json()
                if (data.error){
                    throw new Error(`Error: ${data.error}`)
                }
                if(data.user){
                    return data.user
                }
                return null
            }
        })
    ],
    pages: {
        signIn: "/login",
        error: "/error",
    },
    jwt: {
        secret: process.env.JWT_SECRET,
    }
})