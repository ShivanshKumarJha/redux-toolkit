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
      const response = axios.delete(`${BASE_URL}/${id}`);
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
});
