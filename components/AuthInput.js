import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import constants from '../constants';

const Container = styled.View`
  margin-bottom: 10px;
`;
const TextInput = styled.TextInput`
  width: ${constants.width / 2};
  padding: 10px;
  background-color: ${(props) => props.theme.greyColor};
  border: 1px solid ${(props) => props.theme.lightGreyColor};
  border-radius: 4px;
`;

const AuthInput = ({
  placeholder,
  keyboardType,
  value,
  autoCapitalize,
  onChange,
}) => (
  <Container>
    <TextInput
      placeholder={placeholder}
      keyboardType={keyboardType}
      value={value}
      autoCapitalize={autoCapitalize}
      onChangeText={onChange}
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
};

export default AuthInput;
