import React from 'react';
import { deletePost } from './postsSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const TableData = ({ post }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = post;

  const handleDelete = () => {
    try {
      dispatch(deletePost({ id }));
      navigate('/');
    } catch (error) {
      console.log(`Failed to delete the post ${error}`);
    }
  };

  return (
    <div className="flex justify-between border-b-2 border-gray-600 items-center space-x-5">
      <div>
        <h2 className="text-amber-700  capitalize text-lg font-semibold text-justify">
          {post.title}
        </h2>
        <p className='text-justify'>{post.body}</p>
      </div>
      <div>
        <button
          className="btn btn-danger p-1 bg-rose-600 text-white border-2 rounded-lg border-rose-800 border-spacing-2"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TableData;
