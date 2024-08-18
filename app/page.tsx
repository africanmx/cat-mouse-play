import Head from 'next/head';
import MouseGame from '@/components/MouseGame';
import { Analytics } from '@vercel/analytics/react';

export default function Home() {
  return (
    <main>
      <div className="container">
        <Head>
          <title>Cat Mouse Play</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <MouseGame />
        </main>
        <Analytics />
      </div>
    </main>
  );
}