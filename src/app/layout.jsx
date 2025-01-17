import "../styles/globals.css";
import "../styles/home.css";
import localFont from "next/font/local";

import Menu from "../components/Menu/Menu";

export const metadata = {
  title: "Stefan Markovic | Codegrid",
  description: "CGMWT September by Codegrid",
};
import SmoothScrolling from "../components/SmoothScroll";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SmoothScrolling>
          <Menu />
          {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}
