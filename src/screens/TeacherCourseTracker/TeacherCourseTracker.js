import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Platform,
  ScrollView,
  AppState,
  KeyboardAvoidingView,
  TouchableHighlight,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
// Components
import ScreenHeader from 'components/ScreenHeader';
import TeacherCourseTrack from 'components/TeacherCourseTrack';
import {connect} from 'react-redux';
import {teacherOperations, teacherSelectors} from 'idsStore/data/teacher';
import showToast from 'components/CustomToast';
import {Picker} from '@react-native-picker/picker';
import CustomLoader from 'components/CustomLoader';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

class TeacherCourseTracker extends Component {
  constructor() {
    super();
    this.state = {
      status: null,
      output: null,
      isListRefreshing: false,
      showDatePicker: false,
      isLoading: true,
      showAssignModal: false,
      selectedAssignmentId: null,
      addAssignmentButtonZIndex: 0,
      selectedClassId: null,
      selectedClassName: 'Select Class',
      selectedSectionId: null,
      selectedSectionName: 'Select Section',
      isDateTimePickerVisible: false,
      date: null, // Reset the date to null
      selectedDate: '', // Also reset the selectedDate to empty string
      appState: AppState.currentState,
      showClassModal: false,
      classList: [],
      isDatePickerOpen: false,
    };
  }

