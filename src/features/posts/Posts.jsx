import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllPosts, getPostsError, getPostsStatus } from './postsSlice';
import TableData from './TableData';

const Posts = () => {
  const posts = useSelector(selectAllPosts);
  const status = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  let content;

  if (status === 'loading') {
    content = <div className="text-center  my-5">Loading...</div>;
  } else if (status === 'succeeded') {
    const orderedPosts = posts.slice().sort((a, b) => a - b);
    content = orderedPosts.map((post, i) => <TableData key={i} post={post} />);
  } else if (status === 'failed') {
    content = (
      <>
        <h1>Posts not found</h1>
        <p className="text-center text-danger">{error}</p>
      </>
    );
  }

  return (
    <div className="bg-stone-200">
      <div className="text-center">
        <h1 className="text-3xl text-slate-700 font-bold">Here are all the Posts</h1>
      </div>
      <div className="m-2 p-2 space-y-3 w-1/2 ">{content}</div>
    </div>
  );
};

export default Posts;
