import React from 'react';
import styled from 'styled-components';
import { useQuery, gql } from '@apollo/react-hooks';
import Loader from '../components/Loader';
import Post from './Tabs/Post';
import { ScrollView } from 'react-native-gesture-handler';
import UserProfile from '../components/UserProfile';

const View = styled.View`
  background-color: white;
  flex: 1;
`;
const Text = styled.Text``;

const GET_USER = gql`
  query seeUser($username: String!) {
    seeUser(username: $username) {
      id
      avatar
      username
      fullName
      isFollowing
      isSelf
      bio
      followingCount
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

export default ({ navigation }) => {
  const { loading, data } = useQuery(GET_USER, {
    variables: { username: navigation.getParam('username') },
  });
  console.log(loading, data);
  return (
    <View>
      <ScrollView>
        {loading ? (
          <Loader />
        ) : (
          data && data.seeUser && <UserProfile {...data.seeUser} />
        )}
      </ScrollView>
    </View>
  );
};
