import { EventEmitter } from './utils/EventEmitter.js'
import { createObservableProxy } from './utils/ObservableProxy.js'

class ObservableAppState extends EventEmitter {

  user = null
  /**@type {import('./models/Account.js').Account | null} */
  account = null

  // NOTE we are storing POJOs in here for today, since the data is so minimal
  /**
   * @type {object[]}
   */
  dndSpells = []
}

export const AppState = createObservableProxy(new ObservableAppState())