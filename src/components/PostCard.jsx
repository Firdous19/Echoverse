import { appwriteFileUpload } from "../appwrite";
import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    // console.log("Post :: ", post),
    <div>
      {/* {posts.map((post) => ( */}
        <Link to={`post/${post.$id}`} key={post.$id}>
          <div className="border p-6 space-y-5 shadow-lg rounded-lg">
            <h2 className="text-3xl font-semibold">{post.title}</h2>
            <img
              className="w-full object-cover"
              src={appwriteFileUpload.getFilePreview(post.featuredImage)}
              alt={post.title}
            />
          </div>
        </Link>
      {/* ))} */}
    </div>
  );
}
