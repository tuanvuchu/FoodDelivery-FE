import "slick-carousel/slick/slick.css";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import "slick-carousel/slick/slick-theme.css";
import "nprogress/nprogress.css";

import Layout from "../layout/Layout";

import { ToastContainer } from "react-toastify";

import { Router } from "next/router";
import nProgress from "nprogress";

Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeError", () => nProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <ToastContainer />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
