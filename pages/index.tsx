import Head from "next/head";
import Box from "../components/Box";

export default function Home() {
  return (
    <div>
      <Head>
        <title>My Mini Commission</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="lg:px-4">
        <div className="max-w-none lg:max-w-7xl mx-auto my-0 lg:my-16">
          <Box header="My Mini Commission" subheader="Welcome!">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum illo
            cupiditate molestias atque consequuntur ea quo cumque, odit velit
            sint similique? Asperiores ratione aperiam tempora, alias corrupti
            deleniti quaerat molestiae.
          </Box>
        </div>
      </div>
    </div>
  );
}
