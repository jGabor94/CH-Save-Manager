"use server"

import { signOut } from "@/lib/services/authentication/auth"

const SA_signOut = async () => {
    await signOut({ redirectTo: "/" })
    return
}

export default SA_signOut