import React from 'react';
import { Image } from 'react-native';
import Swiper from 'react-native-swiper';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import constants from '../../constants';

const Container = styled.View`
  background-color: white;
`;

const Header = styled.View`
  padding: 10px 5px;
  flex-direction: row;
  align-items: center;
`;

const HeaderColumn = styled.View`
  margin-left: 10px;
`;

const Touchable = styled.TouchableOpacity``;

const Bold = styled.Text`
  font-weight: 500;
`;

const Location = styled.Text`
  margin-top: 1px;
  font-size: 12px;
`;

const IconsContainer = styled.View`
  padding: 10px;
  flex-direction: row;
  align-items: center;
`;
const IconContainer = styled.View`
  margin-right: 10px;
`;

const Post = ({
  createdAt,
  likeCount,
  isLiked,
  caption,
  location,
  user,
  files = [],
  comments,
}) => (
  <Container>
    <Header>
      <HeaderColumn>
        <Touchable>
          <Image
            style={{ height: 40, width: 40, borderRadius: 20 }}
            source={{ uri: user.avatar }}
          />
        </Touchable>
      </HeaderColumn>
      <HeaderColumn>
        <Touchable>
          <Bold>{user.username}</Bold>
        </Touchable>
        <Touchable>
          <Location>{location}</Location>
        </Touchable>
      </HeaderColumn>
    </Header>
    <Swiper style={{ height: constants.width }}>
      {files &&
        files.map((file) => (
          <Image
            style={{ width: constants.width, height: constants.width }}
            key={file.id}
            source={{ uri: file.url }}
          />
        ))}
    </Swiper>
    <IconsContainer>
      <IconContainer>
        <Touchable>
          <MaterialCommunityIcons size={28} name={'heart-outline'} />
        </Touchable>
      </IconContainer>
      <IconContainer>
        <Touchable>
          <MaterialCommunityIcons size={28} name={'chat-outline'} />
        </Touchable>
      </IconContainer>
    </IconsContainer>
  </Container>
);

Post.propTypes = {
  id: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  caption: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default Post;
