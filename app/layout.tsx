import type { Metadata } from "next";
import { Poppins, Merriweather } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  display: "swap",
  weight: ["300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "SkillShift - Professional Development & Training",
  description:
    "Transform your career with SkillShift's high-impact training interventions. We provide soft skills training, mentorship, and HR services for businesses and individuals.",
  keywords:
    "soft skills training, professional development, mentorship, HR services, corporate training",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${poppins.variable} ${merriweather.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
