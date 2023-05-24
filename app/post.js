"use client";
import { useEffect, useState } from "react";
import supabase from "./supabase";

export default function Post({ initialPost }) {
  const [post, setPost] = useState(initialPost);
  useEffect(() => {
    supabase
      .channel("post")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "posts",
          filter: `id=eq.${post.id}`,
        },
        (payload) => {
          setPost((post) => payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel("post");
    };
  }, [supabase, post, initialPost]);
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}

