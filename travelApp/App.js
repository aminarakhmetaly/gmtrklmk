import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Button,
  FlatList,
  Platform,
  Picker,
  Switch} from 'react-native';
import LCard from './Card';
import {styles} from './styles';
import CalendarPicker from 'react-native-calendar-picker';
import {Divider} from 'react-native-elements';
import {numbers, currencies, months, countries, url} from './constants';
import FlightAndHotel from './FlightAndHotel';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';

let temp = 0;

export default class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      text: '', 
      row: true,
      visOne: true,
      visTwo: true,
      selectedStartDate: null,
      selectedEndDate: null,
      showStartDate: false,
      showEndDate: false,
      budget: '0',
      editBudget: false,
      passangers: '1',
      currency: 'EUR',
      origin: 'Almaty, ALA',
      destinations: [],
      ans: [],
      query: '',
      showOrigin: 'ALA',
      showDestinations: [],
      switch: false,
      loading: false
    };

    this._makeData = this._makeData.bind(this);
    this.getData = this.getData.bind(this);
  };

  _originChanged = (text) => {
    const cur = text.split(' ');
    this.setState({origin: text, showOrigin: cur[cur.length - 1], ans:[]})
  }

  _changeSwitch = () => {
    this.setState({switch: !this.state.switch, ans: []})
  }

  _destinationsChanged = (dest) => {
    let curDestination = this.state.destinations.slice();
    let curShowDest = this.state.showDestinations.slice();
    const data = {
      key: curDestination.length,
      name: dest
    }

    let sz = dest.split(' ').length;
    const showData = {
      key: curDestination.length,
      name: dest.split(' ')[sz - 1]
    }

    curDestination.push(data);
    curShowDest.push(showData);

    this.setState({
      destinations: curDestination,
      showDestinations: curShowDest,
      ans: []
    })
  }

  _destChanged = (text) => {
    this.setState({dest: text, ans: []})
  }

  _onStartDateChange = (date) => {
    this.setState({
      selectedStartDate: date,
      ans: []
    });
  }

  _onEndDateChange = (date) => {
    this.setState({
      selectedEndDate: date,
      ans: []
    });
  }

  _cardClicked = (id) => {
    if (id === 1) {
      this.setState({visTwo: !this.state.visTwo, ans: []});
    } else {
      this.setState({visOne: !this.state.visOne, ans: []});
    }
  }

  _showStart = () => {
    this.setState({showStartDate: true, ans: []})
  }

  _showEnd = () => {
    this.setState({showEndDate: true, ans: []})
  }

  _scrollPressed = () => {
    this.setState({
      showStartDate: false,
      showEndDate: false,
      animated: false,
      editBudget: false
    })
  }

  _makeData(data) {
    const cur = data.split(' ');
    return `${cur[2]} ${cur[1]}`;
  }

  _changeBudget = () => {
    this.setState({editBudget: !this.state.editBudget, ans: []})
  }

  _editBudget = (text) => {
    this.setState({
      budget: text,
      ans: []
    })
  }

  getData(date) {
    const cur = date.toLocaleString().split(' ');
    return `${cur[2]}/${months[cur[1]]}/${cur[3]}`;
  }

  _search = () => {
    this.setState({loading: true});
    const {origin, selectedStartDate, selectedEndDate, currency} = this.state;
    const fromDay = this.getData(selectedStartDate);
    const toDay = this.getData(selectedEndDate);
    const sz = origin.split(' ');
    const place = countries[this.state.showOrigin];

    const url = `https://api.skypicker.com/flights?fly_from=${place}&date_from=${fromDay}&date_to=${toDay}&curr=${currency}&price_from=1&price_to=${parseInt(this.state.budget)/this.state.passangers}&flight_type=round`
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => (resp.json()))
    .then(data => {
      this.setState({ans: data.data, loading: false});
    })
  }

  _remove = (item) => {
    let cur = this.state.destinations.slice();
    let curCode = this.state.destinations.slice();
    const ix = cur.indexOf(item);
    const arr = item.name.split(' ');
    if (arr){
      const ix2 = curCode.indexOf(arr[arr.length - 1]);
      curCode.splice(ix2, 1);
    }
    cur.splice(ix, 1);

    this.setState({destinations: cur, showDestinations: curCode, ans: []})
  }

  render() {
    const {
      row,
      visOne,
      visTwo,
      showStartDate,
      showEndDate,
      selectedStartDate,
      selectedEndDate,
      budget,
      editBudget,
      passangers,
      currency,
      origin,
      destinations,
      showDestinations} = this.state;

    return (
      <ScrollView style={styles.page} onPress={this._scrollPressed}>
        <View style={styles.statusBar}/>
        <TouchableOpacity onPress={this._scrollPressed} style={{paddingTop: 20}}>
          <View style={styles.row}>
            {visOne && <LCard
              showOrigin={this.state.showOrigin}
              originChanged={this._originChanged}
              title='From'
              origin={origin}
              placeholder='Almaty, ALA'
              changeView={this._changeView}
              id={1}
              onClick={this._cardClicked}/>}
            {visTwo && <LCard
              showDestinations={this.state.showDestinations}
              remove={this._remove}
              destinations={destinations}
              destinationsChanged={this._destinationsChanged}
              title='To'
              placeholder='Almaty, ALA'
              withButton={true}
              changeView={this._changeView}
              id={2}
              onClick={this._cardClicked}/>}
          </View>
          <View style={{height: 20}}/>
          {showStartDate && <CalendarPicker
              onDateChange={this._onStartDateChange}
              selectedStartDate={selectedStartDate}
              selectedEndDate={selectedEndDate}
            />}
          {showEndDate && <CalendarPicker
              onDateChange={this._onEndDateChange}
              selectedStartDate={selectedStartDate}
              selectedEndDate={selectedEndDate}
              allowRangeSelection={true}
            />}
          {!showEndDate && !showStartDate && <View style={styles.row}>
              <View style={styles.days}>
                <TouchableOpacity onPress={this._showStart}>
                  <Text style={styles.title}>Departure</Text>
                </TouchableOpacity>
                <Divider/>
                <Text style={styles.place}>{selectedStartDate && this._makeData(selectedStartDate.toLocaleString())}</Text>
              </View>
              <View style={styles.days}>
                <TouchableOpacity onPress={this._showEnd}>
                  <Text style={styles.title}>Return</Text>
                </TouchableOpacity>
                <Divider/>
                <Text style={styles.place}>{selectedEndDate && this._makeData(selectedEndDate.toLocaleString())}</Text>
              </View>
          </View>}
          <View style={editBudget ? styles.optionsClm : styles.optionsRow}>
            {!editBudget && <View style={styles.days}>
              <TouchableOpacity onPress={this._changeBudget} >
                <Text style={styles.title}>Budget</Text>
              </TouchableOpacity>
              <Divider/>
              <View style={styles.optionsRow}>
                <Text style={styles.budgetNum}>{budget}</Text>
                <Text style={styles.budgetNum}>{currency}</Text>
              </View>
            </View>}
            {editBudget && <View style={styles.budget}>
              <TouchableOpacity onPress={this._changeBudget} >
                <Text style={styles.title}>Budget</Text>
              </TouchableOpacity>
              <Divider/>
              <TextInput
                style={styles.input}
                onChangeText={this._editBudget}
                value={budget}
                />
              <Picker
                selectedValue={this.state.currency}
                onValueChange={itemValue => this.setState({currency: itemValue })}>
                {currencies.map((i, index) => (
                  <Picker.Item key={index} label={i.label} value={i.value} />
                ))}
              </Picker>
            </View>}
            <View style={styles.days}>
              <Text style={styles.title}>Passangers</Text>
              <Divider/>
              <Picker
                selectedValue={this.state.passangers}
                onValueChange={itemValue => this.setState({passangers: itemValue })}>
                {numbers.map((i, index) => (
                  <Picker.Item key={index} label={i.label} value={i.value} />
                ))}
              </Picker>
            </View>
          </View>
          {this.state.loading && <View style={{marginLeft: 140}}><Bubbles size={12} color="#fff"/></View>}
          <View style={styles.row2}>
            <Text style={{fontSize: 18, paddingRight: 10}}>Only flights</Text>
            <Switch onValueChange={this._changeSwitch} value={this.state.switch}/>
          </View>
          <View style={{padding: 20}}>
            <Button
              style={styles.button}
              title="Search"
              onPress={this._search}
              />
          </View>
          <View>
            {this.state.ans.map((item, ix) => {
              return (<FlightAndHotel key={ix} item={item} budget={budget} origin={origin} currency={currency} destinations={destinations} passangers={passangers}/>)
            })}
          </View>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

