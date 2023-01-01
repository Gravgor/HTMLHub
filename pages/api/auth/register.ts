import { NextApiRequest,  NextApiResponse}  from "next";
import bcrypt from "bcrypt";
import db from "../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    req.method === "POST" ? register(req,res) : res.status(405).json({error: "Method not allowed"})
}


async function register(req: NextApiRequest,res: NextApiResponse){
    const user = await db.user.findUnique({
        where: {
            email: req.body.email
        }
    })
    if(user){
        res.status(400).json({error: "User already exists"})
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const newUser = await db.user.create({
        data: {
            email: req.body.email,
            password: hashedPassword,
            name: req.body.name
        }
    })
    res.status(200).json({user: newUser})
    db.$disconnect()
}




