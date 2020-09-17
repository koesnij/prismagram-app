import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import constants from '../constants';

const Touchable = styled.TouchableOpacity`
  width: ${constants.width / 4};
`;

const Following = styled.View`
  background-color: white;
  padding: 8px 0px;
  border: 0.5px solid ${(props) => props.theme.darkGreyColor};
  border-radius: 4px;
`;

const Follow = styled.View`
  background-color: ${(props) => props.theme.blueColor};
  padding: 8px 0px;
  border-radius: 4px;
`;

const FollowingText = styled.Text`
  color: black;
  font-size: 13px;
  text-align: center;
  font-weight: 600;
`;

const FollowerText = styled.Text`
  color: white;
  font-size: 13px;
  text-align: center;
  font-weight: 600;
`;

const FollowButton = ({ isFollowing, onPress }) => {
  return (
    <Touchable onPress={onPress}>
      {isFollowing ? (
        <Following>
          <FollowingText>Following</FollowingText>
        </Following>
      ) : (
        <Follow>
          <FollowerText>Follow</FollowerText>
        </Follow>
      )}
    </Touchable>
  );
};

FollowButton.propTypes = {
  isFollowing: PropTypes.bool.isRequired,
};

export default FollowButton;
