import NextAuth, { NextAuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import AzureADB2CProvider from "next-auth/providers/azure-ad-b2c";
import CredentialsProvider from "next-auth/providers/credentials";
import { hashValue } from "./helpers";

const providers = [];

if (process.env.AZURE_AD_CLIENT_ID && process.env.AZURE_AD_CLIENT_SECRET && process.env.AZURE_AD_TENANT_ID) {
  providers.push(
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      tenantId: process.env.AZURE_AD_TENANT_ID,
      authorization: { params: { scope: "openid email profile" } },
    })
  );
}

if (process.env.AZURE_AD_B2C_CLIENT_ID && process.env.AZURE_AD_B2C_CLIENT_SECRET && process.env.AZURE_AD_B2C_TENANT_NAME && process.env.AZURE_AD_B2C_PRIMARY_USER_FLOW) {
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

if (process.env.NODE_ENV === "development") {
  providers.push(
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials && credentials.username === "admin" && credentials.password === "admin") {
          return { id: 1, name: "Admin" };
        }
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
};

export default NextAuth(options);
export { options };
