import React, { useState } from 'react';
import { Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';

import AuthButton from '../../components/AuthButton';
import AuthInput from '../../components/AuthInput';
import useInput from '../../hooks/useInput';
import { CONFIRM_SECRET } from './AuthQueries';
import { useLogIn } from '../../AuthContext';

const View = styled.View`
  background-color: white;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation }) => {
  const confirmInput = useInput('');
  const logIn = useLogIn();
  const [loading, setLoading] = useState(false);
  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      email: navigation.getParam('email'),
      secret: confirmInput.value,
    },
  });

  const handleConfirm = async () => {
    const { value } = confirmInput;
    if (value === '' || !value.includes(' ')) {
      return Alert.alert('Invalid Secret.');
    }
    try {
      setLoading(true);
      const {
        data: { confirmSecret },
      } = await confirmSecretMutation();
      if (confirmSecret) {
        logIn(confirmSecret);
      } else {
        Alert.alert('Wrong Secret!');
      }
    } catch (e) {
      Alert.alert("Can't confirm secret.");
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...confirmInput} /*value랑 onChange를 리턴함*/
          placeholder="Secret"
          onSubmitEditing={handleConfirm}
          autoCorrect={false}
          returnKeyType="done"
        />
        <AuthButton onPress={handleConfirm} text="Confirm" loading={loading} />
      </View>
    </TouchableWithoutFeedback>
  );
};
