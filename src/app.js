import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

import RouterComponent from './components/navigation/routerComponent';

const enhancers = [applyMiddleware(thunk)];
const composeEnhancers =
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
const store = createStore(rootReducer, composeEnhancers(...enhancers));

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.appContainer}>
        <RouterComponent />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#fff',
    color: '#000',
  },
});

export default App;
