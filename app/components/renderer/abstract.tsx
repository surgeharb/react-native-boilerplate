import { Component } from 'react';
import { Alert } from 'react-native';
import { RendererWorker } from './worker';
import { ComponentsResponse } from './interfaces';

export type RendererProps = {};

export type RendererState = ComponentsResponse;

export abstract class Renderer extends Component<RendererProps, RendererState> {
  abstract BASE_URL: string;
  abstract API_PATH: string;

  protected _rendererWorker: RendererWorker;

  constructor(props: RendererProps) {
    super(props);

    this._rendererWorker = new RendererWorker();
  }

  private _updateComponentsData(data: ComponentsResponse) {
    this._rendererWorker.components = data.components;
    this.setState(data);
  }

  public componentDidMount() {
    fetch(`${this.BASE_URL}/${this.API_PATH}`)
      .then(async res => this._updateComponentsData(await res.json()))
      .catch(err => Alert.alert(err));
  }
}