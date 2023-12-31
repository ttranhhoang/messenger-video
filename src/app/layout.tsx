import Providers from "@/components/Provider";
import AuthContext from "./context/AuthContext";
import "./globals.css";
import { Inter } from "next/font/google";
import ActiveStatus from "@/components/ActiveStatus";
import ToastContext from "./context/ToastContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Messenger Clone",
  description: "Generated by messenger app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <Providers>
            <ActiveStatus />
            <ToastContext />
            {children}
          </Providers>
        </AuthContext>
      </body>
    </html>
  );
}
