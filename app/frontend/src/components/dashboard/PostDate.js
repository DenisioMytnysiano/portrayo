import React from 'react';

const formatDate = (dateStr) => {
  const date = new Date(dateStr);

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  }).format(date);
};

const PostDate = ({ date }) => <span>{formatDate(date)}</span>;

export default PostDate;