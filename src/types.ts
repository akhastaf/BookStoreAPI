import { Request } from "express";
import { User } from "./user/entites/user.entity";

export interface JwtPayload {
    sub: number
    email: string
}

export interface RequestWithAuth extends Request {
    user: User
}