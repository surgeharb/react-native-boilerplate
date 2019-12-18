import React from 'react';

import {
  View, Platform,
  TouchableHighlightProps,
  TouchableNativeFeedbackProps,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';

interface ComponentProps {
  background?: any;
}

export type TouchableProps = ComponentProps & (TouchableHighlightProps | TouchableNativeFeedbackProps);

export class Touchable extends React.Component<TouchableProps> {

  private press(action: any) {
    (typeof action === 'function') ? requestAnimationFrame(() => action()) : null;
  }

  public render(): React.ReactNode {
    const { style, background, children, onPress, ...restProps } = this.props;

    return (Platform.OS === 'android') ?

      (<TouchableNativeFeedback {...restProps}
        useForeground={true}
        delayPressIn={0}
        background={background}
        onPress={() => this.press(this.props.onPress)}>
        <View style={style}>{children}</View>
      </TouchableNativeFeedback>)

      :

      (<TouchableOpacity {...restProps}
        style={style}
        delayPressIn={0}
        onPress={() => this.press(this.props.onPress)}>
        {children}
      </TouchableOpacity>)

      ;
  }
}