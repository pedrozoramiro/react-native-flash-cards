import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { addCardToDeck } from '../utils/api'
import { addCard } from '../actions/index';
import { connect } from 'react-redux';
import { SimpleTextInput, TitleText, SimpleTouchableOpacity, ContainerView, ItemView } from '../style/components';


class NewCard extends Component {

    state = {
        question: null,
        answer: null,
    }
    static navigationOptions = ({ navigation }) => ({
        title: 'Add Card',
    });

    submit = () => {
        const { question, answer } = this.state;
        const { deck, isNewDeck } = this.props.navigation.state.params;
        const { dispatch, navigation } = this.props;
        const card = { question, answer };
        if (!question || !answer) { 
            return; 
        }
        addCardToDeck(deck.title, card).then((results) => {
            dispatch(addCard(deck.title, card));
            if (isNewDeck) {
                navigation.navigate('Deck', { deckTitle: deck.title });
                navigation.dispatch(NavigationActions.reset());
                return;
            }
            navigation.dispatch(NavigationActions.back());
        });
    }

    render() {

        return (
            <ContainerView>
                <ItemView>
                    <TitleText style={{ textAlign: 'left' }}>Question</TitleText>
                    <SimpleTextInput
                        onChangeText={(question) => this.setState({ question })}
                        placeholder={'What is a component ?'}
                        value={this.state.question}
                    />
                    <TitleText style={{ textAlign: 'left' }} >Answer</TitleText>
                    <SimpleTextInput
                        onChangeText={(answer) => this.setState({ answer })}
                        placeholder={'Components let you split the UI into independent'}
                        value={this.state.answer}
                    />
                </ItemView>
                <SimpleTouchableOpacity onPress={this.submit}>
                    <TitleText >Submit</TitleText>
                </SimpleTouchableOpacity>
            </ContainerView>
        )
    }
}

export default connect()(NewCard)
