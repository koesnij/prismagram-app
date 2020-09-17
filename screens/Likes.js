import React from 'react';
import { ScrollView } from 'react-native';

import Loader from '../components/Loader';
import UserBar from '../components/UserBar';

const Likes = ({ navigation }) => {
  const likes = navigation.getParam('likes');
  console.log(likes);
  return (
    <ScrollView>
      {!likes ? (
        <Loader />
      ) : (
        likes.map((like) => <UserBar key={like.id} {...like.user} />)
      )}
    </ScrollView>
  );
};

export default Likes;
