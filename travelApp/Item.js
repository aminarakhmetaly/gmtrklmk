import React from 'react';
import {View, TouchableOpacity, Button, Text} from 'react-native';

export default class Item extends React.Component{

  _remove = () => {
    this.props.onClick(this.props.item);
  }

  render(){
    return (
      <TouchableOpacity onPress={this._remove}>
        <Text style={{padding: 10}}>{this.props.item.name}</Text>
      </TouchableOpacity>
    )
  }
}