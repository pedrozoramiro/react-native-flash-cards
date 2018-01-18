import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import {gray} from '../utils/colors'



class Deck extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.deck.title,
  });

  render() {
    
    const { deck } = this.props.navigation.state.params;
    return (
      <View>
            <Text style={{ fontSize: 24, textAlign: 'center' }}>{deck.title}</Text>
            <Text style={{ fontSize: 18, textAlign: 'center', color: gray }}>{deck.questions.length} cards</Text>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('NewCard',{deck})}>
                <Text style={{ fontSize: 24, textAlign: 'center' }}>Add Card</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Quiz',{deck})}>
                <Text style={{ fontSize: 24, textAlign: 'center' }}>Start Quiz</Text>
            </TouchableOpacity>
      </View>
    )
  }
}

export default Deck;