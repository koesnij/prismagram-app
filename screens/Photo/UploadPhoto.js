import React, { useState } from 'react';
import styled from 'styled-components';
import { ActivityIndicator, Alert, Image } from 'react-native';

import axios from 'axios';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { FEED_QUERY } from '../Tabs/Home';

import styles from '../../styles';
import constants from '../../constants';
import options from '../../apollo';
import useInput from '../../hooks/useInput';

const UPLOAD = gql`
  mutation upload($caption: String!, $files: [String!]!, $location: String!) {
    upload(caption: $caption, files: $files, location: $location) {
      id
      caption
      location
    }
  }
`;
const View = styled.View`
  flex: 1;
  background-color: white;
`;

const Container = styled.View`
  padding: 20px;
  flex-direction: row;
`;

const Form = styled.View`
  justify-content: flex-start;
`;

const STextInput = styled.TextInput`
  margin-bottom: 10px;
  border: 0px solid ${styles.lightGreyColor};
  border-bottom-width: 1px;
  padding-bottom: 10px;
  width: ${constants.width - 180};
`;

const Button = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.blueColor};
  padding: 10px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  color: white;
  font-weight: 600;
`;

export default ({ navigation }) => {
  const [loading, setIsLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState('');
  const photo = navigation.getParam('photo');
  const captionInput = useInput('');
  const locationInput = useInput('');
  const [uploadMutation] = useMutation(UPLOAD, {
    variables: {
      caption: captionInput.value,
      location: locationInput.value,
      files: [fileUrl],
    },
    refetchQueries: () => [{ query: FEED_QUERY }],
  });
  const handleSubmit = async () => {
    if (captionInput.value === '' || locationInput.value === '') {
      Alert.alert('All fields are required.');
    }
    const formData = new FormData();
    const name = photo.filename;
    const [, type] = name.split('.');
    formData.append('file', { name, type: type.toLowerCase(), uri: photo.uri });
    try {
      setIsLoading(true);
      const {
        data: { location },
      } = await axios.post(`${options.uri}/api/upload`, formData, {
        headers: { 'content-type': 'multipart/form-data' },
      });
      setFileUrl(location);
      const {
        data: { upload },
      } = await uploadMutation();
      if (upload.id) {
        navigation.navigate('TabNavigation');
      }
    } catch (error) {
      Alert.alert('Cannot Upload', 'Try later.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View>
      <Container>
        <Image
          source={{ uri: photo.uri }}
          style={{ height: 80, width: 80, marginRight: 30 }}
        />
        <Form>
          <STextInput
            onChangeText={captionInput.onChange}
            value={captionInput.value}
            placeholder="Caption"
            multiline={true}
            placeholderTextColor={styles.darkGreyColor}
          />
          <STextInput
            onChangeText={locationInput.onChange}
            value={locationInput.value}
            placeholder="Location"
            multiline={true}
            placeholderTextColor={styles.darkGreyColor}
          />
          <Button onPress={handleSubmit}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text>Upload</Text>
            )}
          </Button>
        </Form>
      </Container>
    </View>
  );
};
