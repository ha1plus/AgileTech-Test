'use client'

import DashBoardLayout from "@/app/components/dashboard-layout";
import { fetchTags } from "@/lib/features/tag/tagSlice"; // Ensure this path is correct
import { useAppDispatch } from "@/lib/hook";
import useAxiosInstance from "@/tools/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from 'next/navigation';

type Inputs = {
  title: string;
  description: string;
  tags: Array<any>;
};

export default function AddPost() {
  const dispatch = useAppDispatch();
  const axiosInstance = useAxiosInstance();
  const [loading, setLoading] = useState<boolean>(false);
  const [tagOptions, setTagOptions] = useState<Array<string>>([]);
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    const fetchTags = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/posts/tags');
            setTagOptions(response.data);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        } finally {
        setLoading(false);
        }
    };

    fetchTags();
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (dataSubmit) => {
    try {
      const res = await axiosInstance.patch(`/posts/${id}`, {
        title: dataSubmit.title,
        description: dataSubmit.description,
        tags: dataSubmit.tags
      });
      // console.log(dataSubmit);

      const data = res.data;
      
      
      if (res.status === 200) {
        router.push('/profile');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <DashBoardLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex-1 p-3">
        <div className="flex items-center justify-between">
          <label htmlFor="title" className="block text-sm font-bold text-gray-700">Edit Post</label>
          <Link href="/profile">
              <button className="btn btn-primary w-full lg:max-w-60">Back</button>
          </Link>
        </div>
        <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" 
              id="title" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-3 focus:border-3 sm:text-sm" 
              {...register("title", { required: true })}
            />
            {errors.title?.type === "required" && (
              <p className="text-red-500">Title is required</p>
            )}
        </div>
        <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="description" 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-3 focus:border-3 sm:text-sm"
            {...register("description", { required: true })}
            ></textarea>
             {errors.description?.type === "required" && (
              <p className="text-red-500">Description is required</p>
            )}
        </div>
        <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags</label>
            <select 
              id="tags" 
              multiple 
              className="select-dark mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-3 focus:border-3 sm:text-sm"
              {...register("tags")}
            >
              {tagOptions.map((tag, index) => {
                return (
                    <option key={index} value={tag}>
                        {tag}
                    </option>
                  );
              })}
            </select>
        </div>
        <button type="submit" className="mt-4 w-full inline-flex justify-center p-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-3 hover:bg-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-3">
            Submit
        </button>
    </form>
    </DashBoardLayout>
  );
}