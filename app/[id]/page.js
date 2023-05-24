import supabase from "../supabase";
import { notFound } from "next/navigation";
import Post from "../post";

export const revalidate = 0;

export default async function SinglePost({ params }) {
  const { id } = params;
  const { data } = await supabase
    .from("posts")
    .select("*")
    .match({ id })
    .single();
  if (!data) {
    return notFound();
  }

  return <Post initialPost={data} />;
}