  componentDidMount() {
    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      () => {
        if (this.addCourseTrackerPushed) {
          this.addCourseTrackerPushed = false;
          return;
        }

        // Clear selected class and section
        this.setState({
          selectedClassName: 'Select Class',
          selectedClassId: null,
          selectedSectionId: null,
        });

        this.searchData();
        this.fetchTeacherClassDetails();
      },
    );
  }

  onClassChange = async (itemValue, itemIndex) => {
    try {
      // Check if a valid class is selected (not the placeholder)
      if (itemIndex >= 0) {
        const selectedClassObj = this.classSectionData[itemIndex];
        const selectedClassId = selectedClassObj.class_id;
        const selectedSectionId = selectedClassObj.section_id;

        await this.props.getSubjectDetails(selectedClassId, selectedSectionId);
        const response = this.props.isGetSubjectDetails;

        if (response.success === 1) {
          this.subjectsData = response.subject;
          this.subjectList = this.subjectsData.map((item, index) => (
            <Picker.Item
              label={item.subname}
              value={item.subname}
              key={index}
            />
          ));

          const pickerItems = ['Select Class', ...this.classList];
          this.setState({
            selectedClassName: itemValue,
            selectedClassId,
            selectedSectionId,
            pickerItems,
          });
        }
      }

      this.setState({
        selectedSubjectName: 'Select Subject',
        selectedSubjectId: null,
      });
    } catch (error) {
      const errMessage = error.message;
      console.log(errMessage);
    }
  };

  toggleDatePicker = () => {
    this.setState(prevState => ({
      showDatePicker: !prevState.showDatePicker,
    }));
  };

  setDate = (event, date) => {
    const selectedDate = date || this.state.date;
    this.setState(
      {
        isDatePickerOpen: false,
        date: selectedDate,
        selectedDate: selectedDate,
        showDatePicker: false, // Close the date picker after selecting a date
      },
      () => {
        this.searchData(); // Call searchData after setting the state
      },
    );
  };

  searchData = async () => {
    try {
      this.setState({isLoading: true});

      await this.props.fetchCourseTracker(
        this.state.date,
        this.state.selectedClassId,
        this.state.selectedSectionId,
      );
      const response = this.props.isFetchCourseTracker;

      if (response.success === 0) {
        const message = response.message;
        this.setState({
          status: message,
          output: null,
          isLoading: false,
          isListRefreshing: false,
        });
      } else if (response.success === 1) {
        const output = response.output;
        this.setState({
          output,
          isLoading: false,
          isListRefreshing: false,
        });
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  renderItem = ({item}) => (
    <TeacherCourseTrack
      item={item}
      refreshAssignmentsCallback={this.searchData}
      navigation={this.props.navigation}
    />
  );

  keyExtractor = (item, index) => index.toString();

  navigate = () => {
    this.addCourseTrackerPushed = true;

    this.props.navigation.push('AddCourseTracker', {
      refreshAssignmentsCallback: this.searchData,
    });
  };

  handleListRefresh = async () => {
    try {
      this.setState({
        isListRefreshing: true,
        status: null,
        output: null,
        showDatePicker: false,
        selectedClassId: null,
        selectedClassName: 'Select Class',
        selectedSectionId: null,
        selectedSectionName: 'Select Section',
        date: null, // Reset the date to null
        selectedDate: null,
      });

      await this.searchData();
      await this.onClassChange();
    } catch (error) {
      console.log(error.message);
    }
  };

  fetchTeacherClassDetails = async () => {
    try {
      await this.props.getTeacherClassDetails();
      const response = this.props.isGetTeacherClassDetails;
      if (response.success === 1) {
        this.classSectionData = response.classsec;
        this.classList = this.classSectionData.map((item, index) => ({
          label: item.name,
          value: item.name,
          key: index,
        }));

        this.setState({isLoading: false, classList: this.classList});
      } else if (response.success === 0) {
        showToast(response.message);
        this.setState({isLoading: false});
      }
    } catch (error) {
      const errMessage = error.message;
      console.log(errMessage);
    }
  };

  toggleClassModal = () => {
    this.setState({showClassModal: !this.state.showClassModal});
  };

  selectClass = async item => {
    try {
      this.setState({
        selectedClassName: item.label,
        showClassModal: false,
        selectedClassId: item.value,
      });

      await this.onClassChange(item.value, item.key);
      await this.searchData();
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    const {output, status, showClassModal, date, classList, showDatePicker} =
      this.state;
    console.log('e', status);
    const formattedDate = date
      ? moment(date).format('MM/DD/YYYY')
      : 'Select Date';

    return this.state.isLoading ? (
      <CustomLoader />
    ) : (
      <SafeAreaView style={styles.container}>
        <ScreenHeader
          title="Course Tracker"
          showSchoolLogo
          nav={this.props.navigation}
        />
        <View style={{padding: widthPercentageToDP(3)}}>
          <TouchableHighlight
            onPress={this.toggleClassModal}
            underlayColor="#DDDDDD"
            style={styles.picker}>
            <Text style={styles.pickerText}>
              {this.state.selectedClassName}
            </Text>
          </TouchableHighlight>
          <View style={styles.pickerContainer}>
            <TouchableOpacity
              style={styles.input}
              onPress={this.toggleDatePicker}>
              <Text style={styles.dateText}>{formattedDate}</Text>
            </TouchableOpacity>
            <Modal
              visible={showDatePicker}
              animationType="slide"
              transparent={true}
              onRequestClose={this.toggleDatePicker}>
              <TouchableWithoutFeedback onPress={this.toggleDatePicker}>
                <View style={styles.modalContainer}>
                  <View style={styles.datePickerContainer}>
                    <DateTimePicker
                      value={date || new Date()}
                      mode="date"
                      display="spinner"
                      onChange={this.setDate}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          </View>
          <Modal
            visible={showClassModal}
            animationType="slide"
            transparent={true}
            onRequestClose={this.toggleClassModal}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <FlatList
                  data={classList}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={styles.modalItem}
                      onPress={() => this.selectClass(item)}>
                      <Text style={styles.modalItemText}>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={item => item.key.toString()}
                />
                <TouchableHighlight
                  onPress={this.toggleClassModal}
                  underlayColor="#DDDDDD"
                  style={styles.modalCloseButton}>
                  <Text style={styles.modalCloseButtonText}>Close</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={{flex: 1}}>
          {this.props.isFetchCourseTracker.success === 0 ? (
            <View
              style={{
                marginTop: heightPercentageToDP(5),
                alignItems: 'center',
              }}>
              <Text style={styles.messageText}>{status}</Text>
            </View>
          ) : (
            <FlatList
              data={output}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
              ItemSeparatorComponent={this.itemSeparator}
              alwaysBounceVertical={true}
              contentContainerStyle={styles.listContentContainer}
              refreshing={this.state.isListRefreshing}
              onRefresh={this.handleListRefresh}
              extraData={this.state}
            />
          )}
        </KeyboardAvoidingView>
        <TouchableOpacity
          onPress={this.navigate}
          style={styles.addAssignmentBtn}>
          <Text style={styles.addAssignmentBtnIcon}>+</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  isGetTeacherClassDetails: teacherSelectors.isGetTeacherClassDetails(state),
  isGetSubjectDetails: teacherSelectors.isGetSubjectDetails(state),
  isFetchCourseTracker: teacherSelectors.isFetchCourseTracker(state),
});

const mapDispatchToProps = {
  getTeacherClassDetails: teacherOperations.getTeacherClassDetails,
  getSubjectDetails: teacherOperations.getSubjectDetails,
  fetchCourseTracker: teacherOperations.fetchCourseTracker,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TeacherCourseTracker);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    // margin: widthPercentageToDP(2),
  },
  picker: {
    height: 40,
    borderWidth: 1,
    borderColor: '#bcbec0',
    borderRadius: 5,
    marginTop: widthPercentageToDP(2),
    padding: widthPercentageToDP(2),
  },
  // datePickerContainer: {},
  addAssignmentSection: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginTop: '50%',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
    marginTop: 10,
  },
  listContentContainer: {
    flexGrow: 1, // Ensure the content container grows to allow scrolling
    padding: 10,
  },
  input: {
    marginTop: widthPercentageToDP(2),
    marginBottom: widthPercentageToDP(3),
    height: 40,
    borderWidth: 1,
    borderColor: '#bcbec0',
    borderRadius: 5,
    padding: widthPercentageToDP(2),
  },
  addAssignmentBtn: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    width: 50,
    height: 50,
    backgroundColor: '#1ba2de',
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#1ba2de80',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addAssignmentBtnIcon: {
    color: '#fff',
    fontSize: 24,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 5,
    width: '80%',
    maxHeight: '80%',
  },
  modalItem: {
    padding: 15,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
  },
  modalItemText: {
    fontSize: 16,
  },
  modalCloseButton: {
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  modalCloseButtonText: {
    fontSize: 16,
    color: '#2196f3',
  },
  datePickerContainer: {
    backgroundColor: 'white', // Change the background color to white
  },
});
