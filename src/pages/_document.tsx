import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import { DEFAULT_THEME } from '~/stores/useThemeStore';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html className={DEFAULT_THEME}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
