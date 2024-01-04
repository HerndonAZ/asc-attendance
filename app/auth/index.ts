import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth"

export const config = {
  
  providers: [
  //   GitHub({
  //     clientId: process.env.OAUTH_CLIENT_KEY as string,
  //     clientSecret: process.env.OAUTH_CLIENT_SECRET as string
  //   })
  // ],

  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  })
],
  // pages: {
  //   signIn: '/sign-in'
  // },
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname === "/middleware-example") return !!auth
      return true
    },
  },
} satisfies NextAuthConfig;

export const { handlers: {GET, POST}, auth, signIn, signOut } = NextAuth(config)