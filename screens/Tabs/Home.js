import React, { useState } from 'react';
import { ScrollView, RefreshControl } from 'react-native'; // FlatList가 고성능
import styled from 'styled-components';
import Loader from '../../components/Loader';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import Post from './Post';

export const FEED_QUERY = gql`
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
      likes {
        id
        user {
          id
          avatar
          username
          isSelf
          isFollowing
        }
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

export default () => {
  const { loading, data, refetch } = useQuery(FEED_QUERY, {
    fetchPolicy: 'network-only',
  }); // persistCache 동작
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {loading ? (
        <Loader />
      ) : (
        data &&
        data.seeFeed &&
        data.seeFeed.map((post) => <Post key={post.id} {...post} />)
      )}
    </ScrollView>
  );
};
