import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-32 px-4">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-display font-bold text-foreground mb-3">404</h1>
          <p className="text-xl text-muted-foreground mb-8">
            This page couldn't be found. It might have been moved or deleted.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              Back to Home
            </Link>
            <Link
              href="/properties"
              className="px-6 py-3 rounded-xl bg-muted text-foreground font-medium hover:bg-accent transition-colors"
            >
              View Properties
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
