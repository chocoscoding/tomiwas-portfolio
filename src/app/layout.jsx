import "../styles/globals.css";
import "../styles/home.css";
import Menu from "../components/Menu/Menu";
import CustomCursor from "../components/CustomCursor";
export const metadata = {
  title: "Ayotomiwa Solarin",
  description: "Solarin Ayotomiwa - Creative",
};
import SmoothScrolling from "../components/SmoothScroll";
import NextTopLoader from "nextjs-toploader";
import { ViewTransitions } from "next-view-transitions";
import Footer from "../components/Footer";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <ViewTransitions> */}
        <NextTopLoader
          color="#fff7d7"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #fff7d7,0 0 5px #fff7d7"
          zIndex={1600}
          showAtBottom={false}
        />
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
