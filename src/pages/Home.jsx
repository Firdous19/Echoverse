import { useEffect, useState } from "react";
import { appwritePost, appwriteFileUpload } from "../appwrite";
import { useSelector } from "react-redux";
import Container from "../Container/Container";
import { PostCard } from "../components";
import { NavLink } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const userStatus = useSelector((state) => state.auth.status);

  console.log("User Status :: ", userStatus);

  useEffect(() => {
    if (userStatus) {
      appwritePost
        .getPosts()
        .then((posts) => {
          console.log(posts);
          setPosts(posts.documents);
          // console.log(posts.documents);
        })
        .catch((error) => {
          console.error("Post Fetch Failed", error);
        });
    }
  }, []);

  return posts && posts.length > 0 && userStatus ? (
    <>
      <section className="bg-black text-white text-center space-y-6 px-10 py-32">
        <h1 className="text-5xl">Welcome to Your Blogs</h1>
        <p className="mb-10">
          Start your blog today and join a community of writers who are
          passionate about aharing their stories and ideas
        </p>
        <button className="text-xl">
          <NavLink to="/add-post">New Post -&gt;</NavLink>
        </button>
      </section>
      <Container className="my-20">
        <div className="text-center">
          <PostCard posts={posts} />
        </div>
      </Container>
    </>
  ) : (
    <>
      <section className="bg-black text-white text-center space-y-6 px-10 py-20">
        <h1 className="text-5xl">Welcome to Your Blogs</h1>
        <p className="mb-10">
          Start your blog today and join a community of writers who are
          passionate about aharing their stories and ideas
        </p>
        <button className="text-xl">
          <NavLink to="/login">Get Started -&gt;</NavLink>
        </button>
      </section>
      <div className="text-center p-10 my-10">
        <h1 className="text-3xl">Login to see your posts</h1>
      </div>
    </>
  );
}
