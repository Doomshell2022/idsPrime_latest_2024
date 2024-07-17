import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  SafeAreaView,
  TextInput,
  Modal,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import {teacherOperations, teacherSelectors} from 'idsStore/data/teacher';
import {deleteCoursetracker} from 'idsStore/data/teacher/operations';
import showToast from './CustomToast';
import {BASE_URL, makeRequest} from 'api/ApiInfo';
import {getActiveSchool} from 'api/UserPreference';

const assignmentInfoList = {
  backgroundColor:
    '#' +
    (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6) +
    0x15,
  padding: wp(2),
  borderWidth: 1,
  borderColor: '#00000015',
  marginBottom: wp(5),
};

class TeacherCourseTrack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: null,
      showReasonPopup: false,
      reason: '',
      showPicker: true,
      showDropdown: false,
    };
  }

  handleAssignmentDelete = () => {
    Alert.alert(
      'Delete',
      'Are you sure you want to delete this Course Tracker?',
      [
        {text: 'No', style: 'cancel'},
        {text: 'Yes', onPress: () => this.handleDelete()}, // Pass a function reference here
      ],
      {cancelable: false},
    );
  };

  handleDelete = async () => {
    try {
      const {item, deleteAssignment, refreshAssignmentsCallback} = this.props;
      const assignmentId = item.id;

      await this.props.deleteCoursetracker(assignmentId);

      const response = await this.props.isDeleteCourseTracker;
      showToast('Course Tracker has been successfully deleted'); // Ensure showToast is properly defined and imported

      refreshAssignmentsCallback(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  handleReasonSubmit = () => {
    const {reason} = this.state;
    if (reason.trim() === '') {
      Alert.alert('Error', 'Reason cannot be empty');
      return;
    }
    this.setState(
      {showReasonPopup: false, selectedValue: 'Not Achieved'},
      () => {
        this.handleAlertOkClick(reason);
      },
    );
  };

  handleNotAchievedSelect = () => {
    // Check if reason is already entered
    if (this.state.reason.trim() === '') {
      // If reason is empty, show reason popup
      this.setState({
        showReasonPopup: true,
        showPicker: true, // Ensure Picker remains visible
      });
    } else {
      // If reason is already entered, just show the Picker
      this.setState({
        showPicker: true, // Ensure Picker remains visible
      });
    }
  };

  handleAlertOkClick = async (reason = '') => {
    try {
      const {item, refreshAssignmentsCallback} = this.props;
      const assignmentId = item.id;
      const {selectedValue} = this.state;
      const activeSchool = await getActiveSchool();
      const {idsprimeID} = activeSchool;
      const params = {
        trackerId: assignmentId,
        idsprimeID: idsprimeID,
        achieved:
          selectedValue === 'Achieved'
            ? 'Achieved'
            : selectedValue === 'Not Achieved'
            ? 'Not Achieved'
            : '',
        reason: reason,
      };

      const response = await makeRequest(
        BASE_URL + 'coursetrackerachived',
        params,
      );
      console.log('API Response', response);
      const {message, success} = response;
      if (success === 1) {
        showToast(message);
        // Always set showPicker to true after handling reason submission
        this.setState({showPicker: true});
      } else {
        showToast(message);
      }
      refreshAssignmentsCallback(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  renderDropdown = () => {
    const options = ['Not Update', 'Achieved', 'Not Achieved'];
    return (
      <Modal
        transparent={true}
        visible={this.state.showDropdown}
        animationType="fade">
        <TouchableOpacity
          style={styles.dropdownOverlay}
          onPress={() => this.setState({showDropdown: false})}>
          <View style={styles.dropdown}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => {
                  this.setState(
                    {selectedValue: option, showDropdown: false},
                    () => {
                      if (option === 'Achieved') {
                        this.handleAlertOkClick();
                      } else if (option === 'Not Achieved') {
                        this.handleNotAchievedSelect();
                      }
                    },
                  );
                }}>
                <Text style={styles.dropdownItemText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  render() {
    const {item} = this.props;
    const {selectedValue, showReasonPopup, reason, showPicker, showDropdown} =
      this.state;

    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={[styles.assignmentInfoList, assignmentInfoList]}>
            <View style={styles.boxContainerStyle}>
              <View style={styles.boxContainer}>
                <View style={styles.classDateContainer}>
                  <Text style={styles.classText}>{item.subject}</Text>
                  <Text
                    style={{
                      fontWeight: '300',
                      color: '#000',
                      fontSize: wp(3),
                      marginTop: wp(-2),
                    }}>
                    ({item.className})
                  </Text>
                  <View style={styles.deleteButtonContainer}>
                    <Text style={{fontSize: wp(3), fontWeight: 'bold'}}>
                      {item.date}
                    </Text>
                  </View>
                </View>
                <Text style={styles.headingText}>
                  Chapter :{' '}
                  <Text style={styles.lightText}>{item.chapterNo}</Text>
                </Text>
                <Text style={styles.headingText}>
                  Topic : <Text style={styles.lightText}>{item.concept}</Text>
                </Text>
                <Text style={styles.headingText}>
                  Learning :{' '}
                  <Text style={styles.lightText}>{item.activity}</Text>
                </Text>
                <Text style={styles.headingText}>
                  ClassAssignment :{' '}
                  <Text style={styles.lightText}>{item.classAssigment}</Text>
                </Text>
                <Text style={styles.headingText}>
                  HomeAssignment :{' '}
                  <Text style={styles.lightText}>{item.homeAssigment}</Text>
                </Text>
                <Text style={styles.headingText}>
                  Digital :{' '}
                  <Text style={styles.lightText}>
                    {item.digitalIntegration}
                  </Text>
                </Text>
                <Text style={styles.headingText}>
                  Assessment :{' '}
                  <Text style={styles.lightText}>{item.assessment}</Text>
                </Text>
                {item.reason === null ? null : (
                  <Text style={styles.headingText}>
                    Reason : <Text style={styles.lightText}>{item.reason}</Text>
                  </Text>
                )}
                <View style={styles.pickerAndButtonContainer}>
                  {item.achieved === 'Not Updated' || item.achieved === '' ? (
                    <View style={styles.pickerContainer}>
                      <TouchableOpacity
                        onPress={() => this.setState({showDropdown: true})}
                        style={styles.customPicker}>
                        <Text style={styles.customPickerText}>
                          {selectedValue ? selectedValue : 'Not Updated'}
                        </Text>
                      </TouchableOpacity>
                      {showDropdown && this.renderDropdown()}
                    </View>
                  ) : (
                    <View>
                      <Text>{item.achieved}</Text>
                    </View>
                  )}

                  {item.achieved === 'Not Updated' ? (
                    <TouchableOpacity
                      onPress={this.handleAssignmentDelete}
                      style={styles.deleteButtonContainer2}>
                      <Image
                        source={require('../assets/icons/delete.png')}
                        style={styles.deleteButton}
                      />
                    </TouchableOpacity>
                  ) : null}
                </View>
                {item.achieved === 'N' && (
                  <>
                    <Text style={styles.notAchievedText}>{item.reason}</Text>
                    <TouchableOpacity
                      onPress={this.handleAssignmentDelete}
                      style={styles.deleteButtonContainer2}>
                      <Image
                        source={require('../assets/icons/delete.png')}
                        style={styles.deleteButton}
                      />
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          </View>
          <Modal
            transparent={true}
            visible={showReasonPopup}
            animationType="slide"
            onRequestClose={() => this.setState({showReasonPopup: false})}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Enter Reason</Text>
                <TextInput
                  placeholder="Enter reason..."
                  style={styles.reasonInput}
                  value={reason}
                  onChangeText={text => this.setState({reason: text})}
                />
                <View style={styles.modalButtonContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        showReasonPopup: false,
                        selectedValue: 'Not Update',
                        reason: '',
                      });
                    }}
                    style={styles.cancelButton}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={this.handleReasonSubmit}
                    style={styles.submitButton}>
                    <Text style={styles.buttonText}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  isDeleteCourseTracker: teacherSelectors.isDeleteCourseTracker(state),
});

const mapDispatchToProps = {
  deleteCoursetracker: teacherOperations.deleteCoursetracker,
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherCourseTrack);

const styles = StyleSheet.create({
  assignmentInfoList: {
    flex: 1,
    marginBottom: wp(5), // Adjusted to make it part of the style object
    // Other styles remain unchanged
  },
  singleAssignmentButton: {
    paddingHorizontal: wp(1.5),
  },
  assignmentIcon: {
    height: hp(3.5),
    aspectRatio: 1 / 1,
    marginRight: wp(3.5),
    marginBottom: hp(0.5),
  },
  boxContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  boxContainer: {
    flex: 1,
    marginLeft: wp(2),
    justifyContent: 'space-between',
    position: 'relative',
  },
  headingText: {
    fontSize: wp(3),
    fontWeight: 'bold',
    marginBottom: wp(1.3),
  },
  classDateContainer: {flexDirection: 'row', alignItems: 'center'},
  classText: {
    fontSize: wp(4),
    fontWeight: 'bold',
    marginRight: wp(1),
    color: '#000',
    marginBottom: wp(2),
  },
  dateText: {fontSize: wp(3), marginBottom: wp(2)},
  lightText: {fontWeight: '300', color: '#000', fontSize: wp(3)},
  deleteButton: {
    width: wp(5),
    height: wp(5),
    tintColor: 'red',
  },
  deleteButtonContainer: {position: 'absolute', top: 2.5, right: 5},
  deleteButtonContainer2: {
    marginLeft: wp(2),
  },
  pickerAndButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Aligns items to the right
    marginTop: wp(2),
    marginLeft: 'auto', // Pushes the container to the right edge of the parent
  },
  customPicker: {
    borderWidth: 1,
    height: 40,
    width: wp(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  customPickerText: {
    fontSize: wp(3.5),
  },
  dropdownOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    width: wp(50),
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  dropdownItem: {
    padding: wp(2),
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dropdownItemText: {
    fontSize: wp(4),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: wp(80),
    padding: wp(5),
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: wp(5),
    fontWeight: 'bold',
    marginBottom: wp(4),
  },
  reasonInput: {
    width: wp(70),
    borderWidth: 1,
    borderColor: '#000',
    padding: wp(2),
    marginBottom: wp(4),
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp(70),
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: wp(2),
    borderRadius: 5,
    width: wp(30),
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: 'green',
    padding: wp(2),
    borderRadius: 5,
    width: wp(30),
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
