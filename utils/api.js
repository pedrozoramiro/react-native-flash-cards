import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY,NOTIFICATION_KEY } from './Constants'
import { Notifications, Permissions } from 'expo'

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



  
export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: 'Answer the quiz today!',
    body: "Don't forget to answer the quiz today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })}