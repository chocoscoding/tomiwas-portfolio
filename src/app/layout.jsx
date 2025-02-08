import "../styles/globals.css";
import "../styles/home.css";
import Menu from "../components/Menu/Menu";
import CustomCursor from "../components/CustomCursor";
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
          <CustomCursor />
          <SmoothScrolling>
            <Menu />
            {children}
          </SmoothScrolling>
        </div>
      </body>
    </html>
  );
}
