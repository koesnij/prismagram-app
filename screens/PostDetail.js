import React from 'react';
import styled from 'styled-components';
import { useQuery, gql } from '@apollo/react-hooks';
import Loader from '../components/Loader';
import Post from './Tabs/Post';
import { ScrollView } from 'react-native-gesture-handler';

const View = styled.View`
  background-color: white;
  flex: 1;
`;
const Text = styled.Text``;

const SEE_POST = gql`
  query seeFullPost($id: String!) {
    seeFullPost(id: $id) {
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

export default ({ navigation }) => {
  const { loading, data } = useQuery(SEE_POST, {
    variables: { id: navigation.getParam('id') },
  });
  console.log(loading, data);
  return (
    <View>
      <ScrollView>
        {loading ? (
          <Loader />
        ) : (
          data && data.seeFullPost && <Post {...data.seeFullPost} />
        )}
      </ScrollView>
    </View>
  );
};
