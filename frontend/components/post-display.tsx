"use client"

import React, { useState } from 'react'

import { Button } from './ui/button';
import {
  CircleUser,
  Star,
  Download
} from "lucide-react";

const PostData = [
  {
    id: 1,
    postId: "12415131",
    title: "First Post Title",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, iure? Magnam, porro.",
    likes: "1.2k"
  },
  {
    id: 2,
    postId: "98765432",
    title: "Second Post Title",
    content: "Numquam earum quas nostrum officiis exercitationem quia inventore, vero recusandae.",
    likes: "856"
  },
  {
    id: 3,
    postId: "45678912",
    title: "Third Post Title",
    content: "Consectetur adipisicing elit. Possimus voluptatum error distinctio quisquam maiores.",
    likes: "2.1k"
  },
  {
    id: 4,
    postId: "78912345",
    title: "Fourth Post Title",
    content: "Vitae iure magnam porro. Numquam earum quas nostrum officiis exercitationem.",
    likes: "945"
  },
  {
    id: 5,
    postId: "32165498",
    title: "Fifth Post Title",
    content: "Maiores nobis nemo consectetur adipisicing elit. Vitae, iure? Magnam, porro.",
    likes: "1.5k"
  },
  {
    id: 6,
    postId: "74185296",
    title: "Sixth Post Title",
    content: "Exercitationem quia inventore, vero recusandae possimus voluptatum error distinctio.",
    likes: "678"
  }
];

export default function ShowPost() {
  const [starFills, setStarFills] = useState<{ [key: number]: boolean }>({});

  const toggleStarFill = (postId: number) => {
    setStarFills(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  return (
    <>
      <section className='flex flex-col gap-4'>
        <div>
          <h1 className='text-2xl font-bold pb-4'>Recent Posts</h1>
        </div>
        {PostData.map((post) => (
          <div key={post.id} className='w-full border border-dashed'>
            <div className='w-full p-4'>
              <span className='flex gap-2 font-semibold pb-4'>
                <CircleUser />
                <h1>Person-{post.postId}</h1>
              </span>
              <div>
                <h1 className='text-primary-foreground font-semibold text-lg'>{post.title}</h1>
                <p className='text-primary-foreground'>{post.content}</p>
              </div>
              <div className='pt-4'>
                <Button 
                  variant="ghost" 
                  onClick={() => toggleStarFill(post.id)}
                >
                  <Star fill={starFills[post.id] ? "var(--foreground)" : "none"} 
                            stroke="var(--foreground)" />
                  <span>{post.likes}</span>
                </Button>
                <Button variant="ghost">
                  <Download />
                  <span>Save</span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  )
}
