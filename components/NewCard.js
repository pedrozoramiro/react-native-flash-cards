import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { addCardToDeck } from '../utils/api'
import { addCard } from '../actions/index';
import { connect } from 'react-redux';


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
            <View>
                <TextInput
                    style={{ height: 100, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(question) => this.setState({ question })}
                    placeholder={'Question'}
                    value={this.state.question}
                />
                <TextInput
                    style={{ height: 100, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(answer) => this.setState({ answer })}
                    placeholder={'Answer'}
                    value={this.state.answer}
                />

                <TouchableOpacity onPress={this.submit}>
                    <Text style={{ fontSize: 24, textAlign: 'center' }}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default connect()(NewCard)
