import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next"
import authOptions from "../auth/[...nextauth]"
import db from "../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await unstable_getServerSession(req, res, authOptions)
    if (!session) {
        res.status(401).json({ error: "Unauthorized" })
    }
    const { method } = req;
    switch (method) {
        case "GET":
            try {
                if(!req.headers.authorization){
                    res.status(401).json({error: "Please login"})
                }else{
                    const email = req.headers.authorization.split(" ")[1]
                    const query = await db.user.findUnique({
                        where: {
                            email: email
                        }
                    })
                    if(!query){
                        res.status(404).json({error: "User not found"})
                    }
                    if(query){
                        const fileQuery = await db.file.findMany({
                            where: {
                                userId: query.id
                            }
                        })
                        res.status(200).json({user: query, files: fileQuery})
                    }
                }
    } catch (error) {
        res.status(500).json({ error: `Server error` });
    }
}
}