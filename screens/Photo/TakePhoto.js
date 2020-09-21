import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { Camera } from 'expo-camera';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';

import constants from '../../constants';
import Loader from '../../components/Loader';
import styles from '../../styles';

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

const Button = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  border: 15px solid ${styles.lightGreyColor};
`;
export default ({ navigation }) => {
  const cameraRef = useRef();
  const [canTakePhoto, setCanTakePhoto] = useState(true);
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const takePhoto = async () => {
    if (!canTakePhoto) {
      return;
    }
    try {
      setCanTakePhoto(false);
      const { uri } = await cameraRef.current.takePictureAsync({
        quality: 1,
      });
      const asset = await MediaLibrary.createAssetAsync(uri);
    } catch (e) {
      console.log(e);
      setCanTakePhoto(true);
    }
  };
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
        <>
          <Camera
            ref={cameraRef}
            type={cameraType}
            style={{
              justifyContent: 'flex-end',
              padding: 15,
              width: constants.width,
              height: constants.width,
            }}
          >
            <TouchableOpacity onPress={toggleType}>
              <MaterialCommunityIcons
                name={'camera'}
                size={32}
                color={'white'}
              />
            </TouchableOpacity>
          </Camera>
          <TouchableOpacity onPress={takePhoto} disabled={!canTakePhoto}>
            <Button></Button>
          </TouchableOpacity>
        </>
      ) : null}
    </View>
  );
};
