import AuthContent from "../auth-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function RegisterPage() {
  return <AuthContent mode="login" />;
}