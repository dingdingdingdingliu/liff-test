import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";

export default function Home({ liff, liffError }) {
  const [testText, setTestText] = useState();
  const [msg, setMsg] = useState();
  const [queryParam, setQueryParam] = useState();
  const [isInClient, setIsInClient] = useState(false)

  useEffect(() => {
    liff.liff.isInClient().then((res) => {
      console.log('isInClient', res)
      setIsInClient(res)
    });
  }, [])

  const onLoginClick = () => {
    console.log('isLogin: ', liff.liff.isLoggedIn());
    console.log('location:', window.location);
    setQueryParam(window.location.search)
    liff.liff.login()
    liff.liff.getProfile().then((profile) => {
      const name = profile.displayName;
      console.log('profile', profile);
      setTestText(name)
    }).catch((err) => {
      console.log("error", err);
      setMsg('getProfile ERROR')
    });
  };

  const onSendMsgClick = () => {
      if (liff.liff.getFriendship()) {
        liff.liff.sendMessages([
          {
            type: 'text',
            text: '熊'
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
        setTestText('getFriendship not yet')
      }
  }

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
          style={{borderBottom: '1px solid gray'}}
        >
          LIFF Documentation
        </a>
          {!liff?.liff?.isLoggedIn() &&
            <p>
              have to login liff!
            </p>
          }
          {liff?.liff?.isLoggedIn() && !liff?.liff?.getFriendship() &&
            <p>
              liff login succeeded!
            </p>
          }
          {liff?.liff?.isLoggedIn() && liff?.liff?.getFriendship() &&
            <p>
              liff login and add friend succeeded!
            </p>
          }

          <div style={{margin: '30px'}}>
            {!liff?.liff?.isLoggedIn() &&
            <>
              <button onClick={onLoginClick}>
                login
              </button>
              <br />
              <br />
            </> 
            }
            {liff?.liff?.isLoggedIn() && liff?.liff?.getFriendship() &&
              <>
                <button onClick={onSendMsgClick}>
                  sendMsg
                </button>
                <br />
                <br />
              </> 
            }
            testText: {testText}<br />
            msg: {msg}<br />
            queryParam: {queryParam}<br />
          </div>
      </main>
    </div>
  );
}
