import React, { useState } from 'react';
import { Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import Swiper from 'react-native-swiper';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

import constants from '../../constants';
import styles from '../../styles';

const Container = styled.View`
  background-color: white;
  padding-bottom: 10px;
`;

const Header = styled.View`
  padding: 10px 0px;
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
  margin-bottom: 7px;
  flex-direction: row;
  align-items: center;
`;

const IconContainer = styled.View`
  margin-right: 10px;
`;

const InfoContainer = styled.View`
  padding: 10px;
`;

const Caption = styled.Text`
  margin: 5px 0px;
`;

const CommentCount = styled.Text`
  opacity: 0.5;
  font-size: 13px;
`;

const TOGGLE_LIKE = gql`
  mutation toggleLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;

const Post = ({
  navigation,
  id,
  createdAt,
  likeCount: _likeCount,
  isLiked: _isLiked,
  likes,
  caption,
  location,
  user,
  files = [],
  comments,
}) => {
  const [isLiked, setIsLiked] = useState(_isLiked);
  const [likeCount, setLikeCount] = useState(_likeCount);
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id },
  });

  const toggleLike = async () => {
    if (isLiked) {
      setIsLiked(false);
      setLikeCount(likeCount - 1);
    } else {
      setIsLiked(true);
      setLikeCount(likeCount + 1);
    }
    try {
      // try-catch로 감싸주기 & await 키워드
      await toggleLikeMutation();
    } catch (e) {}
  };

  return (
    <Container>
      <Header>
        <HeaderColumn>
          <Touchable
            onPress={() =>
              navigation.navigate('UserDetail', { username: user.username })
            }
          >
            <Image
              style={{ height: 40, width: 40, borderRadius: 20 }}
              source={{ uri: user.avatar }}
            />
          </Touchable>
        </HeaderColumn>
        <HeaderColumn>
          <Touchable
            onPress={() =>
              navigation.navigate('UserDetail', { username: user.username })
            }
          >
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
      <InfoContainer>
        <IconsContainer>
          <IconContainer>
            <Touchable onPress={toggleLike}>
              <MaterialCommunityIcons
                size={28}
                color={isLiked ? styles.redColor : styles.blackColor}
                name={isLiked ? 'heart' : 'heart-outline'}
              />
            </Touchable>
          </IconContainer>
          <IconContainer>
            <Touchable>
              <MaterialCommunityIcons
                size={28}
                color={styles.blackColor}
                name={'chat-outline'}
              />
            </Touchable>
          </IconContainer>
        </IconsContainer>
        <Touchable onPress={() => navigation.navigate('Likes', { likes })}>
          {likeCount === 1 ? (
            <Bold>1 like</Bold>
          ) : (
            <Bold>{likeCount} likes</Bold>
          )}
        </Touchable>
        <Touchable>
          <Caption>
            <Bold>{user.username}</Bold> {caption}
          </Caption>
        </Touchable>
        <Touchable>
          <CommentCount>See all {comments.length} comments</CommentCount>
        </Touchable>
      </InfoContainer>
    </Container>
  );
};

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
  likes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
      }).isRequired,
    })
  ),
};

export default withNavigation(Post);
