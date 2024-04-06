import { useState, useEffect } from "react";
import { appwritePost } from "../appwrite";
import Container from "../Container/Container";
import { PostCard } from "../components";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwritePost
      .getPosts([])
      .then((posts) => {
        console.log("Posts", posts);
        setPosts(posts.documents);
      })
      .catch((err) => {
        console.log("Error in fetching posts", err);
      });
  }, []);

  return (
    <Container className="space-y-10">
      <div className="text-4xl bg-black text-center text-white py-10">
        <h1>Your Posts</h1>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mt-4">
        {posts.map((post) => (
          <PostCard key={post.$id} post={post} />
        ))}
      </div>
    </Container>
  );
}
