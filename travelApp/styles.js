import React from 'react';
import {StyleSheet} from 'react-native';

export const styles= StyleSheet.create({
  animated: {
    flex: 1,
    height: 'auto',
    paddingLeft: 8,
    paddingRight: 8
  },
  notanimated: {
    flex: 1,
    height: 'auto',
    minHeight: 72,
    borderLeftWidth: 1,
    borderLeftColor: '#D7D8DA',
    paddingLeft: 8,
    paddingRight: 8
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#D7D8DA',
    marginTop: 10,
    height: 40,
    fontSize: 18
  },
  place: {
    fontSize: 36,
    color: '#0E1432',
    fontWeight: 'bold',
    padding: 5,
    paddingTop: 12
  },
  destinations: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  page: {
    backgroundColor: '#ECEDEE'
  },
  page2: {
    padding: 10
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
    height: 'auto'
  },
  statusBar: {
    height: 24,
    backgroundColor: '#000'
  },
  days: {
    height: 90,
    backgroundColor: '#fff',
    paddingLeft: 8,
    paddingRight: 8,
    width: 160,
    borderRadius: 4,
    shadowOffset:{  width: 6,  height: 6,  },
    shadowColor: '#d9d9d9',
    shadowOpacity: 1.0,
  },
  title: {
    color: '#92A0BA',
    fontSize: 14,
    marginBottom: 5,
    paddingTop: 5
  },
  optionsRow: {
    padding: 8,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  optionsClm: {
    padding: 8,
    flex: 1,
    flexDirection: 'column'
  },
  budget: {
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 4,
    shadowOffset:{  width: 6,  height: 6,  },
    shadowColor: '#d9d9d9',
    shadowOpacity: 1.0,
    marginBottom: 10
  },
  budgetNum: {
    fontSize: 18
  },
  addButton: {
    backgroundColor: 'blue',
    height: 30,
    width: 60,
    marginTop: 10
  },
  button: {
    backgroundColor: 'blue',
    height: 30,
    width: 20,
    margin: 10,
    marginTop: 20
  },
  results: {
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 4,
    shadowOffset:{  width: 6,  height: 6,  },
    shadowColor: '#d9d9d9',
    shadowOpacity: 1.0,
    marginBottom: 10,
    flex: 1,
    height: 140,
    margin: 'auto'
  },
  row2: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    height: 'auto'
  }
});