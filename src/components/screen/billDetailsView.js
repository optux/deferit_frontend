import React, {Component} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {Card, Image, Tooltip} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';

import {updateTooltipText} from './../../actions';

class BillDetailsView extends Component {
  state = {
    fullDesc: null,
  };

  _onStatusPress = (status) => {
    this.props.updateTooltipText(status);
  };

  render() {
    const {bills} = this.props;
    const bill = bills.fetchedList.find((item) => item.id === bills.selectedId);
    const {description, original_url, due_date, amount, status} = bill;
    const dueDate = new Date(due_date);
    return (
      <View style={styles.billContainer}>
        <Card style={styles.cardContainer}>
          <Card.Title>{description}</Card.Title>
          {/* while the image is loading, activity indicator will be visiable */}
          <Image
            style={styles.image}
            source={{uri: original_url}}
            PlaceholderContent={
              <ActivityIndicator size="large" color="#03a9f4" />
            }
          />
          <Card.Divider />
          <View style={styles.cardWrapper}>
            <View style={{flex: 3}}>
              <Text style={styles.text}>Due on : </Text>
              <Text style={styles.text}>Amount : </Text>
              <Text style={styles.text}>Current Status : </Text>
            </View>
            <View style={{flex: 5}}>
              <Text style={styles.text}>
                {dueDate.toLocaleDateString('en-GB')}
              </Text>
              <Text style={styles.text}>{`$ ${amount}`}</Text>
              <Tooltip
                skipAndroidStatusBar
                popover={
                  <Text style={styles.tooltipText}>
                    {this.props.bills.tooltipText}
                  </Text>
                }
                height={120}
                width={240}
                onOpen={() => this._onStatusPress(status)}>
                <View style={styles.detailStatus}>
                  <Text style={styles.text}>{status}</Text>
                  <Icon
                    name={'help-box'}
                    size={22}
                    color={'#000'}
                    style={styles.icon}
                  />
                </View>
              </Tooltip>
            </View>
          </View>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  billContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardContainer: {
    backgroundColor: '#ededed',
  },
  cardWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  tooltipContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  tooltipText: {
    paddingHorizontal: 10,
    fontSize: 12,
    color: '#fff',
  },
  image: {
    width: 320,
    height: 480,
  },
  detail: {
    flexDirection: 'row',
    paddingBottom: 5,
  },
  detailStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
  },
  text: {
    paddingLeft: 5,
    paddingBottom: 3,
    paddingRight: 3,
  },
  icon: {
    backgroundColor: 'transparent',
  },
});

const mapStateToProps = (state) => {
  return {bills: state.bills};
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTooltipText: (status) => dispatch(updateTooltipText(status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BillDetailsView);
