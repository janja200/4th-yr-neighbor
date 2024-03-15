"use client"
import Form from "@/components/profile/Form";
import Header from "@/components/profile/Header";
import PostFeed from "@/components/profile/posts/PostFeed";


export default function Home() {
  return (
    <>
      <Header label="Home" />
      <Form placeholder="What's happening?" />
      <PostFeed />
    </>
  )
}