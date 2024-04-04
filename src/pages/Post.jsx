import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { appwritePost, appwriteFileUpload } from "../appwrite";
import { Button } from "../components";
import Container from "../Container/Container";

export default function Post() {
  const { id: slug } = useParams();
  const [post, setPost] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Slug :: ", slug);
    appwritePost
      .getPost(slug)
      .then((res) => {
        setPost(res);
        console.log("Post :: ", res);
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
      <h1>Post</h1>
      <div>
        <Container>
          <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
            <img
              src={appwriteFileUpload.getFile(post.featuredImage)}
              alt={post.title}
              className="rounded-xl w-full"
            />

            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          </div>
          <div className="w-full mb-6">
            <h1 className="text-2xl font-bold">{post.title}</h1>
          </div>
          {/* <div className="browser-css">{parse(post.content)}</div> */}
          <p>{post.content}</p>
        </Container>
      </div>
    </div>
  );
}
