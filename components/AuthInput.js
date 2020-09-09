import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import constants from '../constants';

const Container = styled.View`
  width: 65%;
  margin-bottom: 10px;
`;
const TextInput = styled.TextInput`
  padding: 10px;
  background-color: ${(props) => props.theme.greyColor};
  border: 1px solid ${(props) => props.theme.lightGreyColor};
  border-radius: 4px;
`;

const AuthInput = ({
  placeholder,
  value,
  onChange,
  onSubmitEditing = () => null,
  autoCorrect = true,
  keyboardType = 'default',
  autoCapitalize = 'none',
  returnKeyType = 'done',
}) => (
  <Container>
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChange}
      onSubmitEditing={onSubmitEditing}
      keyboardType={keyboardType}
      returnKeyType={returnKeyType}
      autoCorrect={autoCorrect}
      autoCapitalize={autoCapitalize}
    />
  </Container>
);
AuthInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  keyboardType: PropTypes.oneOf([
    'default',
    'number-pad',
    'decimal-pad',
    'numeric',
    'email-address',
    'phone-pad',
  ]),
  autoCapitalize: PropTypes.oneOf(['characters', 'words', 'sentences', 'none']),
  onChange: PropTypes.func.isRequired,
  returnKeyType: PropTypes.oneOf(['done', 'go', 'next', 'search', 'send']),
  onSubmitEditing: PropTypes.func,
  autoCorrect: PropTypes.bool,
};

export default AuthInput;
