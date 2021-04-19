import { configureStore } from '@reduxjs/toolkit'
import appStateReducer from './reducer'
import { updateVersion } from './actions'

const store = configureStore({
    reducer: {
        appState: appStateReducer
    }
})

store.dispatch(updateVersion())

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch