import { useState, useEffect } from "react";
import { appwritePost } from "../appwrite";
import { useParams } from "react-router-dom";
import { PostForm } from "../components";
import Container from "../Container/Container";

export default function EditPost() {
  const [post, setPost] = useState(null);
  const { id: slug } = useParams();

  useEffect(() => {
    appwritePost
      .getPost(slug)
      .then((post) => {
        setPost(post);
        console.log("Post :: ", post);
      })
      .catch((err) => {
        console.error("Post Fetch Failed :: ", err);
      });
  }, []);

  return (
    <Container>
      <h1>Edit Post</h1>
      {post && <PostForm post={post} />}
    </Container>
  );
}
