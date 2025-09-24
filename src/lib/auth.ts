import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET!;

export type JWTPayload = { sub: string; email: string };

export function signSession(payload: JWTPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

export function verifySession(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

// ⚠️ Demo only. Replace with a real DB lookup.
const DEMO_USER = {
  id: "u_1",
  email: "demo@company.com",
  // password = "secret123"
  passwordHash: bcrypt.hashSync("secret123", 10),
};

export async function verifyUser(email: string, password: string) {
  if (email !== DEMO_USER.email) return null;
  const ok = await bcrypt.compare(password, DEMO_USER.passwordHash);
  if (!ok) return null;
  return { id: DEMO_USER.id, email: DEMO_USER.email };
}
