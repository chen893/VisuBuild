import { configureStore } from '@reduxjs/toolkit'
import editorReducer from './editor'
// import createSagaMiddleware from 'redux-saga'
// import rootSaga from './rootSaga'
// import middleware from './middleware'
// const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: {
    editor: editorReducer
  }
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(middleware, sagaMiddleware)
})

// sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
