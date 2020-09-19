import React, { useEffect, useState } from 'react';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';

import Loader from '../../components/Loader';
import constants from '../../constants';

const View = styled.View`
  flex: 1;
`;

const Text = styled.Text``;

export default () => {
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [selected, setSelected] = useState();
  const [allPhotos, setAllPhotos] = useState();
  const changeSelected = (photo) => {
    setSelected(photo);
  };
  const getPhotos = async () => {
    try {
      const { assets } = await MediaLibrary.getAssetsAsync();
      const [firstPhoto] = assets;
      setSelected(firstPhoto);
      setAllPhotos(assets);
      console.log(photos);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      console.log(status);
      if (status === 'granted') {
        setHasPermission(true);
        getPhotos();
      }
    } catch (error) {
      console.log(error);
      setHasPermission(false);
    }
  };
  useEffect(() => {
    askPermission();
  }, []);

  return (
    <View>
      {loading ? (
        <Loader />
      ) : (
        <View>
          {hasPermission ? (
            <>
              <Image
                style={{
                  height: constants.width,
                  width: constants.width,
                }}
                source={{ uri: selected.uri }}
              />
              <ScrollView contentContainerStyle={{ flexDirection: 'row' }}>
                {allPhotos.map((photo) => (
                  <TouchableOpacity
                    key={photo.id}
                    onPress={() => changeSelected(photo)}
                  >
                    <Image
                      source={{ uri: photo.uri }}
                      style={{
                        margin: 1,
                        width: constants.width / 3 - 2,
                        height: constants.width / 3 - 2,
                        opacity: photo.id === selected.id ? 0.5 : 1,
                      }}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          ) : (
            <Text>'Oops'</Text>
          )}
        </View>
      )}
    </View>
  );
};
