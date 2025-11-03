import { Button } from "./ui/button";
import ThemeSwitch from "./theme-toggle";
import {
  Hexagon,
  LogIn
} from "lucide-react";

export default function Navbar() {
  return (
    <section className='flex w-[80vw] border-x border-dashed justify-between items-center py-2 px-6'>
      <div>
        <span className='flex items-center gap-2 font-bold text-2xl'>
          <Hexagon />
          Ranterr
        </span>
      </div>
      <div className='flex items-center gap-2'>
        <ThemeSwitch />
        <Button variant="secondary">
          <LogIn />
          Sign-in
        </Button>
      </div>
    </section>
  )
}
