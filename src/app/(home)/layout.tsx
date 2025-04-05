
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navitems from "@/compo/Common/Navitems";
import 'swiper/css';
import '../../assets/css/icofont.min.css'
import '../../assets/css/animate.css';
import '../../assets/css/style.min.css';
import Footer from "@/compo/Common/Footer";
import AuthProvide from "../(auth)/AuthProvide";
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
  title: "ShopCart – The Ultimate Shopping Experience",
  description: "ShopCart brings you the best online shopping experience with a wide range of products, great deals, and fast delivery. Shop now and enjoy hassle-free shopping!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body  className={`${geistSans.variable} ${geistMono.variable} antialiased`}  >
        <AuthProvide>
        <Navitems />
        {children}
        <Footer />
        </AuthProvide>
      </body>
    </html>
  );
}
