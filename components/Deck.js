import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { gray } from '../utils/colors'
import { connect } from 'react-redux';
import { TitleText, ContainerView, SubTitleText, SimpleTouchableOpacity, ItemView } from '../style/components';



class Deck extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.deckTitle,
  });

  render() {

    const { deck , navigation} = this.props;
    return (
      <ContainerView>
        <ItemView>
          <TitleText>Card {deck.title}</TitleText>
          <SubTitleText>{deck.questions ? deck.questions.length : 0} cards</SubTitleText>
        </ItemView>
        <ItemView>
          <SimpleTouchableOpacity onPress={() => navigation.navigate('NewCard', { deck })}>
            <TitleText>Create New Question</TitleText>
          </SimpleTouchableOpacity>
          <SimpleTouchableOpacity onPress={() => navigation.navigate('Quiz', { deck })}>
            <TitleText>Start a Quiz</TitleText>
          </SimpleTouchableOpacity>
        </ItemView>
      </ContainerView>
    )
  }
}

function mapStateToProps(decks, props) {
  const { deckTitle } = props.navigation.state.params;
  return {
    deck: decks[deckTitle]
  }
}

export default connect(mapStateToProps)(Deck)