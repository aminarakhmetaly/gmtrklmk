import React from 'react';
import {View, TouchableOpacity, Button, Text} from 'react-native';
import {Divider} from 'react-native-elements';

export default class Autocomplete extends React.Component{

  _pressed = () => {
    this.props.onClick(this.props.item);
  }

  render(){
    return (
      <TouchableOpacity onPress={this._pressed} style={{height: 38, fontSize: 24, lineHeight: 30}}>
        <Text>{this.props.item}</Text>
        <Divider/>
      </TouchableOpacity>
    )
  }
}