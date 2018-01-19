import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions'
import { List, Map, fromJS } from 'immutable'

const initialState = {
}


function decks(state = initialState, action) {
  
  switch (action.type) {
    case RECEIVE_DECKS:{
      return {
        ...state,
        ...action.decks,
      }
    }

    case ADD_DECK:{
      const stateMap = Map(state);
      const decks = stateMap.set(action.deck.title, action.deck).toJS();
        return {
          ...state,
          ...decks
        }
    }
    
    case ADD_CARD:{
      const stateJs = fromJS(state);
      const decks = stateJs.updateIn([action.deckId, 'questions'], list  => list ? list.push(action.card) : [action.card]).toJS();
      return {
        ...state,
        ...decks
      }
    }
    default:
      return state
  }
}

export default decks