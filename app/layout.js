import { Lora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Footer from "@/components/footer";
import { Toaster } from "sonner";

const lora = Lora({ subsets: ["latin"] })

export const metadata = {
  title: "CareerMentor",
  description: "AI Career Mentor",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{
      baseTheme: dark
    }}>
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${lora.className} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            forcedTheme="dark"
            disableTransitionOnChange
          >
            {/* Header*/}
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />

            {/* Footer*/}
            <Footer />

          </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
