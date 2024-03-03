import NextAuth from "next-auth";
import { options } from "@/features/auth-page/auth-api"; // Ajustează calea de import conform structurii proiectului tău

// Definește handler-ul ca o funcție separată
const authHandler = (req, res) => NextAuth(req, res, options);

// Exportează handler-ul ca export default
export default authHandler;
