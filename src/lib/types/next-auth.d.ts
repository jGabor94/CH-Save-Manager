import { Types } from "mongoose"
import NextAuth from "next-auth"
import { Mongoose_User, Mongoose_User_Serializable, UserConfig } from "../database/mongooseSchema"
import { JWT } from "next-auth/jwt";
import NextAuth, { type DefaultSession, type User } from "next-auth";
import type { AdapterSession, AdapterUser } from "next-auth/adapters";
import { Email } from "./types";

interface TokenUserData {
    _id: string,
    username: string,
    roles: any[],
    image: string,
    email: string,
    name: string,
}


declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: TokenUserData
    }

    interface User extends Mongoose_User { }

}


declare module "next-auth" {
    interface AdapterUser {
        email: Email
    }
}


declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        userData?: TokenUserData
    }
}

