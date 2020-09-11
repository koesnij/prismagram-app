import React from 'react';
import styled from 'styled-components';
import Loader from '../../components/Loader';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const FEED_QUERY = gql`
  {
    seeFeed {
      id
      location
      caption
      user {
        id
        avatar
        username
      }
      files {
        id
        url
      }
      isLiked
      likeCount
      comments {
        id
        text
        user {
          id
          avatar
          username
        }
      }
    }
  }
`;

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default () => {
  const { loading, data } = useQuery(FEED_QUERY); // persistCache 동작
  console.log(loading, data);
  return <View>{loading ? <Loader /> : null}</View>;
};
