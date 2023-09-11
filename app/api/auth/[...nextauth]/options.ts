import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { getUserByEmail } from "@/server/firebase/user/getUserByEmail";

export const options: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials) return null;

        const { data: user } = await getUserByEmail({
          email: credentials.username,
        });

        if (!user) return null;

        const valid = await compare(credentials.password, user.password!);

        if (valid) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
    newUser: "/sign-up",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        console.log("jwt", user.id);
        token.id = user.id;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        console.log("token", token.id);
        session.user.id = token.id;
      }
      return session;
    },
  },
};
