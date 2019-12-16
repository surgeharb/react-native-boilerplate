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

import {
  SafeAreaView,
  StatusBar,
  Alert,
  FlatList,
  View,
  Text,
  ListRenderItemInfo,
  Image,
} from 'react-native';

interface ComponentsResponse {
  components: any[];
  extraData: any;
}

type Props = { [key: string]: any };

type State = ComponentsResponse & {};

class App extends Component<Props, State> {

  private BASE_URL = 'http://localhost:3000';
  private API_PATH = 'v1/posts';

  public state = {
    components: [],
    extraData: {},
  };

  constructor(props: Props) {
    super(props);

    this._keyExtractor = this._keyExtractor.bind(this);
    this._renderComponent = this._renderComponent.bind(this);
    this._renderSectionData = this._renderSectionData.bind(this);
  }

  public componentDidMount() {
    fetch(`${this.BASE_URL}/${this.API_PATH}`)
      .then(async res => this._parseData(await res.json()))
      .catch(err => Alert.alert(err));
  }

  private _parseData(data: ComponentsResponse) {
    this.setState(data);
  }

  private _keyExtractor({ id, value }: any, index: number) {
    return value?.componentId || id || `${Math.round(Math.random() * 100)}-${index}`;
  }

  private _renderSectionData({ item }: ListRenderItemInfo<any>) {
    return (
      <View style={{ padding: 15 }}>
        <Text>{'Title: ' + item.title}</Text>
        <Text>{'Subtitle: ' + item.subtitle}</Text>
        <Text>{'Footer: ' + item.footer}</Text>

        <Image source={{ uri: item.image, width: 150, height: 150 }}></Image>
      </View>
    )
  }

  private _renderComponent({ item }: ListRenderItemInfo<any>) {
    const { type, value } = item;

    if (type === 'GENERIC') {
      return (
        <FlatList
          data={value.data}
          renderItem={this._renderSectionData}
          keyExtractor={this._keyExtractor}
        />
      )
    }

    const separators: any = null;
    return this._renderSectionData({ item: value.data, index: 0, separators });
  }

  public render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <FlatList
            data={this.state.components}
            renderItem={this._renderComponent}
            keyExtractor={this._keyExtractor}
          />
        </SafeAreaView>
      </>
    );
  }
};

export default App;
