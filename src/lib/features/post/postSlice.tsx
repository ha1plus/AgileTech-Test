import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import useAxiosInstance from '@/tools/api';

interface Post {
  id: string;
  title: string;
  description: string;
  tags: Array<string>;
}

export interface PostState {
  value: Post[];
}

const initialState: PostState = {
  value: [],
};

export const fetchPosts = createAsyncThunk('post/fetchPosts', async () => {
  // console.log('Fetching posts...'); // Debugging: Log before API call
  const axiosInstance = useAxiosInstance();
  try {
    const response = await axiosInstance.get<Post[]>('/posts');
    // console.log('API Response:', response); // Log the entire response object
    // console.log('API Response Data:', response.data); 
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch posts');
  }
});

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
      console.log('Redux State Update:', action.payload); 
      state.value = action.payload; // Directly assign action.payload if it's an array of posts
    });
  },
});

export default postSlice.reducer;