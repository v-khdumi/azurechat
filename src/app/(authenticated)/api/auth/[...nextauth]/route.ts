import NextAuth from "next-auth";
import { options } from "@/features/auth-page/auth-api"; // Ajustează calea de import conform structurii proiectului tău

export default (req, res) => NextAuth(req, res, options);
