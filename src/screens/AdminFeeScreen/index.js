import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';

// Components
import CustomLoader from 'components/CustomLoader';
import ScreenHeader from 'components/ScreenHeader';
import DetailListComponent from 'components/DetailListComponent';

// Icons
import ic_fee from 'assets/icons/ic_fee.png';

// API
import {connect} from 'react-redux';
import {adminOperations, adminSelectors} from 'idsStore/data/admin';

class AdminFeeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      pendingFees: null,
      feesCollection: null,
      status: null,
    };
  }

  componentDidMount() {
    this.fetchFeesInfo();
  }

  fetchFeesInfo = async () => {
    try {
      // processing response
      await this.props.getFeesCollection();
      const response = this.props.isGetFeesCollection;
      if (response) {
        const {success} = response;

        if (success === 1) {
          const {output: feesCollection} = response;
          const {pendingFees} = feesCollection;
          delete feesCollection.pendingFees;

          this.setState({
            pendingFees,
            feesCollection,
            status: null,
            isLoading: false,
          });
        } else {
          const {message: status} = response;
          this.setState({
            status,
            pendingFees: null,
            feesCollection: null,
            isLoading: false,
          });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  renderFeesInfo = () => {
    const {feesCollection} = this.state;
    // console.log('######', feesCollection);
    const keys = Object.keys(feesCollection);

    const elementsToRender = keys.map((key, index) => {
      const item = feesCollection[key];
      // console.log('111111', item);
      const {total, cash, cheque, dd, card, netbanking} = item;

      const titleArr = ['Total', 'Cash', 'Cheque', 'DD', 'Card', 'Net Banking'];
      const infoArr = [total, cash, cheque, dd, card, netbanking];

      return (
        <View style={styles.dateSheetContainer} key={index}>
          {key === 'Today' ? (
            <Text style={styles.noticeHeading}>Fees Collected {key}:</Text>
          ) : (
            <Text style={styles.noticeHeading}>Fees Collected This {key}:</Text>
          )}

          <DetailListComponent
            titleArr={titleArr}
            infoArr={infoArr}
            skipContainerStyle
          />
        </View>
      );
    });

    return (
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        {elementsToRender}
      </ScrollView>
    );
  };

  render() {
    const {isLoading} = this.state;
    if (isLoading) {
      return <CustomLoader />;
    }

    const {pendingFees, status} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <ScreenHeader title="Fees" showSchoolLogo nav={this.props.navigation} />

        {status ? (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{status}</Text>
          </View>
        ) : (
          <View style={styles.feeInnerContent}>
            <View style={styles.totalPaidFeeDisplay}>
              <View style={styles.totalPaidFeeAmount}>
                <Image
                  style={styles.totalPaidFeeIcon}
                  source={ic_fee}
                  resizeMode="cover"
                />
                <Text style={styles.totalPaidFeeValue}>{pendingFees}/-</Text>
              </View>

              {/* <Text style={styles.paidFeeTitle}>Pending Fees</Text> */}
            </View>

            {this.renderFeesInfo()}
          </View>
        )}
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  isGetFeesCollection: adminSelectors.isGetFeesCollection(state),
});
const mapDispatchToProps = {
  getFeesCollection: adminOperations.getFeesCollection,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminFeeScreen);
