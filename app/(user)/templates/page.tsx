import Templates from "./templates";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Templates",
};

export default function TemplatesPage() {
  return <Templates />;
}