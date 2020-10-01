import React, {Component} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TouchableHighlight,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {Card, Tooltip, Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  getBillsList,
  updateBillSelection,
  updateTooltipText,
  updateLastViewableRecord,
  resetBillsError,
} from './../../actions';

export class BillsListView extends Component {
  constructor(props) {
    super();
    this.state = {
      isDataFetching: false,
      lastViewableRecord: -1,
    };
  }

  // react life-cycle methods
  componentDidMount() {
    this.props.getBillsList();
  }

  componentDidUpdate(prevProps, prevState) {
    // when 80% of the last record becomes viewable
    // display a toast message to notify that end of the list has been reached
    if (
      this.props.bills.error &&
      prevState.lastViewableRecord !== this.state.lastViewableRecord &&
      this.state.lastViewableRecord === this.props.bills.fetchedList.length
    ) {
      this._showToastErrorMsg();
    }
  }

  _showToastErrorMsg = () => {
    ToastAndroid.showWithGravityAndOffset(
      this.props.bills.error,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
    // reset the error record to show toast only once
    setTimeout(() => this.props.resetBillsError(), ToastAndroid.LONG);
  };

  // when the user pulls down the flatlist
  // it reloads the current page
  _onPageRefresh = () => {
    const {loading, page} = this.props.bills;
    if (!loading) {
      this.props.getBillsList(page);
    }
  };

  // when the scrolling motion passes the threshold
  // it fetches the next page if there are any
  _onEndReached = ({distanceFromEnd}) => {
    const {page, endReached} = this.props.bills;
    console.log('_onEndReached');
    if (!endReached) {
      this.props.getBillsList(page + 1);
    }
  };

  // when the user presses on the thumbnail image
  // it updates the bill id (pk) and the push the
  // screen to the bill details screen
  _onThumbnailPress = (id) => {
    this.props.updateBillSelection(id);
    Actions.push('billDetails');
  };

  // this will update the Tooltip Text.
  _showTooltip = (status = null) => {
    this.props.updateTooltipText(status);
  };

  // this callback function is used to show the
  // end of the bills list has been reached
  // that is no more records to display
  _onViewableItemsChanged = ({viewableItems}) => {
    // get the key of the last element of the viewableItems
    this.setState({
      lastViewableRecord: parseInt(viewableItems[viewableItems.length - 1].key),
    });
  };

  // this renders each bill inside a card
  _renderBill = ({item}, index) => {
    const {due_date, amount, status} = item;
    const dueDate = new Date(due_date);
    return (
      <Card
        containerStyle={styles.cardContainer}
        style={[styles.card, styles.shadow]}>
        <View style={styles.cardWrapper}>
          <View style={styles.numberContainer}>
            <Text style={styles.number}>{item.id}</Text>
          </View>
          <View style={{flex: 2}}>
            <TouchableHighlight onPress={() => this._onThumbnailPress(item.id)}>
              <Image
                source={{uri: item.thumbnail_url}}
                style={styles.image}
                PlaceholderContent={
                  <ActivityIndicator size="small" color="#03a9f4" />
                }
              />
            </TouchableHighlight>
          </View>
          <View style={[styles.detailsContainer, {flex: 4}]}>
            <View style={{flex: 3}}>
              <Text style={styles.text}>Due Date:</Text>
              <Text style={styles.text}>Amount:</Text>
              <Text style={styles.text}>Status:</Text>
            </View>
            <View style={{flex: 4}}>
              <Text style={styles.text}>
                {dueDate.toLocaleDateString('en-GB')}
              </Text>
              <Text style={styles.text}>{`$ ${amount}`}</Text>
              <View style={styles.statusContainer}>
                <Tooltip
                  skipAndroidStatusBar
                  popover={
                    <Text style={styles.tooltipText}>
                      {this.props.bills.tooltipText}
                    </Text>
                  }
                  height={120}
                  width={240}
                  onOpen={() => this._showTooltip(status)}>
                  <Text style={styles.text}>{status}</Text>
                </Tooltip>
                <Icon
                  name={'help-box'}
                  size={22}
                  color={'#000'}
                  style={styles.icon}
                />
              </View>
            </View>
          </View>
        </View>
      </Card>
    );
  };

  // this function returns the bills list using FlatList
  _renderBillsList = () => {
    const {loading, fetchedList} = this.props.bills;
    return (
      <View style={{flex: 1}} testID="bills-root">
        <FlatList
          ref={(ref) => {
            this.flatlistRef = ref;
          }}
          data={fetchedList}
          showsVerticalScrollIndicator={true}
          renderItem={({item, index}) => this._renderBill({item, index})}
          keyExtractor={(item) => String(item.id)}
          style={styles.scrollViewStyle}
          refreshControl={
            <RefreshControl
              onRefresh={this._onPageRefresh}
              refreshing={this.state.isDataFetching}
            />
          }
          onEndReachedThreshold={0.8}
          onEndReached={this._onEndReached}
          viewabilityConfig={{itemVisiblePercentThreshold: 80}}
          onViewableItemsChanged={this._onViewableItemsChanged}
        />
        {loading && <ActivityIndicator />}
      </View>
    );
  };

  // the main rendering function
  render() {
    const {bills} = this.props;
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>{this._renderBillsList()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollViewStyle: {
    flex: 1,
    paddingVertical: 5,
  },
  list: {
    paddingVertical: 15,
    justifyContent: 'flex-start',
  },
  image: {
    width: 80,
    height: 120,
  },
  cardContainer: {
    backgroundColor: '#ededed',
  },
  cardWrapper: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ededed',
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginBottom: 3,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  numberContainer: {
    width: 28,
    height: 28,
    borderRadius: 28 / 2,
    backgroundColor: '#525252',
    borderColor: '#969696',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    marginTop: 2,
    paddingBottom: 2,
  },
  number: {
    fontSize: 12,
    color: '#fff',
  },
  tooltipContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  tooltipText: {
    color: '#fff',
    paddingLeft: 8,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
  },
  text: {
    paddingTop: 2,
    paddingBottom: 8,
    paddingRight: 3,
  },
});

const mapStateToProps = (state) => {
  return {bills: state.bills};
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBillsList: (page) => dispatch(getBillsList(page)),
    updateBillSelection: (id) => dispatch(updateBillSelection(id)),
    updateTooltipText: (status) => dispatch(updateTooltipText(status)),
    resetBillsError: () => dispatch(resetBillsError()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BillsListView);
