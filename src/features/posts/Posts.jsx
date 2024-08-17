import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Loader } from 'rsuite';


import { selectAllPosts, getPostsError, getPostsStatus } from './postsSlice';
import TableData from './TableData';
import { fetchPosts } from './postsSlice';

const Posts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const posts = useSelector(selectAllPosts);
  const status = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  const [fetched, setFetched] = useState(false);
  let content;

  if (status === 'loading') {
    content = <Loader size="lg" content="Loading" />;
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

  const handleClick = () => {
    dispatch(fetchPosts());
    navigate('/');
    setFetched(true);
  };

  return (
    <div>
      {!fetched ? (
        <Button
          className="m-2 p-2"
          size="lg"
          variant="outline-success"
          onClick={handleClick}
        >
          Fetch Posts
        </Button>
      ) : (
        <div className="bg-stone-200">
          <div className="text-center">
            <h1 className="text-3xl text-slate-700 font-bold">
              Here are all the Posts
            </h1>
          </div>
          <div className="p-2 space-y-3 w-1/2 ">{content}</div>
        </div>
      )}
    </div>
  );
};

export default Posts;
