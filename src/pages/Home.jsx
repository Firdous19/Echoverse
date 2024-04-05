import { useEffect, useState } from "react";
import { appwritePost, appwriteFileUpload } from "../appwrite";
import { useSelector } from "react-redux";
import Container from "../Container/Container";
import { PostCard } from "../components";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const userStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (userStatus) {
      appwritePost
        .getPosts()
        .then((posts) => {
          console.log(posts);
          // setPosts(posts.documents);
          // console.log(posts.documents);
        })
        .catch((error) => {
          console.error("Post Fetch Failed", error);
        });
    }
  }, []);

  return posts && posts.length > 0 ? (
    <Container>
      <div className="text-center">
        <h1 className="text-3xl mb-10">Welcome to the home page</h1>
        <PostCard posts={posts} />
      </div>
    </Container>
  ) : (
    <div className="text-center">
      <h1 className="text-3xl">No posts found</h1>
    </div>
  );
}
