import React from 'react';
import {Text, TouchableOpacity, View, TextInput, StyleSheet, Button} from 'react-native';
import {styles} from './styles';
import Item from './Item';
import {autoComplete} from './constants';
import Autocomplete from './Autocomplete'

let cnt = 0;

export default class LCard  extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      animated: false,
      text: ''
    }
  }

  _animate = () => {
    this.props.onClick(this.props.id);
    this.setState({animated: !this.state.animated})
  }

  _onChangeText = (text) => {
    cnt = 0;
    if (this.props.id === 1){
      this.props.originChanged(text);
    }
    this.setState({text});
  }

  _onPressView = () => {
    this.props.destinationsChanged(this.state.text);

    this.setState({
      text: ''
    })
  }

  componentDidMount() {
    this.setState({
      text: this.props.origin
    })
  }

  render() {
    const {placeholder, title, withButton} = this.props;
    const {animated, text} = this.state;

    return (
      <TouchableOpacity
        style={animated ? styles.animated : styles.notanimated}
        onPress={this._animate}
        >
        <Text style={styles.title}>{title}</Text>
        {!animated && <View>
          {!withButton && <Text style={styles.place}>{this.props.showOrigin}</Text>}
          {withButton && <View>
            {this.props.showDestinations.map(i => (<Text key={i.key} style={{padding: 10}}>{i.name}</Text>))}
          </View>}
        </View>}
        {animated && <View>
          <TextInput
            placeholder={placeholder}
            onChangeText={this._onChangeText}
            value={text}
            style={styles.input}
            />
          {(autoComplete.map((i, ix) => {
            if (i.indexOf(this.state.text) !== -1 && cnt < 5 && this.state.text !== i && this.state.text.length != 0) {
              cnt++;
              return <Autocomplete key={ix} onClick={this._onChangeText} item={i}/>
            }
          }))}
          {withButton && <View style={{paddingTop: 10}}><Button
            onPress={this._onPressView}
            title='Add'
            style={styles.addButton}
            /></View>}
          {withButton && <View style={styles.destinations}>
            {this.props.destinations.map(i => <Item key={i.key} item={i} onClick={this.props.remove}/>)}
          </View>}
        </View>}
      </TouchableOpacity>
    )
  }
}
