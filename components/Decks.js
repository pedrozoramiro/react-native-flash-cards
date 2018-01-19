import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { getDecks } from '../utils/api'
import { ShadowView } from '../style/components';
import { NavigationActions } from 'react-navigation'
import {gray} from '../utils/colors'
import { receiveDecks } from '../actions'
import { connect } from 'react-redux';



class Decks extends Component {

  state = {
    decks: null,
    ready: false
  }

  componentDidMount() {
    const { dispatch } = this.props;
    getDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ ready: true })))
  }

  render() {
    const { decks } = this.props;
    return (
      <View>
        <Text>
          {JSON.stringify(decks)}
          </Text>
        {decks ? Object.keys(decks).map((key) => {
          const deck = decks[key];
          return (
            <ShadowView key={key}>
              <TouchableOpacity onPress={()=> this.props.navigation.navigate('Deck',{deck})}>
                <Text style={{ fontSize: 24, textAlign: 'center' }}>{deck.title}</Text>
                <Text style={{ fontSize: 18, textAlign: 'center', color: gray }}>{deck.questions ? deck.questions.length : 0} cards</Text>
              </TouchableOpacity>
            </ShadowView>)
        }) : 
        
        <Text style={{ fontSize: 24, textAlign: 'center' }}>ss</Text>
        
        }
      </View>
    )
  }
}

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(Decks)