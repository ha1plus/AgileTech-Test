'use client';

import { useForm, SubmitHandler } from "react-hook-form";
import { setTokens } from "@/lib/features/user/userSlice";
import Cookies from 'js-cookie';
import { useAppDispatch } from '@/lib/hook';
import useAxiosInstance from "@/tools/api";
import { useRouter } from 'next/navigation';

type Inputs = {
  userName: string;
};

export default function SignInForm() {
  const dispatch = useAppDispatch();
  const axiosInstance = useAxiosInstance();
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (dataSubmit) => {
    try {
      const res = await axiosInstance.post('/auth/login', {
        username: dataSubmit.userName,
      });

      const data = res.data;
      
      if (res.status === 201) {
        // Set accessToken to Redux store
        dispatch(setTokens({ accessToken: data.accessToken }));

        // console.log(res.data);
        
        // Set refreshToken to cookie with 1-day expiration
        Cookies.set('refreshToken', data.refreshToken, { expires: 1 });

        router.push('/profile');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    /* Sign In Form */
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-3/4">
      <div className="relative">
        <h2 className="text-3xl lg:text-6xl text-center mb-4">Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block h-8">Username</label>
          <input
            type="text"
            className="p-2 grow border border-solid border-black w-full h-[60px] rounded"
            {...register("userName", { required: true })}
          />
          {errors.userName?.type === "required" && (
            <p className="text-red-500">User name is required</p>
          )}
          <button className="btn btn-primary w-full mt-[60px]">Sign In</button>
        </form>
      </div>
    </div>
  );
}