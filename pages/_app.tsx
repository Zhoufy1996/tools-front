import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../src/assets/styles/global.css';
import { ThemeProvider } from '@emotion/react';
import theme from '../src/utils/theme';
import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>tools</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <meta name="theme-color" content="#317EFB" />
      </Head>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <CssBaseline />
          <Component {...pageProps} />
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
