'use client'

import DashBoardLayout from "@/app/components/dashboard-layout";
import { fetchTags } from "@/lib/features/tag/tagSlice"; // Ensure this path is correct
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { useEffect } from "react";

export default function AddPost() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  const tags = useAppSelector(state => state.tag.value);
  // console.log(tags);
  return (
    <DashBoardLayout>
      <form action="">
        {/* Form fields go here */}
      </form>
    </DashBoardLayout>
  );
}