import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { saveDeckTitle } from '../utils/api'
import { addDeck } from '../actions/index';

import { connect } from 'react-redux';
import { TitleText, SimpleTextInput, SimpleTouchableOpacity, ContainerView, ItemView } from '../style/components';


class NewDeck extends Component {

  state = {
    title: null
  }
  submit = () => {
    const { title } = this.state;
    const { dispatch } = this.props;
    const deck = { title, questions: [] };
    saveDeckTitle(deck).then(() => {
      dispatch(addDeck(deck));
      this.props.navigation.navigate('Deck', { deckTitle: deck.title, isNewDeck: true })
    });
  }

  render() {

    return (
      <ContainerView>
        <ItemView>
          <TitleText >What is the title of your new  deck?</TitleText>
          <SimpleTextInput
            onChangeText={(title) => this.setState({ title })}
            placeholder={'Deck title'}
            value={this.state.title}
          />
        </ItemView>

        <SimpleTouchableOpacity onPress={this.submit}>
          <TitleText >Submit</TitleText>
        </SimpleTouchableOpacity>


      </ContainerView >
    )
  }
}

export default connect()(NewDeck)