import Head from 'next/head'

const MyHead = (props) => {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link href="https://cdn.bootcss.com/antd-mobile/2.1.1/antd-mobile.css" rel="stylesheet" />
      {/* <link href="//at.alicdn.com/t/font_813394_ooixss60lmp.css" rel="stylesheet" /> */}
      <script type="text/javascript" src="//at.alicdn.com/t/font_813394_ooixss60lmp.js"></script>
    </Head>
  )
}

export default MyHead
 