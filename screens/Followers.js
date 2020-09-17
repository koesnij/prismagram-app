import React from 'react';
import { ScrollView } from 'react-native';

import Loader from '../components/Loader';
import UserBar from '../components/UserBar';

const Followers = ({ navigation }) => {
  const followers = navigation.getParam('followers');
  console.log(followers);
  return (
    <ScrollView>
      {!followers ? (
        <Loader />
      ) : (
        followers.map((follower) => <UserBar key={follower.id} {...follower} />)
      )}
    </ScrollView>
  );
};

export default Followers;
