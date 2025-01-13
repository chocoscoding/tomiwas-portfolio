import localFont from "next/font/local";
import "../styles/globals.css";
import "../styles/home.css";

import Menu from "../components/Menu/Menu";

export const metadata = {
  title: "Stefan Markovic | Codegrid",
  description: "CGMWT September by Codegrid",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Menu />
        {children}
      </body>
    </html>
  );
}
