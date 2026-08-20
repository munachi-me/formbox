import EditForm from "./edit-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Form",
};

export default function EditFormPage() {
  return <EditForm />;
}