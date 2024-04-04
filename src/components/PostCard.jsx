import { appwriteFileUpload } from "../appwrite";
import { Link } from "react-router-dom";

export default function PostCard({ posts }) {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mt-4">
      {posts.map((post) => (
        <Link to={`post/${post.$id}`}>
          <div
            key={post.$id}
            className="border p-6 space-y-5 shadow-lg rounded-lg"
          >
            <h2 className="text-3xl font-semibold">{post.title}</h2>
            <p>{post.content}</p>
            <img
              className="w-full object-cover"
              src={appwriteFileUpload.getFilePreview(post.featuredImage)}
              alt={post.title}
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
