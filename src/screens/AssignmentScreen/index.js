import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  Image,
  ScrollView,
  Alert,
  TouchableWithoutFeedback,
  Modal,
  Button,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {styles} from './styles';
// import DateTimePicker from 'react-native-modal-datetime-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';

// Components
import ScreenHeader from 'components/ScreenHeader';
import AssignmentItem from 'components/AssignmentItem';
import CustomLoader from 'components/CustomLoader';
import showToast from 'components/CustomToast';

// Icons
import foot_logo from 'assets/icons/calendar.png';
import calendar from 'assets/icons/calendar.png';
// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';
// API
import {connect} from 'react-redux';
import {teacherOperations, teacherSelectors} from 'idsStore/data/teacher';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import {studentOperations, studentSelectors} from 'idsStore/data/student';
import {widthPercentageToDP} from 'react-native-responsive-screen';
// import AssignmentItem2 from 'components/AssignmentItem2';
class AssignmentScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: null,
      isLoading: true,
      assignmentsData: null,
      status: null,
      isListRefreshing: false,
      connectionState: true,
      showAssignModal: false,
      selectedAssignmentId: null,
      addAssignmentButtonZIndex: 0,
      selectedDate: null, // Initialize selectedDate to null

      selectedClassId: null,
      selectedClassName: 'Select Class',
      isDateTimePickerVisible: false,

      selectedSectionId: null,
      selectedSectionName: 'Select Section',
      SelectedDate: new Date(),

      // isDateTimePickerVisible: false,972467766
      // selectedDate: 'Select Submission Date',
    };

    this.titleArr = [
      'Subject',
      'Class',
      // 'Add On',
      'Description',
      'Given by',
      'Submission Date',
    ];
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
    // subscribing to didFocus listener
    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      () => {
        if (this.addAssignmentPushed) {
          this.addAssignmentPushed = false;
          return;
        }

        this.fetchAssignments();
      },
    );
  }
  // onDateChange = (event, selectedDate) => {
  //   if (selectedDate) {
  //     this.setState({selectedDate, isDateTimePickerVisible: false}, () => {
  //       this.fetchAssignments();
  //     });
  //   } else {
  //     // If selectedDate is null, reset it to null
  //     this.setState(
  //       {selectedDate: null, isDateTimePickerVisible: false},
  //       () => {
  //         this.fetchAssignments();
  //       },
  //     );
  //   }
  // };
  componentWillUnmount() {
    this.unsubscribe();
    // unsubscribing from didFocus listener
    this.didFocusSubscription;
  }
  showDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: true});
  };

  hideDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: false});
  };
  handleDatePicked = (event, date) => {
    if (date) {
      this.setState({selectedDate: date});
    }
    this.hideDateTimePicker();
  };

  // fetchAssignments = async () => {
  //   try {
  //     // starting loader
  //     this.setState({isLoading: true});

  //     // calling api
  //     await this.props.getAssignment(this.state.date);
  //     const response = this.props.isGetAssignment;
  //     if (this.state.connectionState === true) {
  //       if (response.success === 1) {
  //         const assignments = response.output;

  //         if (assignments) {
  //           let assignmentsData = [];

  //           for (const assignment of assignments) {
  //             assignmentsData.push({
  //               id: assignment.assignment_id,
  //               classId: assignment.classid,
  //               info: [
  //                 assignment.subject,
  //                 assignment.classname + '(' + assignment.sectionname + ')',
  //                 assignment.description,
  //                 assignment.teacherName,
  //                 assignment.end_date,
  //                 this.state.date,
  //               ],
  //               file: assignment.file,
  //             });
  //           }

  //           this.setState({
  //             assignmentsData,
  //             status: null,
  //             isLoading: false,
  //             isListRefreshing: false,
  //           });
  //         } else {
  //           const status = response.message;
  //           this.setState({
  //             status,
  //             assignmentsData: null,
  //             isLoading: false,
  //             isListRefreshing: false,
  //           });
  //         }
  //       } else {
  //         //Alert.alert('', response.message);
  //         this.setState({
  //           status: response.message,
  //           assignmentsData: null,
  //           isLoading: false,
  //           isListRefreshing: false,
  //         });
  //       }
  //     } else {
  //       this.setState({isLoading: false});
  //     }
  //   } catch (error) {
  //     Alert.alert('', error);
  //     console.log(error.message);
  //   }
  // };
  fetchAssignments = async () => {
    try {
      // starting loader
      this.setState({isLoading: true});
      // // set current date if date is null
      // // setting default date to current date if not provided
      // console.log('Check data by defalult', this.state.bydefaultdate);
      // console.log('this.state.date', this.state.date);

      // if (this.state.bydefaultdate === null) {
      //   const currentDate = moment().format('YYYY-MM-DD');
      //   console.log('====================================');
      //   console.log('byderta', currentDate);
      //   console.log('====================================');
      //   this.setState({date: currentDate});
      //   this.setState({bydefaultdate: currentDate});
      // }
      // console.log('====================================');
      // console.log('byderta', this.state.bydefaultdate);
      // console.log('====================================');
      // calling api
      await this.props.getAssignment(this.state.selectedDate);
      const response = this.props.isGetAssignment;

      if (this.state.connectionState === true) {
        if (response.success === 1) {
          const assignments = response.output;

          if (assignments) {
            let assignmentsData = [];

            for (const assignment of assignments) {
              assignmentsData.push({
                id: assignment.assignment_id,
                classId: assignment.classid,
                info: [
                  assignment.subject,
                  assignment.classname + '(' + assignment.sectionname + ')',
                  assignment.description,
                  assignment.teacherName,
                  assignment.end_date,
                  this.state.date,
                ],
                file: assignment.file,
              });
            }

            this.setState({
              assignmentsData,
              status: null,
              isLoading: false,
              isListRefreshing: false,
            });
          } else {
            const status = response.message;
            console.log('====================================');
            console.log('@@@@@@', status);
            console.log('====================================');
            this.setState({
              status,
              assignmentsData: null,
              isLoading: false,
              isListRefreshing: false,
            });
          }
        } else {
          //Alert.alert('', response.message);
          this.setState({
            status: response.message,
            assignmentsData: null,
            isLoading: false,
            isListRefreshing: false,
          });
        }
      } else {
        this.setState({isLoading: false});
      }

      // check if date parameter is null
      // if (!this.state.date) {
      //   this.setState({
      //     status: 'You have not assigned any assignment',
      //     assignmentsData: null,
      //     isLoading: false,
      //     isListRefreshing: false,
      //   });
      // }
    } catch (error) {
      Alert.alert('', error);
      console.log(error.message);
    }
  };

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
  // fetchAssignments2 = async () => {
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
  //           let assignmentsData = [];

  //           for (const assignment of assignments) {
  //             assignmentsData.push({
  //               info: [
  //                 assignment.subject,
  //                 assignment.classname + '(' + assignment.sectionname + ')',
  //                 assignment.createDate,
  //                 assignment.end_date,
  //                 assignment.description,
  //                 assignment.teacherName,
  //               ],
  //               file: assignment.file,
  //             });
  //           }
  //           console.log('====================================');
  //           console.log('with vdhata', assignmentsData);
  //           console.log('====================================');

  //           this.setState({
  //             assignmentsData,
  //             isLoading: false,
  //             isListRefreshing: false,
  //           });
  //         } else if (response.success === 0) {
  //           const status = response.message;
  //           //Alert.alert('', response.message);
  //           this.setState({
  //             status,
  //             assignmentsData: null,
  //             isLoading: false,
  //             isListRefreshing: false,
  //           });
  //         }
  //       } else {
  //         const status = 'Server Issues';
  //         //Alert.alert('', response.message);
  //         this.setState({
  //           status,
  //           assignmentsData: null,
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
  handleListRefresh = async () => {
    try {
      // pull-to-refresh
      this.setState({
        isListRefreshing: true,
        selectedDate: null, // Reset selectedDate to null
        date: null,
      });

      // updating list
      await this.fetchAssignments();
      // await this.fetchAssignments2();
    } catch (error) {
      console.log(error.message);
    }
  };
  handleScreenPress = () => {
    if (this.state.showAssignModal) {
      this.setState({
        showAssignModal: false,
        addAssignmentButtonZIndex: 0,
        selectedClassId: null,
        selectedClassName: 'Select Class',
        selectedSectionId: null,
        selectedSectionName: 'Select Section',
        selectedDate: 'Select Submission Date',
        selectedAssignmentId: null,
      });
    }
  };

  showAssignModalAB = async assignmentId => {
    try {
      console.log('assignmentId', assignmentId);
      this.setState({showAssignModal: true});
      await this.props.getTeacherClassList();
      const response = this.props.isGetTeacherClassList;

      if (response.success === 1) {
        this.classesData = response.classes;
        this.classList = this.classesData.map((item, index) => (
          <Picker.Item label={item.name} value={item.name} key={index} />
        ));

        this.setState({
          addAssignmentButtonZIndex: -1,
          showAssignModal: true,
          selectedAssignmentId: assignmentId,
        });
      } else {
        //Alert.alert('', response.message);
      }
    } catch (error) {
      Alert.alert('', error);
      const errMessage = error.message;
      console.log(errMessage);
    }
  };

  renderItem = ({item}) => (
    <AssignmentItem
      item={item}
      titleArr={this.titleArr}
      refreshAssignmentsCallback={this.fetchAssignments}
      showAssignModal={this.showAssignModalAB}
      navigation={this.props.navigation}
    />
  );
  // renderItem2 = ({item}) => {
  //   <AssignmentItem2
  //     item={item}
  //     titleArr={this.titleArr}
  //     refreshAssignmentsCallback={this.fetchAssignments2}
  //     showAssignModal={this.showAssignModalAB}
  //     navigation={this.props.navigation}
  //   />;
  // };
  keyExtractor = (item, index) => item.id.toString();

  itemSeparator = () => <View style={styles.separator} />;

  onAddAssignmentClick = () => {
    this.addAssignmentPushed = true;

    this.props.navigation.push('AddAssignment', {
      refreshAssignmentsCallback: this.fetchAssignments,
    });
  };

  onClassChange = async (itemValue, itemIndex) => {
    try {
      if (itemIndex === 0) {
        // reset class detail
        this.setState({
          selectedClassId: null,
          selectedClassName: itemValue,
        });
      } else {
        const selectedClassObj = this.classesData[itemIndex - 1];
        const selectedClassId = selectedClassObj.id;

        await this.props.getSectionDetails(selectedClassId);
        const response = this.props.isGetSectionDetails;

        if (response.success === 1) {
          this.sectionsData = response.section;
          this.sectionList = this.sectionsData.map((item, index) => (
            <Picker.Item
              label={item.sectionname}
              value={item.sectionname}
              key={index}
            />
          ));

          this.setState({
            selectedClassId,
            selectedClassName: itemValue,

            selectedSectionId: null,
            selectedSectionName: 'Select Section',
          });
        }
      }
    } catch (error) {
      const errMessage = error.message;
      console.log(errMessage);
    }
  };

  onSectionChange = (itemValue, itemIndex) => {
    if (itemIndex === 0) {
      // reset section detail
      this.setState({
        selectedSectionName: itemValue,
        selectedSectionId: null,
      });
    } else {
      const selectedSectionObj = this.sectionsData[itemIndex - 1];
      const selectedSectionId = selectedSectionObj.sectionid;

      this.setState({selectedSectionName: itemValue, selectedSectionId});
    }
  };

  _showDateTimePicker = () => this.setState({isDateTimePickerVisible: true});

  _hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});

  _handleDatePicked = date => {
    const selectedDate =
      date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();

    this.setState({selectedDate});
    this._hideDateTimePicker();
  };

  resetAssignModalFilledData = () => {
    this.setState({
      // reset class detail
      selectedClassId: null,
      selectedClassName: 'Select Class',

      // reset section detail
      selectedSectionId: null,
      selectedSectionName: 'Select Section',

      // reset date detail
      selectedDate: 'Select Submission Date',

      // reset assignment detail
      selectedAssignmentId: null,
    });
  };

  handleSubmitPress = async () => {
    const {
      selectedAssignmentId,
      selectedClassId,
      selectedSectionId,
      selectedDate,
    } = this.state;
    // Closing modal
    this.setState({showAssignModal: false, addAssignmentButtonZIndex: 0});
    if (
      selectedClassId &&
      selectedSectionId &&
      selectedDate != 'Select Submission Date'
    ) {
      try {
        await this.props.assignAssignment(
          selectedAssignmentId,
          selectedClassId,
          selectedSectionId,
          selectedDate,
        );
        const response = this.props.isAssignAssignment;

        if (response.success === 1) {
          // Closing modal
          this.setState({
            showAssignModal: false,
            addAssignmentButtonZIndex: 0,
          });

          // Resetting filled modal data
          this.resetAssignModalFilledData();

          // Refreshing data
          await this.fetchAssignments();

          // Success toast
          showToast('Assignment assigned successfully!');
        }
      } catch (error) {
        const errMessage = error.message;
        console.log(errMessage);
      }
    } else {
      showToast('All fields are required!');
    }
  };

  setViewRef = ref => {
    this.parentView = ref;
  };

  handleStartShouldSetResponder = event => {
    if (this.parentView._nativeTag === event.target) {
      // Closing modal
      this.setState({showAssignModal: false, addAssignmentButtonZIndex: 0});

      // Resetting filled modal data
      this.resetAssignModalFilledData();
    }
  };

  renderAssignModal = () => (
    <TouchableWithoutFeedback onPress={this.handleScreenPress}>
      <View
        ref={this.setViewRef}
        onStartShouldSetResponder={this.handleStartShouldSetResponder}
        style={styles.assignModal}>
        <View style={styles.assignModalContentContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.assignModalItem}>
              <Picker
                selectedValue={this.state.selectedClassName}
                onValueChange={this.onClassChange}>
                <Picker.Item label="Select Class" value="Select Class" />
                {this.classList}
              </Picker>
            </View>

            {this.state.selectedClassId && (
              <View style={styles.assignModalItem}>
                <Picker
                  selectedValue={this.state.selectedSectionName}
                  onValueChange={this.onSectionChange}>
                  <Picker.Item label="Select Section" value="Select Section" />
                  {this.sectionList}
                </Picker>
              </View>
            )}

            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDateTimePicker}
            />

            <TouchableOpacity
              onPress={this._showDateTimePicker}
              style={styles.dateButton}>
              <Text>{this.state.selectedDate}</Text>
              <Image
                source={calendar}
                resizeMode="cover"
                style={styles.calendarIcon}
              />
            </TouchableOpacity>

            <TouchableHighlight
              onPress={this.handleSubmitPress}
              style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableHighlight>
          </ScrollView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  render() {
    const addAssignmentButtonZIndex = {
      zIndex: this.state.addAssignmentButtonZIndex,
    };

    return this.state.isLoading ? (
      <CustomLoader />
    ) : (
      <SafeAreaView style={styles.container}>
        {this.state.connectionState && (
          <>
            <ScreenHeader
              title="Homework"
              image={foot_logo}
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
            <Modal
              visible={this.state.isDateTimePickerVisible}
              transparent={true}
              animationType="fade"
              onRequestClose={() =>
                this.setState({isDateTimePickerVisible: false})
              }>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <DateTimePicker
                    value={this.state.selectedDate || new Date()}
                    mode="date"
                    is24Hour={true}
                    display="spinner"
                    onChange={this.onDateChange}
                  />
                  <Button
                    title="Close"
                    onPress={() =>
                      this.setState({isDateTimePickerVisible: false})
                    }
                  />
                </View>
              </View>
            </Modal>
            {this.state.status ? (
              <View style={styles.messageContainer}>
                <Text style={styles.messageText}>{this.state.status}</Text>
              </View>
            ) : (
              <View style={styles.mainContentContainer}>
                {this.state.date ? (
                  <FlatList
                    data={this.state.assignmentsData}
                    renderItem={this.renderItem}
                    keyExtractor={this.keyExtractor}
                    ItemSeparatorComponent={this.itemSeparator}
                    showsVerticalScrollIndicator={false}
                    alwaysBounceVertical={true} // for iOS only
                    contentContainerStyle={styles.listContentContainer}
                    refreshing={this.state.isListRefreshing}
                    onRefresh={this.handleListRefresh}
                    extraData={this.state}
                  />
                ) : (
                  <FlatList
                    data={this.state.assignmentsData}
                    renderItem={this.renderItem}
                    keyExtractor={this.keyExtractor}
                    ItemSeparatorComponent={this.itemSeparator}
                    showsVerticalScrollIndicator={false}
                    alwaysBounceVertical={true} // for iOS only
                    contentContainerStyle={styles.listContentContainer}
                    refreshing={this.state.isListRefreshing}
                    onRefresh={this.handleListRefresh}
                    extraData={this.state}
                  />
                )}
                {this.state.showAssignModal && this.renderAssignModal()}
              </View>
            )}

            <TouchableHighlight
              underlayColor={'#414042'}
              onPress={this.onAddAssignmentClick}
              style={[styles.addAssignmentBtn, addAssignmentButtonZIndex]}>
              <Text style={styles.addAssignmentBtnIcon}>+</Text>
            </TouchableHighlight>
          </>
        )}
        {this.state.connectionState === false ? (
          <View style={styles.offlineStyle}>
            <FastImage source={offline} style={styles.networkIssue} />
          </View>
        ) : null}
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  isGetAssignment: teacherSelectors.isGetAssignment(state),
  isGetTeacherClassList: teacherSelectors.isGetTeacherClassList(state),
  isGetSectionDetails: teacherSelectors.isGetSectionDetails(state),
  isAssignAssignment: teacherSelectors.isAssignAssignment(state),
  isGetDateWiseStudentAssignment:
    studentSelectors.isGetDateWiseStudentAssignment(state),
});
const mapDispatchToProps = {
  getAssignment: teacherOperations.getAssignment,
  getTeacherClassList: teacherOperations.getTeacherClassList,
  getSectionDetails: teacherOperations.getSectionDetails,
  assignAssignment: teacherOperations.assignAssignment,
  getDateWiseStudentAssignment: studentOperations.getDateWiseStudentAssignment,
};
export default connect(mapStateToProps, mapDispatchToProps)(AssignmentScreen);
