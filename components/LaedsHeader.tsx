import Head from "next/head";
import { laedsLogo } from "public";

export interface LaedsHeaderInterface {
  title?: string;
  description?: string;
  twitter?: string;
  url?: string;
  image?: string;
  keywords?: string;
}

const LaedsHeader = ({
  title = "CLA | LAEDS",
  description = "Central da Ligas Acadêmicas",
  twitter = "@laedsOfficial",
  url = "https://www.laeds.org/",
  keywords = "LAEDS, Central das Ligas Acadêmicas, CLA, Liga Acadêmica",
  image = laedsLogo.src,
}: LaedsHeaderInterface) => {
  return (
    <Head>
      <title>{title}</title>
      <meta lang="pt-br" />
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="keywords" content={keywords}></meta>
      {/* Meta Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:site" content={twitter} />
      <meta name="twitter:creator" content={twitter} />
      {/* Meta Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
    </Head>
  );
};

export default LaedsHeader;
