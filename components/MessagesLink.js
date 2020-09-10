import React from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components';
import { withNavigation } from 'react-navigation';

import NavIcon from './NavIcon';

const Container = styled.TouchableOpacity`
  padding-right: 10px;
`;

const Text = styled.Text``;

export default withNavigation(({ navigation }) => (
  <Container onPress={() => navigation.navigate('MessageNavigation')}>
    <NavIcon name={'send'} />
  </Container>
));
