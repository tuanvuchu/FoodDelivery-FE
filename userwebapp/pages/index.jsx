import Head from "next/head";
import Home from "./home";

export default function Index({ categoryList, productList }) {
  return (
    <div className="">
      <Head>
        <title>U Food</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
      </Head>
      <Home categoryList={categoryList} productList={productList} />
    </div>
  );
}
