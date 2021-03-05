// 404.js
import Link from "next/link";
import Box from "../components/Box";

export default function FourOhFour() {
  return (
    <>
      <div className="lg:px-4">
        <div className="max-w-none lg:max-w-7xl mx-auto my-0 lg:my-16">
          <Box header="Oops!" subheader="404 - Page Not Found">
            Looks like the page you are looking for doesn't exist. Maybe you
            should <Link href="/">go back home</Link>.
          </Box>
        </div>
      </div>
    </>
  );
}
