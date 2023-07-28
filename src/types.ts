import { Request } from "express";
import { User } from "./user/entites/user.entity";

export interface JwtPayload {
    sub: number
    email: string
}

export interface RequestWithAuth extends Request {
    user: User
}

export interface Tokens {
    access_token: string,
    refresh_token: string
}

export interface UploadedFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination: string;
    filename: string;
    path: string;
    buffer: Buffer;
  }