import { ViewTransitions } from "next-view-transitions";
export default function RootLayout({ children }) {
  return <ViewTransitions>{children}</ViewTransitions>;
}
