import { SigninForm } from "@/components/signin-form"
import Link from "next/link"
import {
  ChevronRight
} from "lucide-react"

export default function SignupPage() {
  return (
    <section className="flex flex-col w-full bg-muted">
      <div className="flex fixed gap-2 justify-center items-center p-4">
        <Link href="/" className="font-semibold hover:underline">
          Home
        </Link>
        <ChevronRight size={18} />
        <h1 className="font-semibold text-muted-foreground">
          Sign-in
        </h1>
        <ChevronRight size={18} />
        <Link href="/sign-up" className="font-semibold hover:underline">
          Create Account
        </Link>
      </div>
      <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-4xl">
          <SigninForm />
        </div>
      </div>
    </section>
  )
}
