import React from 'react';
import { ScrollView } from 'react-native';

import Loader from '../components/Loader';
import UserBar from '../components/UserBar';

const Following = ({ navigation }) => {
  const following = navigation.getParam('following');
  console.log(following);
  return (
    <ScrollView>
      {!following ? (
        <Loader />
      ) : (
        following.map((following) => (
          <UserBar key={following.id} {...following} />
        ))
      )}
    </ScrollView>
  );
};

export default Following;
