import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { saveDeckTitle } from '../utils/api'
import { addDeck } from '../actions/index';

import { connect } from 'react-redux';


class NewDeck extends Component {

  state = {
    title: null
  }
  submit = () => {
    const { title } = this.state;
    const { dispatch } = this.props;
    const deck = {title,questions:[]};
    saveDeckTitle(deck) .then(() => {
      dispatch(addDeck(deck));
      this.props.navigation.navigate('Deck',{deckTitle:deck.title,isNewDeck:true})
    });  
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

export default connect()(NewDeck)