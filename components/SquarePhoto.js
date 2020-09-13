import React from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity, Image } from 'react-native';

import constants from '../constants';

const SquarePhoto = ({ navigation, files = [], id }) => (
  <TouchableOpacity onPress={() => navigation.navigate('Detail', { id })}>
    <Image
      source={{ uri: files[0].url }}
      style={{
        width: constants.width / 3 - 1,
        height: constants.width / 3 - 1,
        margin: 0.5,
      }}
    />
  </TouchableOpacity>
);

SquarePhoto.propType = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  id: PropTypes.string.isRequired,
};

export default withNavigation(SquarePhoto);
