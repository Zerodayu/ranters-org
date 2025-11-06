"use client"

import { useActionState } from "react"
import { useRouter } from "next/navigation"
import { useEffect } from "react" // Add this import
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { loginAction } from "@/lib/login-action"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"

const initialState = {
  error: "",
  success: false
}

export function SigninForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const [state, formAction] = useActionState(loginAction, initialState)

  // Add useEffect to handle navigation
  useEffect(() => {
    if (state.success) {
      router.push("/")
    }
  }, [state.success, router])

  // Remove the direct navigation and return
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" action={formAction}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back!</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Login to your account to continue.
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="myUsername"
                  required
                />
              </Field>
              <Field className="grid grid-cols-1 gap-4">
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input 
                    id="password" 
                    name="password"
                    type="password" 
                    required
                  />
                </Field>
              </Field>
              <Field>
                <Button type="submit">Login</Button>
                {state.error && <p className="text-red-500 text-sm text-center">{state.error}</p>}
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Don&apos;t have an account?
              </FieldSeparator>
              <FieldDescription className="text-center">
                <a href="/sign-up">Sign up</a>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="bg-primary relative hidden md:block">
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
