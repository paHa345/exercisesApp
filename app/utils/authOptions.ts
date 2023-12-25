import { compare } from "bcryptjs";
// import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { AuthOptions } from "next-auth";
import User from "../models/UserModel";
import { connectMongoDB } from "../libs/MongoConnect";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/auth",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" },
      },
      async authorize(credentials, req) {
        await connectMongoDB();
        if (credentials?.email.trim().length === 0 || credentials?.password.trim().length === 0) {
          throw new Error("Введите логин/пароль");
        }
        const user = await User.findOne({ email: credentials?.email });
        if (!user) {
          throw new Error("Такого пользователя не существует");
        }
        if (credentials) {
          const validPassword = await compare(credentials?.password, user.password);
          if (!validPassword) {
            throw new Error("Неверный пароль");
          }
        }

        if (user) {
          console.log(user);
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};
