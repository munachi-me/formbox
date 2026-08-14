import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />

      {children}

      <Footer />
    </>
  );
}