import React, { useState } from 'react';
import styled from 'styled-components';
import { TextInput, Keyboard } from 'react-native';
import PropTypes from 'prop-types';

import constants from '../constants';
import styles from '../styles';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Text = styled.Text`
  color: ${styles.blueColor};
  font-weight: 600;
`;
const Touchable = styled.TouchableOpacity`
  width: ${constants.width / 6};
  align-items: center;
  padding-left: 10px;
`;

const SearchBar = ({ onChange, value, onSubmit }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Container>
      <TextInput
        style={{
          width: isFocused
            ? (constants.width * 5) / 6 - 20
            : constants.width - 20,
          height: 35,
          backgroundColor: styles.lightGreyColor,
          //   padding: 10,
          borderRadius: 5,
          textAlign: 'center',
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        returnKeyType="search"
        onChangeText={onChange}
        onSubmitEditing={onSubmit}
        value={value}
        placeholder={'Search'}
        placeholderTextColor={styles.darkGreyColor}
      />
      {isFocused && (
        <Touchable onPress={() => Keyboard.dismiss()}>
          <Text>Cancel</Text>
        </Touchable>
      )}
    </Container>
  );
};

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
export default SearchBar;
