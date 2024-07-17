import React, {Component} from 'react';
import {Text, View, Alert, FlatList, TouchableOpacity} from 'react-native';

import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';

// Components
import ScreenHeader from 'components/ScreenHeader';
import StudentAssignmentItem from 'components/StudentAssignmentItem';
import CustomLoader from 'components/CustomLoader';
import DateTimePicker from '@react-native-community/datetimepicker';

// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';
// API
import {connect} from 'react-redux';
import {studentOperations, studentSelectors} from 'idsStore/data/student';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import {log} from 'react-native-reanimated';
import DetailList from 'components/DetailList';
import StudentAssignmentItem2 from 'components/StudentAssignmentItem2';
import {widthPercentageToDP} from 'react-native-responsive-screen';

class StudentAssignmentScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      infoArr: null,
      infoArr2: null,
      status: null,
      isListRefreshing: false,
      connectionState: true,
      selectedDate: null, // Initialize selectedDate to null
    };

    console.log('@#@@@@@@ from', this.state.selectedDate);

    this.titleArr = ['Subject', 'Description', 'Given By', 'end_date'];
    this.titleArr2 = ['Subject', 'Description', 'Given By', 'end_date'];
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
    // subscribing to didFocus listener
    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      () => {
        this.fetchAssignments();
      },
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
    // unsubscribing from didFocus listener
    this.didFocusSubscription.remove();
  }

  // fetchAssignments = async () => {
  //   try {
  //     // starting loader
  //     this.setState({isLoading: true});

  //     // calling api
  //     await this.props.getStudentAssignment();
  //     const response = this.props.isGetStudentAssignment;
  //     if (this.state.connectionState === true) {
  //       if (response !== null) {
  //         if (response.success === 1) {
  //           const assignments = response.output;
  //           let infoArr = [];

  //           for (const assignment of assignments) {
  //             infoArr.push({
  //               info: [
  //                 assignment.subject,
  //                 assignment.created,
  //                 assignment.end_date,
  //                 assignment.description,
  //                 assignment.teacherName,
  //               ],
  //               file: assignment.file,
  //             });
  //           }

  //           this.setState({infoArr, isLoading: false, isListRefreshing: false});
  //         } else if (response.success === 0) {
  //           const status = response.message;
  //           //Alert.alert('', response.message);
  //           this.setState({
  //             status,
  //             infoArr: null,
  //             isLoading: false,
  //             isListRefreshing: false,
  //           });
  //         }
  //       } else {
  //         const status = 'Server Issues';
  //         //Alert.alert('', response.message);
  //         this.setState({
  //           status,
  //           infoArr: null,
  //           isLoading: false,
  //           isListRefreshing: false,
  //         });
  //       }
  //     } else {
  //       this.setState({isLoading: false});
  //     }
  //   } catch (error) {
  //     Alert.alert('', error);
  //     const errMessage = error.message;
  //     console.log(errMessage);
  //   }
  // };

  fetchAssignments = async () => {
    try {
      // starting loader
      this.setState({isLoading: true});

      // calling api
      await this.props.getStudentAssignment(this.state.selectedDate);
      const response = this.props.isGetStudentAssignment;

      if (this.state.connectionState === true) {
        if (response !== null) {
          if (response.success === 1) {
            const assignments = response.output;
            let infoArr = [];

            for (const assignment of assignments) {
              infoArr.push({
                info: [
                  assignment.subject,
                  assignment.description,
                  assignment.teacherName,
                  assignment.end_date,
                  this.state.date,
                ],
                file: assignment.file,
              });
            }

            this.setState({infoArr, isLoading: false, isListRefreshing: false});

            // Reset selectedDate to null after assignments are fetched
            this.setState({selectedDate: null});
          } else if (response.success === 0) {
            const status = response.message;
            console.log('====================================');
            console.log('11111', status);
            console.log('====================================');
            // Alert.alert('', response.message);
            this.setState({
              status,
              infoArr: null,
              isLoading: false,
              isListRefreshing: false,
            });
          }
        } else {
          const status = response.message;
          console.log('====================================');
          console.log('@@1111', status);
          console.log('====================================');
          // Alert.alert('', response.message);
          this.setState({
            status,
            infoArr: null,
            isLoading: false,
            isListRefreshing: false,
          });
        }
      } else {
        this.setState({isLoading: false});
      }
    } catch (error) {
      Alert.alert('', error);
      const errMessage = error.message;
      console.log(errMessage);
    }
  };

  //   try {
  //     // starting loader
  //     this.setState({isLoading: true});
  //     // calling api with selected date as parameter
  //     await this.props.getDateWiseStudentAssignment(this.state.date);
  //     const response = this.props.isGetDateWiseStudentAssignment;

  //     if (this.state.connectionState === true) {
  //       if (response !== null) {
  //         if (response.success === 1) {
  //           const assignments = response.output;
  //           console.log('====================================');
  //           console.log('@@@@re', assignments);
  //           console.log('====================================');
  //           // const date = response.date; // get the date from the API response
  //           // console.log('#######', date);
  //           let infoArr = [];

  //           for (const assignment of assignments) {
  //             infoArr.push({
  //               info: [
  //                 assignment.subject,
  //                 assignment.description,
  //                 assignment.teacherName,
  //                 assignment.end_date,
  //                 this.state.date,
  //               ],
  //               file: assignment.file,
  //             });
  //           }
  //           console.log('====================================');
  //           console.log('with vdhata', infoArr);
  //           console.log('====================================');

  //           this.setState({
  //             infoArr,
  //             isLoading: false,
  //             isListRefreshing: false,
  //           });
  //         } else if (response.success === 0) {
  //           const status = response.message;
  //           //Alert.alert('', response.message);
  //           this.setState({
  //             status,
  //             infoArr: null,
  //             isLoading: false,
  //             isListRefreshing: false,
  //           });
  //         }
  //       } else {
  //         const status = 'Server Issues';
  //         //Alert.alert('', response.message);
  //         this.setState({
  //           status,
  //           infoArr: null,
  //           isLoading: false,
  //           isListRefreshing: false,
  //         });
  //       }
  //     } else {
  //       this.setState({isLoading: false});
  //     }
  //   } catch (error) {
  //     Alert.alert('', error);
  //     const errMessage = error.message;
  //     console.log(errMessage);
  //   }
  // };

  onDateChange = (event, selectedDate) => {
    if (selectedDate) {
      this.setState({selectedDate, isDateTimePickerVisible: false}, () => {
        this.fetchAssignments();
      });
    } else {
      // If selectedDate is null, reset it to null
      this.setState(
        {selectedDate: null, isDateTimePickerVisible: false},
        () => {
          this.fetchAssignments();
        },
      );
    }
  };

  renderItem = ({item}) => (
    <StudentAssignmentItem titleArr={this.titleArr} item={item} />
  );

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  handleListRefresh = async () => {
    try {
      // pull-to-refresh
      this.setState({
        isListRefreshing: true,
        selectedDate: null, // Reset selectedDate to null
      });

      // updating list
      await this.fetchAssignments();
      await this.fetchAssignments2();
    } catch (error) {
      console.log(error.message);
    }
  };

  // renderItem2 = ({item}) => (
  //   <StudentAssignmentItem2 titleArr2={this.titleArr2} item={item} />
  // );

  render() {
    return this.state.isLoading ? (
      <CustomLoader />
    ) : (
      <SafeAreaView style={styles.container}>
        <ScreenHeader
          title="Homework"
          showSchoolLogo
          nav={this.props.navigation}
        />
        <View style={{padding: widthPercentageToDP(2)}}>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              padding: widthPercentageToDP(2),
            }}
            onPress={() => this.setState({isDateTimePickerVisible: true})}>
            <Text style={styles.datePickerText}>
              {this.state.selectedDate
                ? moment(this.state.selectedDate).format('MMMM DD, YYYY')
                : 'Select Date'}
            </Text>
          </TouchableOpacity>
        </View>
        {this.state.isDateTimePickerVisible && (
          <DateTimePicker
            value={this.state.selectedDate || new Date()}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={this.onDateChange}
          />
        )}
        {this.state.infoArr === null ? (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{this.state.status}</Text>
          </View>
        ) : (
          <FlatList
            data={this.state.infoArr}
            renderItem={({item}) => (
              <StudentAssignmentItem titleArr={this.titleArr} item={item} />
            )}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContentContainer}
            refreshing={this.state.isListRefreshing}
            onRefresh={this.fetchAssignments}
          />
        )}
        {!this.state.connectionState && (
          <View style={styles.offlineStyle}>
            <FastImage source={offline} style={styles.networkIssue} />
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  isGetStudentAssignment: studentSelectors.isGetStudentAssignment(state),
  isGetDateWiseStudentAssignment:
    studentSelectors.isGetDateWiseStudentAssignment(state),
});
const mapDispatchToProps = {
  getStudentAssignment: studentOperations.getStudentAssignment,
  getDateWiseStudentAssignment: studentOperations.getDateWiseStudentAssignment,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentAssignmentScreen);
