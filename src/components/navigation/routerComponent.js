import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Scene, Router} from 'react-native-router-flux';

import BillsListView from '../screen/billsListView';
import BillDetailsView from '../screen/billDetailsView';
import CustomNavBar from '../common/customNavBar';

class RouterComponent extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene
            key="billsList"
            component={BillsListView}
            title="Bills List Screen"
            titleStyle={styles.title}
            backButtonTintColor="#fff"
            hideBackButton={true}
            initial
            navBar={CustomNavBar}
          />
          <Scene
            key="billDetails"
            component={BillDetailsView}
            title="Bill Details Screen"
            titleStyle={styles.title}
            backButtonTintColor="#fff"
            navBar={CustomNavBar}
          />
        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1f1f1f',
    height: 54,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default RouterComponent;
