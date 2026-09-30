import type { Metadata } from "next";
import { BlogIndex } from "@/components/BlogIndex";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Catch up on Tremap's latest developments and product releases!",
};

export default function BlogPage() {
  return (
    <BlogIndex
      posts={getAllPosts()}
      title={<>Stories from <em>the global tree map.</em></>}
      intro="Catch up on Tremap's latest developments and product releases!"
    />
  );
}
