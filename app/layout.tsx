import type { Metadata } from "next";
import "./globals.css";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "PaperPlane",
  description: "This is a Messaging/Chat App",
  icons: {
    icon: "./favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="logo.png" sizes="any" />
      </head>
      <body>
        <ConvexAuthNextjsServerProvider>
          <ConvexClientProvider>
            <Toaster />
            {children}
          </ConvexClientProvider>
        </ConvexAuthNextjsServerProvider>
      </body>
    </html>
  );
}
