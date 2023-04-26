import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";

export default function Home({ liff, liffError }) {
  const [testText, setTestText] = useState();
  const [msg, setMsg] = useState();
  const [queryParam, setQueryParam] = useState();

  const onBtnClick = () => {
    console.log('1', liff.liff.isLoggedIn());
    console.log(window.location);
    setQueryParam(window.location.search)
    if (liff.liff.isLoggedIn() === true) {
      liff.liff.getProfile().then((profile) => {
        const name = profile.displayName;
        console.log('2', profile);
        setTestText(name)
      })
      .catch((err) => {
        console.log("error", err);
        setTestText(err instanceof Error ? err.message : err)
      });

      if (liff.liff.getFriendship()) {
        liff.liff.sendMessages([
          {
            type: 'text',
            text: 'Hello, World!'
          }
        ]).then(() => {
          console.log('message sent');
          setMsg('message sent')
        })
        .catch((err) => {
          console.log('error', err);
          setMsg(err instanceof Error ? err.message : err)
        }); 
      } else {
        
      }

    } else {
      liff.liff.login()
      // liff.liff.login({ redirectUri: "http://localhost:3000" })
    }
  };

  return (
    <div>
      <Head>
        <title>LIFF App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>create-liff-app v2</h1>
        {liff && <p>LIFF init succeeded.</p>}
        {liffError && (
          <>
            <p>LIFF init failed.</p>
            <p>
              <code>{liffError}</code>
            </p>
          </>
        )}
        <a
          href="https://developers.line.biz/ja/docs/liff/"
          target="_blank"
          rel="noreferrer"
        >
          LIFF Documentation
        </a>

          <div style={{margin: '30px'}}>
            <button onClick={onBtnClick}>
              button
            </button><br /><br />
            log<br />
            {testText}<br />
            {msg}<br />
            {queryParam}
          </div>
      </main>
    </div>
  );
}
