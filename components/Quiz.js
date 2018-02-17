import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Animated } from 'react-native'

import { SimpleTextInput, TitleText, SimpleTouchableOpacity, ContainerView, ItemView } from '../style/components';
import { clearLocalNotification, setLocalNotification } from '../utils/api';

class Quiz extends Component {
    state = {
        indexQuiz: 0,
        correctAnswerCount: 0,
        showAnswer: false
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Quiz',
    });




    componentDidMount() {
        clearLocalNotification()
            .then(setLocalNotification)
    }

    answerResult = (result) => {
        const { indexQuiz } = this.state;
        const newIndexQuiz = indexQuiz + 1;
        this.setState({ showAnswer: false, indexQuiz: newIndexQuiz });
        if (result) {
            const { correctAnswerCount } = this.state;
            this.setState({ correctAnswerCount: ++correctAnswerCount });
        }
    }

    showAnswer = (showAnswer) => {
        this.setState({ showAnswer });
    }

    resetQuiz = () => {
        this.setState({
            indexQuiz: 0,
            correctAnswerCount: 0,
            showAnswer: false
        });
    }

    renderResult() {
        const { correctAnswerCount } = this.state;
        const { deck } = this.props.navigation.state.params;
        const porcents = (correctAnswerCount * 100) / deck.questions.length;
        return (
            <ContainerView>
                <TitleText>
                    You got {porcents}%
                </TitleText>
                <TitleText >
                    You got {correctAnswerCount} card out of {deck.questions.length}
                </TitleText>
                <SimpleTouchableOpacity onPress={() => this.resetQuiz()}>
                    <TitleText>Restart Quiz</TitleText>
                </SimpleTouchableOpacity>
            </ContainerView>
        )
    }

    render() {
        const { indexQuiz, bounceValue, showAnswer } = this.state;
        const { deck } = this.props.navigation.state.params;
        if (indexQuiz === deck.questions.length) {
            return this.renderResult();
        }
        const { question, answer } = deck.questions[indexQuiz];
        return (
            <ContainerView>
                {!showAnswer ?
                    (<ContainerView>
                        <TitleText >
                            {question}
                        </TitleText>
                        <SimpleTouchableOpacity onPress={() => this.showAnswer(true)}>
                            <TitleText>answer</TitleText>
                        </SimpleTouchableOpacity>
                    </ContainerView>)
                    : (<ContainerView>
                        <TitleText >
                            {answer}
                        </TitleText>
                        <ItemView>
                            <SimpleTouchableOpacity onPress={() => this.answerResult(true)}>
                                <TitleText>Correct!</TitleText>
                            </SimpleTouchableOpacity>
                            <SimpleTouchableOpacity onPress={() => this.answerResult(false)}>
                                <TitleText>Incorrect!</TitleText>
                            </SimpleTouchableOpacity>
                        </ItemView>
                    </ContainerView>)
                }
            </ContainerView>
        )
    }
}

export default Quiz;