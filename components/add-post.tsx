import React from 'react'
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

export default function PostBtn() {
  return (
    <div>
      <Button variant="outline" className='w-full'>
        <Plus />
        Add Post
      </Button>
    </div>
  )
}
