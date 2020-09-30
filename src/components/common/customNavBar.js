import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {Actions} from 'react-native-router-flux';

const CustomNavBar = (props) => {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={[styles.navBarContainer, props.navigationBarStyle]}>
        <View style={{flex: 1}}>
          {!props.hideBackButton && (
            <TouchableOpacity onPress={() => Actions.pop()}>
              <Image
                source={require('../../assets/images/back-arrow.png')}
                style={styles.backArrowImage}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={{flex: 3}}>
          <Text style={props.titleStyle}>{props.title}</Text>
        </View>
        <View style={{flex: 1}} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    backgroundColor: '#3f51b5',
  },
  navBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
  },
  backArrowImage: {
    resizeMode: 'contain',
    flexDirection: 'row',
    width: 32,
    height: 32,
    left: 15,
    justifyContent: 'flex-start',
  },
});

export default CustomNavBar;
