import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose,
} from 'redux'
import thunk from 'redux-thunk'
import { global } from '@/pages/global/redux'
import { userLogin } from '@/pages/home/redux'


const store = createStore(
  combineReducers({
    global,
    userLogin,
  }),
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
)

export default store
