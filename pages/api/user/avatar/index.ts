import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import authOptions from "../../auth/[...nextauth]"
import db from "../../../../lib/db";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await unstable_getServerSession(req, res, authOptions)
    if (!session) {
        res.status(401).json({ error: "Unauthorized" })
    }else {
        const { method } = req;
        switch (method) {
            case "POST":
                try {
                    const userEmail = req.headers.authorization
                    if(userEmail){
                        const replaceBearer = userEmail.replace("Bearer ", "")
                        if(req.body){
                            const query = await db.user.update({
                                where: {
                                    email: replaceBearer
                                },
                                data: {
                                    avatar: req.body
                                }
                            })
                            if(!query){
                                res.status(404).json({error: "User not found"})
                            }
                            if(query){
                                res.status(200).json({message: "Avatar updated"})
                            }
                        }
                    }
                } catch (error) {
                    res.status(500).json({ error: `Server error` });
                }
            }
        }
    }       