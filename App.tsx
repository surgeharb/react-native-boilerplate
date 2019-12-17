/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { Component } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import { ComponentsContainer } from './app/screens';

class App extends Component {

  public render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ComponentsContainer />
        </SafeAreaView>
      </>
    );
  }
};

export default App;
