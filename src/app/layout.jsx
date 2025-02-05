import "../styles/globals.css";
import "../styles/home.css";
import localFont from "next/font/local";

import Menu from "../components/Menu/Menu";

export const metadata = {
  title: "Ayotomiwa Solarin",
  description: "Solarin Ayotomiwa - Creative",
};
import SmoothScrolling from "../components/SmoothScroll";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="father">
          <SmoothScrolling>
            <Menu />
            {children}
          </SmoothScrolling>
        </div>
      </body>
    </html>
  );
}
