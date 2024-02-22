import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { airdropFilterData } from "../../utils";

const AddAirdropForm = ({ post }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        description: post?.description || "",
        status: post?.status || "active",
        applyLink: post?.applyLink || "",
        endDate: post?.endDate.slice(0, 10) || "",
        startDate: post?.startDate.slice(0, 10) || "",
        isBanner: post?.isBanner || "No",
        category: post?.category || "All",
      },
    });

  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        const fileId = post.banner;
        await appwriteService.deleteFile(fileId);
      }

      const dbPost = await appwriteService.updateAirdrop(post.$id, {
        ...data,
        banner: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/airdrop/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.banner = fileId;
        const dbPost = await appwriteService.createAirdrop({
          ...data,
          airdropId: userData.$id,
        });
        if (dbPost) {
          navigate(`/airdrop/${dbPost.$id}`);
        }
      }
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
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-wrap max-sm:flex-col max-sm:w-full max-sm:items-center max-sm:justify-center"
    >
      <div className="w-2/3 px-2 max-sm:w-full">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          isRequired
          {...register("title", { required: true })}
        />
        <Input
          label="Apply link :"
          placeholder="Apply Link"
          className="mb-4"
          isRequired
          {...register("applyLink", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          isRequired
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Description :"
          name="description"
          control={control}
          defaultValue={getValues("description")}
        />
      </div>
      <div className="w-1/3 px-2 max-sm:w-full">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.banner)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Select
          options={["Yes", "No"]}
          label="Banner"
          className="mb-4"
          defaultValue="No"
          {...register("isBanner", { required: true })}
        />
        <Select
          options={airdropFilterData}
          label="Category"
          className="mb-4"
          defaultValue="Select"
          {...register("category", { required: true })}
        />

        <Input
          label="Start Date :"
          placeholder="Start Date"
          type="date"
          className="mb-4"
          isRequired
          {...register("startDate", { required: true })}
        />
        <Input
          label="End Date :"
          placeholder="End Date"
          type="date"
          className="mb-4"
          isRequired
          {...register("endDate", { required: true })}
        />

        <Button
          type="submit"
          className="w-full shadow-lift font-semibold text-pale-blue"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default AddAirdropForm;
