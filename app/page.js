import supabase from "./supabase";
import Posts from './posts';

export const revalidate = 0;

export default async function HomePage() {
  const { data } = await supabase.from('posts').select('*');
  return <Posts initialPosts={data ?? []} />
}
