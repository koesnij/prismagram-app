import React, { useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { gql } from 'apollo-boost';
import styled from 'styled-components';

import AuthButton from '../../components/AuthButton';
import { useLogOut } from '../../AuthContext';
import { useQuery } from '@apollo/react-hooks';
import Loader from '../../components/Loader';
import UserProfile from '../../components/UserProfile';

const Text = styled.Text``;

export const ME = gql`
  {
    me {
      id
      avatar
      username
      fullName
      isSelf
      bio
      following {
        id
        avatar
        username
        isSelf
        isFollowing
      }
      followingCount
      followers {
        id
        avatar
        username
        isSelf
        isFollowing
      }
      followersCount
      postsCount
      posts {
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
        likeCount
        isLiked
        comments {
          id
          text
          user {
            id
            username
          }
        }
        createdAt
      }
    }
  }
`;

export default () => {
  const logOut = useLogOut();
  const handler = () => {
    logOut();
  };
  const { loading, data, refetch } = useQuery(ME);
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
      {loading ? <Loader /> : data && data.me && <UserProfile {...data.me} />}
      <AuthButton onPress={handler} text="Log Out" />
    </ScrollView>
  );
};
