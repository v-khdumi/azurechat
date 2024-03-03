import NextAuth, { NextAuthOptions } from "next-auth";
// Asigură-te că importurile sunt actualizate conform versiunii `next-auth`
import AzureADProvider from "next-auth/providers/azure-ad";
import AzureADB2CProvider from "next-auth/providers/azure-ad-b2c";
import CredentialsProvider from "next-auth/providers/credentials";
import { hashValue } from "./helpers";

// Definește furnizorii de identitate
const providers = [];

// Configurație pentru Azure AD (Microsoft 365)
if (
  process.env.AZURE_AD_CLIENT_ID &&
  process.env.AZURE_AD_CLIENT_SECRET &&
  process.env.AZURE_AD_TENANT_ID
) {
  providers.push(
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      tenantId: process.env.AZURE_AD_TENANT_ID,
      authorization: { params: { scope: "openid email profile" } },
    })
  );
}

// Configurație pentru Azure AD B2C (Personal Account)
if (
  process.env.AZURE_AD_B2C_CLIENT_ID &&
  process.env.AZURE_AD_B2C_CLIENT_SECRET &&
  process.env.AZURE_AD_B2C_TENANT_NAME &&
  process.env.AZURE_AD_B2C_PRIMARY_USER_FLOW
) {
  providers.push(
    AzureADB2CProvider({
      clientId: process.env.AZURE_AD_B2C_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_B2C_CLIENT_SECRET,
      tenantId: process.env.AZURE_AD_B2C_TENANT_NAME,
      primaryUserFlow: process.env.AZURE_AD_B2C_PRIMARY_USER_FLOW,
      authorization: { params: { scope: "openid email profile" } },
    })
  );
}

// Opțional: Configurație pentru autentificare locală în mod dezvoltare
if (process.env.NODE_ENV === "development") {
  providers.push(
    CredentialsProvider({
      // Configurația pentru providerul de credențiale (exemplu simplificat)
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Aici ar trebui implementată logica de validare a credențialelor
        // Exemplu: returnează user-ul dacă credențialele sunt valide
        if (credentials.username === "admin" && credentials.password === "admin") {
          return { id: 1, name: "Admin" };
        }
        // Returnează null dacă autentificarea eșuează
        return null;
      },
    })
  );
}

const options: NextAuthOptions = {
  providers,
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user?.isAdmin) {
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.isAdmin) {
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
  },
  // Configurații suplimentare după necesitate
};

export default NextAuth(options);
