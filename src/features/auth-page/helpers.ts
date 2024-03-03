import { createHash } from "crypto";
import { getServerSession } from "next-auth/next";
import { options } from "./auth-api";
import { RedirectToPage } from "../common/navigation-helpers";

// Definiția tipului pentru modelul de utilizator
export type UserModel = {
  name: string;
  image: string;
  email: string;
  isAdmin: boolean;
};

// Obținerea sesiunii curente a utilizatorului și returnarea unui model simplificat de utilizator
export const userSession = async (): Promise<UserModel | null> => {
  // Asigură-te că pasăm contextul corect necesar pentru `getServerSession`
  const session = await getServerSession({ req }, { res }, options);
  if (session && session.user) {
    return {
      name: session.user.name!,
      image: session.user.image!,
      email: session.user.email!,
      isAdmin: session.user.isAdmin ?? false, // Presupunem false dacă nu este setat
    };
  }

  return null;
};

// Obține utilizatorul curent sau aruncă o eroare dacă nu este găsit
export const getCurrentUser = async (): Promise<UserModel> => {
  const user = await userSession();
  if (user) {
    return user;
  }
  throw new Error("User not found");
};

// Generează un ID hashat pentru utilizator bazat pe email
export const userHashedId = async (): Promise<string> => {
  const user = await userSession();
  if (user) {
    return hashValue(user.email);
  }

  throw new Error("User not found");
};

// Funcție helper pentru a hash-ui o valoare folosind SHA-256
export const hashValue = (value: string): string => {
  const hash = createHash("sha256");
  hash.update(value);
  return hash.digest("hex");
};

// Redirecționează utilizatorul autentificat către o pagină specifică
export const redirectIfAuthenticated = async (req, res) => {
  const user = await userSession(req, res);
  if (user) {
    RedirectToPage("chat", res);
  }
};
