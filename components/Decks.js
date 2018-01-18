import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { getDecks } from '../utils/api'
import { ShadowView } from '../style/components';
import { NavigationActions } from 'react-navigation'
import {gray} from '../utils/colors'



class Decks extends Component {

  state = {
    decks: null,
    ready: false
  }

  componentDidMount() {
    getDecks()
      .then((decks) => this.setState({ decks }))
      .then(() => this.setState(() => ({ ready: true })))
  }

  render() {

    const { decks } = this.state;
    return (
      <View>
        {decks ? Object.keys(decks).map((key) => {
          const deck = decks[key];
          return (
            <ShadowView key={key}>
              <TouchableOpacity onPress={()=> this.props.navigation.navigate('Deck',{deck})}>
                <Text style={{ fontSize: 24, textAlign: 'center' }}>{deck.title}</Text>
                <Text style={{ fontSize: 18, textAlign: 'center', color: gray }}>{deck.questions.length} cards</Text>
              </TouchableOpacity>
            </ShadowView>)
        }) : 
        
        <Text style={{ fontSize: 24, textAlign: 'center' }}>ss</Text>
        
        }
      </View>
    )
  }
}

export default Decks;