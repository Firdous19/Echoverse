import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { appwritePost, appwriteFileUpload } from "../appwrite";
import { Button } from "../components";
import Container from "../Container/Container";
import { Parser } from "html-to-react";
import parse from "html-react-parser";

export default function Post() {
  const { id: slug } = useParams();
  const [post, setPost] = useState({});
  const navigate = useNavigate();
  // const parse = new Parser();

  useEffect(() => {
    console.log("Slug :: ", slug);
    appwritePost
      .getPost(slug)
      .then((res) => {
        setPost(res);
        console.log("Post :: ", res);
        console.log("post ::", typeof post.content);
      })
      .catch((err) => {
        console.error("Post Fetch Failed :: ", err);
      });
  }, []);

  const deletePost = () => {
    console.log("Delete Post :: ");
    appwriteFileUpload.deleteFile(post.featuredImage);
    appwritePost
      .deletePost(post.$id)
      .then((res) => {
        console.log("Post Deleted :: ", res);
        navigate("/");
      })
      .catch((err) => {
        console.error("Post Delete Failed :: ", err);
      });
  };

  return (
    <div>
      <div>
        <Container>
          <div className="group w-full flex justify-center mb-4 relative border rounded-xl p-2">
            <img
              src={appwriteFileUpload.getFile(post.featuredImage)}
              alt={post.title}
              className="rounded-xl w-full"
            />

            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button className="mr-3 opacity-0 group-hover:opacity-100 transition-all duration-200">
                  <img className="size-8" src="/images/pen.png" alt="pen" />
                </Button>
              </Link>
              <Button onClick={deletePost}>
                <img
                  className="size-8 bg-transparent opacity-0 group-hover:opacity-100 transition-all duration-200"
                  src="/images/bin.png"
                  alt="pen"
                />
              </Button>
            </div>
          </div>
          <div className="p-5">
            <div className="w-full mb-6">
              <h1 className="text-3xl font-bold">{post.title}</h1>
            </div>
            <div className="text-lg">
              <p>
                {typeof post.content === "string" ? parse(post.content) : ""}
              </p>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
