import { useEffect, useCallback } from "react";
import { Input, RTE, Select, Button } from "../index";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { appwriteFileUpload, appwritePost } from "../../appwrite";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function PostForm({ post }) {
  const form = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      featuredImage: post?.featuredImage || "",
      status: post?.status || "Active",
    },
  });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = form;
  const userData = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  console.log("Post", post);

  const onSubmit = async (data) => {
    if (post) {
      const fileId = data.featuredImage[0];
      if (!fileId) {
        throw new Error("File Not Found");
      }

      const response = await appwriteFileUpload.uploadFile(fileId);
      if (!response) {
        throw new Error("File Upload failed");
      }
      console.log("File Upload:", response);

      const postData = await appwritePost.updatePost(data.slug, {
        ...data,
        featuredImage: response.$id,
        userId: userData.$id,
      });

      if (!postData) {
        throw new Error("Post Creation Failed");
      }

      const deleteFile = await appwriteFileUpload.deleteFile(
        post.featuredImage
      );

      if (!deleteFile) {
        throw new Error("File Delete Failed");
      }

      console.log("Post Updated Successfully", postData);
      // window.alert("Post Updated successfully");
      toast.success("Post Updated successfully");
      navigate(`/post/${postData.$id}`);
    } else {
      console.log(data);
      const fileId = data.featuredImage[0];
      if (!fileId) {
        throw new Error("File Not found");
      }

      const response = await appwriteFileUpload.uploadFile(fileId);
      if (!response) {
        throw new Error("File Upload failed");
      }
      console.log("File Upload:", response);

      // const { $id } = response;

      const postData = await appwritePost.createPost(data.slug, {
        ...data,
        featuredImage: response.$id,
        userId: userData.$id,
      });

      if (!postData) {
        throw new Error("Post Creation Failed");
      }

      console.log("Post Successfully Created", postData);
      // window.alert("Post Successfully Created");
      toast.success("Post Successfully Created");
      navigate(`/post/${postData.$id}`);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  useEffect(() => {
    if (!post) return;
    const file = appwriteFileUpload.getFilePreview(post.featuredImage);
    console.log("File", file);
  }, []);

  // console.log("Type", typeof post?.content);
  return (
    <form
      className="grid grid-cols-12 gap-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="col-span-8 space-y-6">
        <div className="space-y-3">
          <Input
            label="Title"
            type="=text"
            placeholder="Enter the title"
            {...register("title", {
              required: {
                value: true,
                message: "Title is required",
              },
            })}
          />
          <p className="text-red-500">
            {errors.title ? `*${errors.title.message}` : ""}
          </p>
        </div>
        <Input label="Slug" type="=text" name="slug" {...register("slug")} />
        <main className="space-y-2">
          <RTE
            name="content"
            control={control}
            {...register("content", {
              required: {
                value: true,
                message: "Content is required",
              },
            })}
            defaultValue={getValues("content").toString() || ""}
          />
          <p className="text-red-500">
            {errors.content ? `*${errors.title.content}` : ""}
          </p>
        </main>
      </div>

      <div className="col-span-4 space-y-6">
        <div className="space-y-2">
          <Input
            label="Featured Image"
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            placeholder="Upload your File"
            {...register("featuredImage", {
              required: {
                value: true,
                message: "Featured Image is required",
              },
            })}
          />
          <p className="text-red-500">
            {errors.featuredImage ? `*${errors.featuredImage.message}` : ""}
          </p>
        </div>
        {post && (
          <div>
            <img
              className="w-full"
              src={appwriteFileUpload.getFilePreview(post.featuredImage)}
              alt={post.title}
            />
          </div>
        )}
        <Select
          options={["Active", "InActive"]}
          label="Status"
          {...register("status")}
        />

        <Button type="Submit" className="text-center w-full bg-blue-700">
          {post ? "Update Post" : "Create Post"}
        </Button>
      </div>
    </form>
  );
}
