import { useEffect, useCallback } from "react";
import { Input, RTE, Select, Button } from "../index";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { appwriteFileUpload, appwritePost } from "../../appwrite";
import { useSelector } from "react-redux";

export default function PostForm() {
  const form = useForm();
  const { register, handleSubmit, watch, setValue, control } = form;
  const userData = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
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
    window.alert("Post Successfully Created");
    navigate(`/post/${postData.$id}`);
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

  return (
    <form
      className="grid grid-cols-12 gap-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="col-span-8 space-y-6">
        <Input
          label="Title"
          type="=text"
          placeholder="Enter the title"
          {...register("title")}
        />
        <Input label="Slug" type="=text" name="slug" {...register("slug")} />
        <main>
          <RTE name="content" control={control} {...register("content")} />
        </main>
      </div>

      <div className="col-span-4 space-y-6">
        <Input
          label="Featured Image"
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          placeholder="Upload your File"
          {...register("featuredImage")}
        />
        <Select
          options={["Active", "InActive"]}
          label="Status"
          {...register("status")}
        />
        <Button type="Submit" className="text-center w-full">
          Submit
        </Button>
      </div>
    </form>
  );
}
