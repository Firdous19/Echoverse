import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { appwritePost, appwriteFileUpload } from "../appwrite";
import { Button } from "../components";
import Container from "../Container/Container";
import { Parser } from "html-to-react";
import parse from "html-react-parser";
import { set } from "react-hook-form";
import Loader from "react-js-loader";
import toast from "react-hot-toast";

export default function Post() {
  const { id: slug } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const parse = new Parser();

  useEffect(() => {
    console.log("Slug :: ", slug);
    setLoading(true);
    appwritePost
      .getPost(slug)
      .then((res) => {
        setPost(res);
        console.log("Post :: ", res);
        console.log("post ::", typeof post.content);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Post Fetch Failed :: ", err);
        setLoading(false);
      });
  }, []);

  const deletePost = () => {
    console.log("Delete Post :: ");
    appwriteFileUpload.deleteFile(post.featuredImage);
    appwritePost
      .deletePost(post.$id)
      .then((res) => {
        console.log("Post Deleted :: ", res);
        toast.success("Post Deleted Successfully");
        navigate("/");
      })
      .catch((err) => {
        console.error("Post Delete Failed :: ", err);
        toast.error("Post Delete Failed");
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
      {loading && (
        <div className="absolute top-0 left-0 bg-slate-100 bg-opacity-40 w-full h-full flex justify-center items-center">
          <Loader
            type="spinner-cub"
            bgColor={"#000"}
            //title={"Loading..."}
            size={75}
          />
        </div>
      )}
    </div>
  );
}
