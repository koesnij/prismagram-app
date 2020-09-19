import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

import constants from '../../constants';
import Loader from '../../components/Loader';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const View = styled.View`
  flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);

  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      console.log(status);
      if (status === 'granted') {
        setHasPermission(true);
      }
    } catch (error) {
      console.log(error);
      setHasPermission(false);
    } finally {
      setLoading(false);
    }
  };
  const toggleType = () => {
    if (cameraType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back);
    } else {
      setCameraType(Camera.Constants.Type.front);
    }
  };
  useEffect(() => {
    askPermission();
  }, []);
  return (
    <View>
      {loading ? (
        <Loader />
      ) : hasPermission ? (
        <Camera
          style={{
            justifyContent: 'flex-end',
            padding: 15,
            width: constants.width,
            height: constants.width,
          }}
          type={cameraType}
        >
          <TouchableOpacity onPress={toggleType}>
            <MaterialCommunityIcons name={'camera'} size={32} color={'white'} />
          </TouchableOpacity>
        </Camera>
      ) : null}
    </View>
  );
};
