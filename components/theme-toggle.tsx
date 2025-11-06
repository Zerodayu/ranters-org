"use client"

import { MoonIcon, SunIcon } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import { useTheme } from "./theme-provider"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const isDark =
    theme === "dark" ||
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

  return (
    <div className="relative">
      <Toggle
        variant="default"
        className="group size-9 data-[state=on]:bg-transparent data-[state=on]:hover:bg-muted"
        pressed={isDark}
        onPressedChange={() =>
          setTheme(isDark ? "light" : "dark")
        }
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      >
        <SunIcon
          size={16}
          className="shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100"
          aria-hidden="true"
        />
        <MoonIcon
          size={16}
          className="absolute shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0"
          aria-hidden="true"
        />
      </Toggle>
    </div>
  )
}
