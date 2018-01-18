import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { saveDeckTitle } from '../utils/api'


class NewDeck extends Component {

  state = {
    title: null
  }
  submit = () => {
    const { title } = this.state;
    const deck = {title};
    saveDeckTitle(deck)
    this.props.navigation.navigate('NewCard',{deck})
  }

  render() {

    return (
      <View>
        <Text style={{ fontSize: 50, textAlign: 'center' }}>What is the title of your new  deck?</Text>
        <TextInput
          style={{ height: 80, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(title) => this.setState({ title })}
          placeholder={'Deck title'}
          value={this.state.title}
        />          
        <TouchableOpacity onPress={this.submit}>
          <Text style={{ fontSize: 24, textAlign: 'center' }}>Submit</Text>
        </TouchableOpacity>
        
        
      </View>
    )
  }
}

export default NewDeck;