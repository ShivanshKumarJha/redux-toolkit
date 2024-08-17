import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
  posts: [],
  status: 'idle',
  error: '',
};

export const fetchPosts = createAsyncThunk('post/fetchPosts', async () => {
  const response = await axios.get(BASE_URL);
  console.log(response);
  return response?.data;
});

export const deletePost = createAsyncThunk(
  'post/deletePost',
  async initialPost => {
    const { id } = initialPost;
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`);
      if (response?.status === 200) return initialPost;
      return `${response.status} : ${response.statusText}`;
    } catch (err) {
      return err.message;
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = state.posts.concat(action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action?.payload.id) {
          console.log('Could not delete!');
          console.log(action.payload);
          return;
        }

        const { id } = action.payload;
        const newPosts = state.posts.filter(post => post.id !== id);
        state.posts = newPosts;
      });
  },
});

export const selectAllPosts = state => state.posts.posts;
export const getPostsError = state => state.posts.error;
export const getPostsStatus = state => state.posts.status;

export default postsSlice.reducer;
