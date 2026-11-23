import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Billpulse — Invoicing",
  description: "Create, send, and track invoices with Billpulse."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
