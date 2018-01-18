import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Animated } from 'react-native'


class Quiz extends Component {
    state = {
        indexQuiz: 0,
        correctAnswerCount: 0,
        bounceValue: new Animated.Value(1),
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Quiz',
    });

    answerResult = (result) => {
        const { indexQuiz } = this.state;
        const newIndexQuiz = indexQuiz + 1;
        this.setState({ indexQuiz: newIndexQuiz });
        if (result) {
            const { correctAnswerCount } = this.state;
            this.setState({ correctAnswerCount: ++correctAnswerCount });
        }
    }

    showAnswer = (show) => {
        const { bounceValue } = this.state;
        Animated.timing(bounceValue, { duration: 200, toValue: 1.04 }).start();
    }

    renderResult() {
        const { correctAnswerCount } = this.state;
        const { deck } = this.props.navigation.state.params;
        const porcents = (correctAnswerCount * 100) / deck.questions.length;
        return (
            <View>
                <Text>
                    {porcents}%
                </Text>
                <Text >
                    You got {correctAnswerCount} card out of {deck.questions.length}
                </Text>

            </View>
        )
    }


    //todo: animacao
    render() {
        const { indexQuiz,bounceValue } = this.state;
        const { deck } = this.props.navigation.state.params;
        if (indexQuiz === deck.questions.length) {
            return this.renderResult();
        }
        const { question, answer } = deck.questions[indexQuiz];
        return (
            <View>
                <Text >
                    {question}
                </Text>
                <TouchableOpacity onPress={() => this.showAnswer(true)}>
                    <Text>answer</Text>
                </TouchableOpacity>

                <Animated.View style={{transform: [{scale: bounceValue}]}}> 
                    <Text >
                        {answer}
                    </Text>
                    <TouchableOpacity onPress={() => this.answerResult(true)}>
                        <Text style={{ fontSize: 24, textAlign: 'center' }}>Correct!</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.answerResult(false)}>
                        <Text style={{ fontSize: 24, textAlign: 'center' }}>Incorrect!</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        )
    }
}

export default Quiz;