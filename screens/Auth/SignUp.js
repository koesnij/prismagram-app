import React, { useState } from 'react';
import { Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';

import AuthButton from '../../components/AuthButton';
import AuthInput from '../../components/AuthInput';
import useInput from '../../hooks/useInput';
import { CREATE_ACCOUNT } from './AuthQueries';

const View = styled.View`
  background-color: white;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation }) => {
  const fNameInput = useInput('');
  const lNameInput = useInput('');
  const emailInput = useInput('');
  const usernameInput = useInput('');
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      firstName: fNameInput.value,
      lastName: lNameInput.value,
      email: emailInput.value,
      username: usernameInput.value,
    },
  });

  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    const { value: fName } = fNameInput;
    const { value: lName } = lNameInput;
    const { value: email } = emailInput;
    const { value: username } = usernameInput;

    // 이메일 유효성 검사 정규표현식
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (fName === '') {
      return Alert.alert('I need your name.');
    }
    if (!emailRegex.test(email)) {
      return Alert.alert('That email is invalid.');
    }
    if (username === '') {
      return Alert.alert('Invalid username.');
    }

    try {
      setLoading(true);
      const {
        data: { createAccount },
      } = await createAccountMutation();
      if (createAccount) {
        Keyboard.dismiss();
        Alert.alert('Account is created', 'Log in now!');
        navigation.navigate('Login', { email });
      }
    } catch (e) {
      Alert.alert('Error', 'This email or username is already taken.');
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...fNameInput}
          placeholder="First Name"
          autoCorrect={false}
          autoCapitalize="words"
          returnKeyType="next"
        />
        <AuthInput
          {...lNameInput}
          placeholder="Last Name"
          autoCorrect={false}
          autoCapitalize="words"
          returnKeyType="next"
        />
        <AuthInput
          {...emailInput}
          placeholder="Email"
          autoCorrect={false}
          keyboardType="email-address"
          returnKeyType="next"
        />
        <AuthInput
          {...usernameInput}
          placeholder="Username"
          onSubmitEditing={handleSignUp}
          autoCorrect={false}
          returnKeyType="done"
        />
        <AuthButton onPress={handleSignUp} text="Sign Up" loading={loading} />
      </View>
    </TouchableWithoutFeedback>
  );
};
