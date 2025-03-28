
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navitems from "@/compo/Common/Navitems";
import 'swiper/css';
import '../../assets/css/icofont.min.css'
import '../../assets/css/animate.css';
import '../../assets/css/style.min.css';
// import "@/assets/sass/sub-stylesheet/_global.scss";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body  className={`${geistSans.variable} ${geistMono.variable} antialiased`}  >
        <Navitems />
        {children}
      </body>
    </html>
  );
}
