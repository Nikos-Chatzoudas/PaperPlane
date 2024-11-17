import type { Metadata } from "next";
import "./globals.css";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { CreateServerModal } from "@/features/servers/components/create-server-modal";
import { Modals } from "@/components/modals";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "PaperPlane",
  description: "This is a Messaging/Chat App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en">
        <body>
          <ConvexClientProvider>
            <Modals />
            <Toaster />
            {children}
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
