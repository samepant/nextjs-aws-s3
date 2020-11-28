import Head from 'next/head'

const Layout = (props) => (
  <>
    <Head>
      <title>XO.TOURS PICS</title>
    </Head>

    <main>
      <div className="container">{props.children}</div>
    </main>

    <style jsx global>{`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        color: #333;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          'Helvetica Neue', Arial, Noto Sans, sans-serif, 'Apple Color Emoji',
          'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
      }
      .container {
      }
    `}</style>
  </>
)

export default Layout
