import React, { useState } from 'react';
import { ScrollView, RefreshControl } from 'react-native'; // FlatList가 고성능
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

const Text = styled.Text``;

export default () => {
  const { loading, data, refetch } = useQuery(FEED_QUERY); // persistCache 동작
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
      {loading ? <Loader /> : <Text>Hello</Text>}
    </ScrollView>
  );
};
