import "../styles/globals.css";
import { useState, useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const [liffObject, setLiffObject] = useState(null);
  const [liffError, setLiffError] = useState(null);
  const [isInClient, setIsInClient] = useState(false)

  // Execute liff.init() when the app is initialized
  useEffect(() => {
    // to avoid `window is not defined` error
      import("@line/liff").then((liff) => {
      console.log("LIFF init...", liff);
      liff.liff
        .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID2 })
        .then(() => {
          console.log("LIFF init succeeded.");
          setLiffObject(liff);
        })
        .catch((error) => {
          console.log("LIFF init failed.");
          setLiffError(error.toString());
        });
      liff.isInClient(res).then(() => {
        console.log('isInClient', res)
        setIsInClient(res)
      });
    });
  }, []);

  // Provide `liff` object and `liffError` object
  // to page component as property
  pageProps.liff = liffObject;
  pageProps.liffError = liffError;
  return <Component {...pageProps} />;
}

export default MyApp;
