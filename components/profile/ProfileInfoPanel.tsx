import Link from "next/link";
import { Avatar, Button, Card, Divider, Group } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitch,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

function SocialLink({ href, text, icon }) {
  return (
    <a
      href={href}
      target="blank"
      className="flex px-4 py-2 no-underline hover:bg-gray-900 hover:no-underline"
    >
      <div>
        <FontAwesomeIcon icon={icon} className="w-4 h-4" />
      </div>
      <div className="pl-3">
        <p className="text-sm font-medium leading-none text-gray-200">{text}</p>
      </div>
    </a>
  );
}

function SocialLinkList({ socials }) {
  return (
    <div>
      {socials.facebook && (
        <SocialLink href={socials.facebook} icon={faFacebook} text="Facebook" />
      )}

      {socials.instagram && (
        <SocialLink
          href={socials.instagram}
          icon={faInstagram}
          text="Instagram"
        />
      )}

      {socials.twitch && (
        <SocialLink href={socials.twitch} icon={faTwitch} text="Twitch" />
      )}

      {socials.twitter && (
        <SocialLink href={socials.twitter} icon={faTwitter} text="Twitter" />
      )}
    </div>
  );
}

function PanelHeader({ forHire, name, nickname, picture }) {
  return (
    <div className="p-6 text-center border-b border-gray-600">
      {picture && (
        <Group position="center">
          <Avatar src={picture} alt={name} size="xl" />
        </Group>
      )}
      <p className="pt-2 text-lg font-semibold">{name}</p>
      {forHire && (
        <div className="w-full mt-5">
          <Link href={`/${nickname}/hire`}>
            <Button
              fullWidth
              variant="outline"
              color="green"
              size="xl"
              radius="xs"
            >
              Hire Me
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

function ContactMeLink() {
  return (
    <a
      href="#"
      className="flex px-4 py-2 no-underline hover:bg-gray-900 hover:no-underline"
    >
      <div>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </div>
      <div className="pl-3">
        <p className="text-sm font-medium leading-none text-gray-200">
          Contact Me
        </p>
      </div>
    </a>
  );
}

function ManageAccountLink({ nickname }) {
  return (
    <Link href={`/${nickname}/edit`}>
      <a className="flex px-4 py-2 pb-4 text-gray-200 no-underline hover:bg-gray-900 hover:no-underline">
        <p className="text-sm font-medium leading-none">Manage Your Account</p>
      </a>
    </Link>
  );
}

function LogoutLink() {
  return (
    <Link href="/api/auth/logout">
      <a className="flex px-4 py-2 pb-4 no-underline hover:bg-gray-900 hover:no-underline">
        <p className="text-sm font-medium leading-none text-red-500">Logout</p>
      </a>
    </Link>
  );
}

export default function ProfileInfoPanel({ router, profile, user }) {
  const { picture, name, nickname, forHire, socials } = profile;
  return (
    <Card>
      <PanelHeader
        forHire={forHire}
        name={name}
        nickname={nickname}
        picture={picture}
      />

      {socials && <SocialLinkList socials={socials} />}

      <div>
        {/* Contact Me Link */}
        <ContactMeLink />

        {user && user.nickname === router.query.nickname && (
          <div>
            <Divider />

            {/* Manage Account Link */}
            <ManageAccountLink nickname={nickname} />

            {/* Logout Link */}
            <LogoutLink />
          </div>
        )}
      </div>
    </Card>
  );
}
