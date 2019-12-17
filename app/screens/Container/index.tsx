import React from 'react';
import { Text } from 'react-native';
import { Renderer, RendererProps } from '../../../app/components/renderer';

export class ComponentsContainer extends Renderer {

  BASE_URL = 'http://localhost:3000';
  API_PATH = 'v1/posts';

  constructor(props: RendererProps) {
    super(props);
  }

  public render() {
    const EMPTY = <Text>NO COMPONENTS</Text>;

    return (
      this.state?.components?.length ? this._rendererWorker.renderComponents() : EMPTY
    );
  }

}
