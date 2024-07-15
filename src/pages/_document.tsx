import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <title>Othello</title>
        <meta name="Othello" content="Othello" />
        <link rel="icon" href="favicon.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
