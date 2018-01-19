import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
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
        const { deck } = this.props.navigation.state.params;
        const {dispatch} =this.props;
        const card ={question,answer} ;

        dispatch(addCard(deck.title, card));
        addCardToDeck(deck.title,card);
        this.props.navigation.navigate('Decks',{deck});
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
