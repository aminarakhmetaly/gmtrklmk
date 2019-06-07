import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
  StatusBar} from 'react-native';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      text: ''
    };
  }

  _onPressView(){
    Alert.alert(dest);
  }

  _textChanged = e => {
    this.setState({text: e.target.value})
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.statusBar}/>
        <View 
          style={styles.containers}
          onPress={()=>(this._onPressView)}>
          <Text>From</Text>
        </View>
        <TouchableOpacity style={styles.containers}
          onPress={this._onPressView}
          >
          <Text>To</Text>
        </TouchableOpacity>
        <TextInput
          placeholder='Hello'
          onChange={this._textChanged}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  containers: {
    flex: 2,
    flexDirection: 'row',
    height: 100,
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid'
  },
  statusBar: {
    backgroundColor: 'blue',
    height: 20
  }
});
