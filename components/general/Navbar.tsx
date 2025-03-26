import Link from "next/link";
import Logo from "@/public/globe.svg";
import Image from "next/image";
import { Button } from "../ui/button";
import { auth, signOut } from "@/utils/auth";
export async function Navbar() {
  const session = await auth();

  return (
    <nav className="flex items-center justify-between py-5">
      <Link href="/" className="flex items-center gap-2">
        <Image src={Logo} alt="Logo" width={40} height={40} />
        <h1 className="text-2xl font-bold">Logo</h1>
      </Link>
      <div className="flex items-center gap-4">
        {session?.user ? (
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <Button>Logout</Button>
          </form>
        ) : (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
