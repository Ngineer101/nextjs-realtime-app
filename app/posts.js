"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import supabase from "./supabase";

export default function Posts({ initialPosts }) {
  const [posts, setPosts] = useState(initialPosts);
  useEffect(() => {
    supabase
      .channel("posts")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "posts",
        },
        (payload) => {
          setPosts((posts) => [payload.new, ...posts]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel("posts");
    };
  }, [supabase, posts, initialPosts]);
  return (
    <div>
      {posts.map((post) => (
        <Link key={post.id} href={`/${post.id}`}>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </Link>
      ))}
    </div>
  );
}
