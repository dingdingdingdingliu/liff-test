import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";

export default function Home({ liff, liffError }) {
  const [testText, setTestText] = useState();

  const onBtnClick = () => {
    console.log('1', liff.liff.getOS());
    liff.liff.getProfile() .then((profile) => {
      const name = profile.displayName;
      console.log('2', name);
      setTestText(name)
    })
    .catch((err) => {
      console.log("error", err);
      setTestText(err instanceof Error ? err.message : err)
    });
  };

  return (
    <div>
      <Head>
        <title>LIFF App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {liff && <p>LIFF init succeeded.</p>}
        {liffError && (
          <>
            <p>LIFF init failed.</p>
            <p>
              <code>{liffError}</code>
            </p>
          </>
        )}
        <button onClick={onBtnClick}>
          button
        </button><br /><br />
        log<br />
        {testText}
      </main>
    </div>
  );
}
