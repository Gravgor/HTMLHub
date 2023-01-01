import { z, ZodIssue } from "zod";


export const User = z.object({
    id: z.number(),
    email: z.string(),
    name: z.string(),
    password: z.string(),
    userFiles: z.array(z.object({
        id: z.number(),
        name: z.string(),
        content: z.string(),
        type: z.string(),
        userId: z.number(),
        createdAt: z.string(),
        updatedAt: z.string(),
    })),
})

export type User = z.infer<typeof User>

const UserFile = z.object({
    id: z.number(),
    name: z.string(),
    content: z.string(),
    type: z.string(),
    userId: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
})

export type UserFile = z.infer<typeof UserFile>

export const UserFileCreateInput = z.object({
    name: z.string(),
    content: z.string(),
    type: z.string(),
})

export type UserFileCreateInput = z.infer<typeof UserFileCreateInput>


export const UserRegisterInput = z.object({
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(6, {message: "Password must be at least 6 characters long"}).max(20, {message: "Password must be at most 20 characters long"}),
    name: z.string().max(20, {message: "Name must be at most 20 characters long"})
})

export type UserRegisterInput = z.infer<typeof UserRegisterInput>

export const UserLoginInput = z.object({
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(6, {message: "Password must be at least 6 characters long"}).max(20, {message: "Password must be at most 20 characters long"}),
})

export type UserLoginInput = z.infer<typeof UserLoginInput>


export class ZodError extends Error {
    constructor(public issues: ZodIssue[]) {
        super();
    }
  }
