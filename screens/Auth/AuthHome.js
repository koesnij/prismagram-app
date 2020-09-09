import React from 'react';
import styled from 'styled-components';
import constants from '../../constants';
import AuthButton from '../../components/AuthButton';

const View = styled.View`
  background-color: white;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Image = styled.Image`
  width: 45%;
  height: 10%;
`;

const Touchable = styled.TouchableOpacity``;
const LoginLink = styled.View``;
const LoginLinkText = styled.Text`
  margin-top: 20px;
  color: ${(props) => props.theme.blueColor};
`;

export default ({ navigation }) => (
  <View>
    <Image resizeMode={'contain'} source={require('../../assets/logo.png')} />
    <AuthButton
      onPress={() => navigation.navigate('SignUp')}
      text={'Create New Account'}
    />
    <Touchable onPress={() => navigation.navigate('Login')}>
      <LoginLink>
        <LoginLinkText>Log in</LoginLinkText>
      </LoginLink>
    </Touchable>
  </View>
);
