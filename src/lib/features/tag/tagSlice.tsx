import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import useAxiosInstance from '@/tools/api';

interface Tag {
  name: string;
}

export interface TagState {
  value: Tag[];
}

const initialState: TagState = {
  value: [],
};


export const fetchTags = createAsyncThunk('tag/fetchTags', async () => {
  const axiosInstance = useAxiosInstance();
  try {
    const response = await axiosInstance.get<Tag[]>('/posts/tags');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch tags');
  }
});

const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTags.fulfilled, (state, action: PayloadAction<Tag[]>) => {
      state.value = action.payload;
    });
  },
});

export default tagSlice.reducer;