import { UsersNavigation } from "@/components/layout/user-navigation";

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <UsersNavigation />

      <div className="lg:pl-64">
        {children}
      </div>
    </div>
  );
}