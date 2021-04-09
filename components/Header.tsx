import Link from "next/link";
import { UserProfile } from "@auth0/nextjs-auth0";

type HeaderProps = {
  user: UserProfile;
};

export default function Header({ user }: HeaderProps) {
  return (
    <header className="lg:px-16 px-6 bg-gray-900 flex flex-wrap items-center lg:py-0 py-2">
      <div className="flex-1 flex justify-between items-center">
        <Link href="/">
          <a>
            <img
              src="logo_transparent_background.png"
              alt="logo"
              className="h-14"
            />
          </a>
        </Link>
      </div>

      <label htmlFor="menu-toggle" className="pointer-cursor lg:hidden block">
        <svg
          className="fill-current text-gray-900"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <title>menu</title>
          <path fill="#fff" d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </label>
      <input className="hidden" type="checkbox" id="menu-toggle" />

      <div
        className="hidden lg:flex lg:items-center lg:w-auto w-full"
        id="menu"
      >
        <nav>
          <ul className="lg:flex items-center justify-between text-base pt-4 lg:pt-0">
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/help">
                <a className="lg:mb-0 mb-2">Help</a>
              </Link>
            </li>
            {!user && (
              <li>
                {/* This MUST be an anchor to work! Using Link here will NOT work! */}
                <a href="/api/auth/login">Login / Register</a>
              </li>
            )}
          </ul>
        </nav>
        {user && (
          // Disabled the Link here to accomodate the logout since there is no profile screen yet
          <Link href={`/${user.nickname}`}>
            <a
              // href="/api/auth/logout"
              className="lg:ml-4 flex items-center justify-start lg:mb-0 mb-4 pointer-cursor"
            >
              <img
                className="rounded-full w-10 h-10 border-2 border-transparent hover:border-white"
                src={user?.picture}
                alt={user?.name}
              />
            </a>
          </Link>
        )}
      </div>
    </header>
  );
}
