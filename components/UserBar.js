import React, { useState } from 'react';
import { Image } from 'react-native';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';

import FollowButton from './FollowButton';
import { useMutation } from '@apollo/react-hooks';
import { withNavigation } from 'react-navigation';

const FOLLOW = gql`
  mutation follow($id: String!) {
    follow(id: $id)
  }
`;
const UNFOLLOW = gql`
  mutation unfollow($id: String!) {
    unfollow(id: $id)
  }
`;

const Container = styled.View`
  background-color: white;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 13px;
`;

const Header = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const Username = styled.Text`
  margin-left: 10px;
  font-weight: 500;
`;

const UserBar = ({
  navigation,
  id,
  username,
  avatar,
  isSelf,
  isFollowing: _isFollowing,
}) => {
  const [isFollowing, setIsFollowing] = useState(_isFollowing);
  const [followMutation] = useMutation(FOLLOW, { variables: { id } });
  const [unfollowMutation] = useMutation(UNFOLLOW, { variables: { id } });

  const toggleFollow = async () => {
    setIsFollowing((f) => !f);
    try {
      isFollowing ? await unfollowMutation() : await followMutation();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container>
      <Header onPress={() => navigation.navigate('UserDetail', { username })}>
        <Image
          style={{ height: 45, width: 45, borderRadius: 25 }}
          source={{ uri: avatar }}
        />
        <Username>{username}</Username>
      </Header>
      {!isSelf && (
        <FollowButton isFollowing={isFollowing} onPress={toggleFollow} />
      )}
    </Container>
  );
};

UserBar.propTypes = { isSelf: PropTypes.bool.isRequired };

export default withNavigation(UserBar);
