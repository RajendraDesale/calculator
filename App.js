/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default class App extends Component {

  constructor() {
    super()
    this.state = {
      calculationText: "",
      resultText: ""
    }
    this.operators = ['Del', '/', '*', '-', '+']
  }

  buttonPressed(text) {

    if (text == '=') {
      return this.calculateResult()
    }

    this.setState({
      calculationText: this.state.calculationText + text
    })
  }

  operatorPressed(operator) {
    switch (operator) {
      case 'Del':
        let text = this.state.calculationText.split('')
        text.pop()
        this.setState({
          calculationText: text.join('')
        })
        break
      case '/':
      case '*':
      case '-':
      case '+':

        const lastChar = this.state.calculationText.split('').pop()
        if (this.operators.indexOf(lastChar) > 0) return

        if (this.state.calculationText == '') return

        this.setState({
          calculationText: this.state.calculationText + operator
        })
        break
    }
  }

  calculateResult() {
    const text = this.state.calculationText

    switch(text.slice(-1)){
      case '+':
      case '-':
      case '/':
      case '*':
        return 
    } 

    this.setState({
      resultText: eval(text)
    })
  }

  render() {

    let numberElements = []
    let numbers = [[7, 8, 9], [4, 5, 6], [1, 2, 4], ['.', 0, '=']]

    for (let i = 0; i < numbers.length; i++) {
      let numbersRow = []
      for (let j = 0; j < numbers[i].length; j++) {

        numbersRow.push(
          <TouchableOpacity key={numbers[i][j]} style={styles.btn}
            onPress={ () => this.buttonPressed(numbers[i][j]) } >

            <Text style={styles.btnText}>
              {numbers[i][j]}
            </Text>
          </TouchableOpacity>)
      }
      numberElements.push(<View key={i} style={styles.row}>{numbersRow}</View>)
    }

    let operatorElements = []
    for (let i = 0; i < this.operators.length; i++) {
      operatorElements.push(
        <TouchableOpacity key={this.operators[i]} style={styles.operator}
          onPress={() => this.operatorPressed(this.operators[i])} >

          <Text style={styles.operatorText}>
            {this.operators[i]}
          </Text>
        </TouchableOpacity>
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.textboxContainer}>
          <View style={styles.calculation}>
            <Text style={styles.calculationText}>{this.state.calculationText}</Text>
          </View>
          <View style={styles.result}>
            <Text style={styles.resultText}>{this.state.resultText}</Text>
          </View>
        </View>
        <View style={styles.controlButton}>
          <View style={styles.numbers}>
            {numberElements}
          </View>
          <View style={styles.operator}>
            {operatorElements}
          </View>
          <View style={styles.sign}>

          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textboxContainer: {
    flex: 2,
    borderColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,

    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.3,
    shadowRadius: 6,

    elevation: 10,
  },
  calculation: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  calculationText: {
    fontSize: 30,
    color: 'black',
  },
  result: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  resultText: {
    fontSize: 24,
    color: 'black',
  },
  controlButton: {
    flex: 5,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  numbers: {
    flex: 70,
    backgroundColor: 'white',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 30,
    color: 'black',
  },
  operator: {
    flex: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
    borderLeftColor: '#bbb',
    borderLeftWidth: StyleSheet.hairlineWidth,
  },
  operatorText: {
    fontSize: 24,
    color: 'black',
  },
  sign: {
    flex: 5,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
    borderLeftColor: '#bbb',
    borderLeftWidth: StyleSheet.hairlineWidth,
  },

});

