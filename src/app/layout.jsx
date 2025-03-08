import "../styles/globals.css";
import "../styles/home.css";
import Menu from "../components/Menu/Menu";
import CustomCursor from "../components/CustomCursor";
export const metadata = {
  title: "Ayotomiwa Solarin",
  description: "Solarin Ayotomiwa - Creative",
};
import SmoothScrolling from "../components/SmoothScroll";
import { ViewTransitions } from "next-view-transitions";
import Footer from "../components/Footer";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <ViewTransitions> */}
        <div className="father">
          <CustomCursor />
          <SmoothScrolling>
            <Menu />
            {children}
            <br />
            <Footer />
          </SmoothScrolling>
        </div>
        {/* </ViewTransitions> */}
      </body>
    </html>
  );
}
