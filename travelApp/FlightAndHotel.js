import React from 'react';
import {Text, TouchableOpacity, View, TextInput, StyleSheet, Button} from 'react-native';
import {styles} from './styles';
import Item from './Item';
import {autoComplete} from './constants';
import Autocomplete from './Autocomplete'
import {cities} from './constants';

let cnt = 0;

export default class FlightAndHotel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hotels: false,
      allHotels: []
    }
    this.timeConverter = this.timeConverter.bind(this);
  }

  timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

  componentDidMount() {
    const{item, budget, currency} = this.props;
    const {price} = item;

    fetch('https://dev-sandbox-api.airhob.com/sandboxapi/stays/v1/search/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'City': item.cityTo,
        'Country': item.countryTo.name,
        'ClientNationality': 'KZ',
        'Latitude': '',
        'Longitude': '',
        'FromDate': '2018-11-20',
        'ToDate': '2018-11-30',
        'Currency': currency,
        'IsAddress': false,
        'IsDescription': false,
        'IsFacility': false,
        'Occupancies': [{
          'NoOfAdults': this.props.passangers
        }]
      }),
    })
    .then(resp => (resp.json()))
    .then(data => {
      if(data.hotelData && data.hotelData.price.minval + price <= budget){
        let cur = this.state.allHotels.slice();
        cur.push(data.hotelData);
        this.setState({
          hotels: true,
          allHotels: cur
        })
      }
    })
  }
  render(){
    const{item, budget, currency, destinations, origin} = this.props;
    const curPlace = origin.split(' ');
    const myPlace = curPlace.length > 2 ? curPlace[0] + ' ' + curPlace[1] : curPlace[0];
    const {price} = item;
    const {hotels, allHotels} = this.state;
    const dest = [];
    destinations.map(d => {
      let cur = d.name.split(' ');
      if (cur.length > 2){
        let cur = `${cur[0]} ${cur[1]}`;
        dest.push(cur.split(',')[0])
      } else {
        dest.push(cur[0].split(',')[0])
      }
    })
    const show = (!dest.length) || (dest.indexOf(item.cityTo) !== -1)

    return (
      <View>
        {!hotels && show &&  <View style={styles.results}>
          <Text style={{padding: 6, fontSize: 20}}>Price: {item.price} {currency}</Text>
          <Text style={{textAlign: 'center', fontSize: 14, paddingTop: 10}}>{myPlace.split(',')[0]} - {item.cityTo}</Text>
          <Text style={{textAlign: 'center', fontSize: 16}}>{this.timeConverter(item.dTimeUTC)} - {this.timeConverter(item.aTimeUTC)}</Text>
        </View>}
        {allHotels.map((h, i) => {
          return (
            <View key={i} style={styles.results}>
              <Text>{h.fullName}</Text>
            </View>
          )
        })}
      </View>
    )
  }
}
