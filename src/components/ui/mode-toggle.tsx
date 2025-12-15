"use client"

import * as React from "react"
import { Moon, Sun, Palette, Laptop } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
      if (theme === 'system') setTheme('light')
      else if (theme === 'light') setTheme('dark')
      else if (theme === 'dark') setTheme('colorful')
      else setTheme('system')
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <Sun className="h-[1.2rem] w-[1.2rem] opacity-0" />
      </Button>
    )
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-8 w-8">
      {theme === 'system' && <Laptop className="h-[1.2rem] w-[1.2rem]" />}
      {theme === 'light' && <Sun className="h-[1.2rem] w-[1.2rem]" />}
      {theme === 'dark' && <Moon className="h-[1.2rem] w-[1.2rem]" />}
      {theme === 'colorful' && <Palette className="h-[1.2rem] w-[1.2rem]" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
