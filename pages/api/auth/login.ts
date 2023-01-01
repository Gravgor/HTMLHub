import { NextApiRequest,  NextApiResponse}  from "next";
import bcrypt from "bcrypt";
import db from "../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    req.method === "POST" ? login(req,res) : res.status(405).json({error: "Method not allowed"})
}


async function login(req: NextApiRequest,res: NextApiResponse){
    const user = await db.user.findUnique({
        where: {
            email: req.body.email
        }
    })
    if(!user){
        res.status(404).json({error: "User not found"})
    }
    if(user){
        const passwordMatch = await bcrypt.compare(req.body.password, user.password)
        if(!passwordMatch){
            res.status(401).json({error: "Incorrect password"})
        }
        res.status(200).json({user})
        db.$disconnect()
    }
}