import { Session } from 'next-auth'
import { Next } from '../assets/serverAction/createServerAction/createServerAction'
import { auth } from '../services/authentication/auth'
import { createServerActionResponse } from '../assets/serverAction/response/response'

export const isLogged = async (next: Next, req: { session: Session }) => {
  const session = await auth()
  if (session) {
    req.session = session
    return next()
  } else {
    return createServerActionResponse({ status: 401, error: "You are not logged in" })
  }

}
