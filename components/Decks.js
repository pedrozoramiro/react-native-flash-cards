import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { getDecks } from '../utils/api'
import { ShadowView, TitleText, SubTitleText } from '../style/components';
import { NavigationActions } from 'react-navigation'
import {gray} from '../utils/colors'
import { receiveDecks } from '../actions'
import { connect } from 'react-redux';



class Decks extends Component {

  state = {
    decks: [],
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
        {decks.map((deck) => {
          return (
            <ShadowView key={deck.title}>
              <TouchableOpacity onPress={()=> this.props.navigation.navigate('Deck',{deckTitle:deck.title})}>
              <TitleText>{deck.title}</TitleText>
               <SubTitleText>{deck.questions ? deck.questions.length : 0} cards</SubTitleText>
              </TouchableOpacity>
            </ShadowView>)
        })}
      </View>
    )
  }
}

function mapStateToProps (decks) {
  return {
    decks : Object.keys(decks).map((key) =>  decks[key]) 
  }
}

export default connect(mapStateToProps)(Decks)