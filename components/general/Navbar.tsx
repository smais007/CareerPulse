import Link from "next/link";
import Logo from "@/public/globe.svg";
import Image from "next/image";
import { auth } from "@/utils/auth";
import { UserDropdown } from "./user-dropdown";
export async function Navbar() {
  const session = await auth();

  // console.log("session", session);

  return (
    <nav className="flex items-center justify-between py-5">
      <Link href="/" className="flex items-center gap-2">
        <Image src={Logo} alt="Logo" width={40} height={40} />
        <h1 className="text-2xl font-bold">Logo</h1>
      </Link>

      {/* Desktop navbar   */}
      <div className="hidden md:flex items-center gap-5">
        <Link href={"/post-job"}>Post Job</Link>

        {session?.user ? (
          <UserDropdown
            name={session.user.name as string}
            email={session.user.email as string}
            image={session.user.image as string}
          />
        ) : (
          <Link href={"/login"}>Login</Link>
        )}
      </div>
    </nav>
  );
}
