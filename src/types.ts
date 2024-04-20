import { Request } from "express";
import { User } from "./user/entites/user.entity";
import { Ability } from "@casl/ability";
import { Action } from "./permission/entites/permission.entity";

export type PermissionObjectType = any;
export type AppAbility = Ability<[Action, PermissionObjectType]>;

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
export interface RawRule {
    action: string | string[]
    subject?: string | string[]
    /** an array of fields to which user has (or not) access */
    fields?: string[]
    /** an object of conditions which restricts the rule scope */
    conditions?: any
    /** indicates whether rule allows or forbids something */
    inverted?: boolean
    /** message which explains why rule is forbidden */
    reason?: string
  }