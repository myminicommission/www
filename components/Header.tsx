import Link from "next/link";
import { UserProfile } from "@auth0/nextjs-auth0";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

type HeaderProps = {
  user: UserProfile;
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function UserMenu({ user }) {
  const [open, setOpen] = useState(false);

  const userNavigation = [
    { name: "View Profile", href: `/${user?.nickname}` },
    { name: "Edit Profile", href: `/${user?.nickname}/edit` },
    { name: "Logout", href: "/api/auth/logout" },
  ];

  return (
    <Menu as="div" className="ml-3 relative">
      <div>
        <Menu.Button className="max-w-xs bg-gray-800 flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <span className="sr-only">Open user menu</span>
          <img
            className="h-10 w-10 rounded-full border-2 border-transparent hover:border-white"
            src={user?.picture}
            alt={user?.name}
            onClick={() => setOpen(!open)}
          />
        </Menu.Button>
      </div>
      <Transition
        show={open}
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          static
          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          {userNavigation.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <Link href={item.href}>
                  <a
                    onClick={() => {
                      setOpen(false);
                    }}
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-100 hover:no-underline"
                    )}
                  >
                    {item.name}
                  </a>
                </Link>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default function Header({ user }: HeaderProps) {
  return (
    <header className="lg:px-16 px-6 bg-gray-900 flex flex-wrap items-center lg:py-0 py-2">
      <div className="flex-1 flex justify-between items-center">
        <Link href="/">
          <a>
            <img
              src="/logo_transparent_background.png"
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
            {!user && (
              <li>
                <a href="/api/auth/login">Login / Register</a>
              </li>
            )}
          </ul>
        </nav>

        {/* Profile dropdown */}
        {user && <UserMenu user={user} />}
      </div>
    </header>
  );
}
