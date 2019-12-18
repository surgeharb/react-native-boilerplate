import React from 'react';
import { Touchable } from '../common';
import { FlatList, View, Text, Image, ListRenderItemInfo, Alert } from "react-native";

export class RendererWorker {

  private _components: any[] = [];

  constructor() {
    this._keyExtractor = this._keyExtractor.bind(this);
    this._renderComponent = this._renderComponent.bind(this);
    this._renderSectionData = this._renderSectionData.bind(this);
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

        <Touchable onPress={() => Alert.alert('Yo')}>
          <Image source={{ uri: item.image, width: 150, height: 150 }}></Image>
        </Touchable>
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

  public get components() {
    return this._components;
  }

  public set components(components: any[]) {
    this._components = components;
  }

  public renderComponents() {
    return (
      <FlatList
        data={this._components}
        renderItem={this._renderComponent}
        keyExtractor={this._keyExtractor}
      />
    );
  }
}
