import NewForm from "./new-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Form",
};

export default function NewFormPage() {
  return <NewForm />;
}