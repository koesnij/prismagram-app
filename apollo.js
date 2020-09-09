import Constants from 'expo-constants';

const options = {
  uri: `http://${Constants.manifest.debuggerHost.split(':').shift()}:4000`,
};

export default options;
