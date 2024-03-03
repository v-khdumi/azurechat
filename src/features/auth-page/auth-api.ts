// Importurile necesare
import NextAuth, { NextAuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import AzureADB2CProvider from "next-auth/providers/azure-ad-b2c";
import CredentialsProvider from "next-auth/providers/credentials";

// Configurația providerilor
const providers = [
  // Azure AD
  AzureADProvider({
    clientId: process.env.AZURE_AD_CLIENT_ID,
    clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
    tenantId: process.env.AZURE_AD_TENANT_ID,
  }),
  // Azure AD B2C
  AzureADB2CProvider({
    clientId: process.env.AZURE_AD_B2C_CLIENT_ID,
    clientSecret: process.env.AZURE_AD_B2C_CLIENT_SECRET,
    tenantId: process.env.AZURE_AD_B2C_TENANT_NAME,
    primaryUserFlow: process.env.AZURE_AD_B2C_PRIMARY_USER_FLOW,
  }),
  // Credentials (pentru dezvoltare)
  CredentialsProvider({
    name: 'Credentials',
    credentials: {
      username: { label: "Username", type: "text" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials, req) {
      if (credentials.username === 'admin' && credentials.password === 'admin') {
        return { id: 1, name: 'Admin' };
      }
      return null;
    },
  }),
];

// Opțiunile NextAuth
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
      session.user.isAdmin = token.isAdmin ?? false;
      return session;
    },
  },
};

export default NextAuth(options);
export { options };
