import Link from "next/link";

type HeaderProps = {
  user: {
    avatar: string;
    nickname: string;
  };
};

export default function Header({ user }: HeaderProps) {
  return (
    <header className="lg:px-16 px-6 bg-gray-900 flex flex-wrap items-center lg:py-0 py-2">
      <div className="flex-1 flex justify-between items-center">
        <Link href="/">
          <a>
            <svg
              width="32"
              height="36"
              viewBox="0 0 32 36"
              id="logo"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#fff"
                d="M15.922 35.798c-.946 0-1.852-.228-2.549-.638l-10.825-6.379c-1.428-.843-2.549-2.82-2.549-4.501v-12.762c0-1.681 1.12-3.663 2.549-4.501l10.825-6.379c.696-.41 1.602-.638 2.549-.638.946 0 1.852.228 2.549.638l10.825 6.379c1.428.843 2.549 2.82 2.549 4.501v12.762c0 1.681-1.12 3.663-2.549 4.501l-10.825 6.379c-.696.41-1.602.638-2.549.638zm0-33.474c-.545 0-1.058.118-1.406.323l-10.825 6.383c-.737.433-1.406 1.617-1.406 2.488v12.762c0 .866.67 2.05 1.406 2.488l10.825 6.379c.348.205.862.323 1.406.323.545 0 1.058-.118 1.406-.323l10.825-6.383c.737-.433 1.406-1.617 1.406-2.488v-12.757c0-.866-.67-2.05-1.406-2.488l-10.825-6.379c-.348-.21-.862-.328-1.406-.328zM26.024 13.104l-7.205 13.258-3.053-5.777-3.071 5.777-7.187-13.258h4.343l2.803 5.189 3.107-5.832 3.089 5.832 2.821-5.189h4.352z"
              ></path>
            </svg>
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
          <path
            fill="#fff"
            d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
          ></path>
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
            {(user === undefined || user === null) && (
              <li>
                <Link href="/login-register">Login / Register</Link>
              </li>
            )}
          </ul>
        </nav>
        {user !== undefined && user !== null && (
          <Link href="/profile">
            <a className="lg:ml-4 flex items-center justify-start lg:mb-0 mb-4 pointer-cursor">
              <img
                className="rounded-full w-10 h-10 border-2 border-transparent hover:border-white"
                src={user?.avatar}
                alt={user?.nickname}
              />
            </a>
          </Link>
        )}
      </div>
    </header>
  );
}
