import "@/styles/index.css";
import { ContextProvider } from "@/contexts/stateContext";
export default function App({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  );
}
