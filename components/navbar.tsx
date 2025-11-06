
import { Button } from "./ui/button";
import Link from "next/link";
import ThemeSwitch from "./theme-toggle";
import { logoutAction } from "@/lib/logout-action";
import {
  Auth,
  SignedIn,
  SignedOut
} from '@/components/useAuth'
import {
  Hexagon,
  LogIn
} from "lucide-react";


export default function Navbar() {
  return (
    <section className='flex border-x border-dashed justify-between items-center py-2 px-6 container-w'>
      <div>
        <span className='flex items-center gap-2 font-bold text-2xl'>
          <Hexagon />
          <span className="">
            Ranterr
          </span>
        </span>
      </div>
      <div className='flex items-center gap-2'>
        <ThemeSwitch />

        <Auth>
          <SignedIn>
            <form action={logoutAction}>
              <Button >
                Logout
              </Button>
            </form>
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in">
              <Button>
                <LogIn />
                Sign-in
              </Button>
            </Link>
          </SignedOut>
        </Auth>
      </div>
    </section>
  )
}
