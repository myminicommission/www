import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>My Mini Commission</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="px-4">
        <div className="max-w-3xl bg-white rounded-lg mx-auto my-16 p-16">
          <h1 className="text-2xl font-medium mb-2">
            Let's Build: With Tailwind CSS
          </h1>
          <h2 className="font-medium text-sm text-indigo-400 mb-4 uppercase tracking-wide">
            Responsive Navbar
          </h2>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum illo
          cupiditate molestias atque consequuntur ea quo cumque, odit velit sint
          similique? Asperiores ratione aperiam tempora, alias corrupti deleniti
          quaerat molestiae.
        </div>
      </div>
    </div>
  );
}
