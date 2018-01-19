/*
getDecks: retorna todos os baralhos com seus títulos, perguntas, e respostas. 
getDeck: dado um único argumento id, ele retorna o baralho associado àquele id. 

saveDeckTitle: dado um único argumento title, ele adiciona-o aos baralhos. 
addCardToDeck: dado dois argumentos, title e card, ele adiciona o cartão à lista de perguntas ao baralho com o título associado.  */


import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY } from './Constants'


export function formatCalendarResults (results) {
  return results  === null
    ? null
    : JSON.parse(results)
}


export function getDecks () {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(formatCalendarResults)
}

export function getDeck (id) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
      .then(mockdata[id]);
  }

export function addCardToDeck ( title, card) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
  .then((results) => {
    const data = JSON.parse(results)
    const deck = data[title];
    deck.questions = deck.questions || [];
    deck.questions.push(card);
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
  })



  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [title]: entry
  }))
}

export function saveDeckTitle ({ title }) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
      [title]: {title}
    }))
  }