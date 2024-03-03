// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import { options } from "@/features/auth-page/auth-api"; // Asigură-te că calea este corectă

export default (req, res) => NextAuth(req, res, options);
