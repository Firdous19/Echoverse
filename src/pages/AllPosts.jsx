import { useState, useEffect } from "react";
import { appwritePost } from "../appwrite";
import Container from "../Container/Container";
import { PostCard } from "../components";
import Loader from "react-js-loader";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    appwritePost
      .getPosts([])
      .then((posts) => {
        console.log("Posts", posts);
        setPosts(posts.documents);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log("Error in fetching posts", err);
      });
  }, []);

  return (
    <>
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
      {loading && (
        <div className="absolute top-0 left-0 bg-slate-100 bg-opacity-30 w-full h-full flex justify-center items-center">
          <Loader
            type="spinner-cub"
            bgColor={"#000"}
            //title={"Loading..."}
            size={75}
          />
        </div>
      )}
    </>
  );
}
