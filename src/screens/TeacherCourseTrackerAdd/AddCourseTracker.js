import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
  Modal,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import arrow from '../../assets/icons/arrow.png';
import {SafeAreaView} from 'react-native-safe-area-context';
import ScreenHeader from 'components/ScreenHeader';
import DateTimePicker from '@react-native-community/datetimepicker';
import RadioForm from 'react-native-simple-radio-button';
import {teacherOperations, teacherSelectors} from 'idsStore/data/teacher';
import {Picker} from '@react-native-picker/picker';
import {connect} from 'react-redux';
import CustomLoader from 'components/CustomLoader';
import ProcessingLoader from 'components/ProcessingLoader';
import showToast from 'components/CustomToast';
import {getActiveSchool, getData} from 'api/UserPreference';

class AddCourseTracker extends Component {
  state = {
    selectedClassId: null,
    selectedSectionId: null,
    selectedClassName: 'Select Class',
    showProcessingLoader: false,
    isLoading: true,
    date: '',
    showDatePicker: false,
    chapter_No: '',
    subj: '',
    con: '',
    activity_part: '',
    class_Assigment: '',
    home_Assigment: '',
    digital_Integration: '',
    assessment_s: '',
    achieved_s: 'achieved',
    reason_s: '',
    conHeight: 40,
    activityPartHeight: 40,
    classAssigmentHeight: 40,
    homeAssigmentHeight: 40,
    digitalIntegrationHeight: 40,
    assessmentHeight: 40,
    reasonHeight: 40,
    showClassModal: false,
    classList: [],
    isDatePickerOpen: false,
  };

  async componentDidMount() {
    this.fetchTeacherClassDetails();
  }

  setDate = (event, date) => {
    date = date || this.state.date;
    this.setState({
      date: date,
      showDatePicker: false, // Close the DatePicker modal after selecting a date
      isDatePickerOpen: false,
    });
  };

  formatDate = date => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;
    return formattedDay + '/' + formattedMonth + '/' + year;
  };

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

  handleNavigate = async () => {
    try {
      const {
        date,
        chapter_No,
        subj,
        con,
        activity_part,
        class_Assigment,
        home_Assigment,
        digital_Integration,
        assessment_s,
        achieved_s,
        reason_s,
        selectedClassId,
        selectedSectionId,
      } = this.state;

      if (
        !date ||
        !chapter_No ||
        !subj ||
        !con ||
        !activity_part ||
        !class_Assigment ||
        !home_Assigment ||
        !digital_Integration ||
        !assessment_s ||
        !achieved_s
      ) {
        Alert.alert('', 'Please fill in all the  fields!', [{text: 'OK'}], {
          cancelable: false,
        });
        return;
      }

      if (date === 'Select Date') {
        Alert.alert('', 'Please select Date!', [{text: 'OK'}], {
          cancelable: false,
        });
        return;
      }

      this.setState({showProcessingLoader: true});

      const formattedDate = this.formatDate(date);
      const userInfo = await getData();
      const data = await getActiveSchool();
      const {idsprimeID} = data;

      if (userInfo) {
        const {empId} = userInfo;

        let params = {
          idsprimeID,
          teacherId: empId,
          classId: selectedClassId,
          sec_Id: selectedSectionId,
          Date: formattedDate,
          chapterNo: chapter_No,
          subject: subj,
          concept: con,
          activity: activity_part,
          classAssigment: class_Assigment,
          homeAssigment: home_Assigment,
          digitalIntegration: digital_Integration,
          assessment: assessment_s,
          achieved: achieved_s === 'achieved' ? 'Y' : 'N',
        };

        if (achieved_s === 'notAchieved') {
          params.reason = reason_s;
        }

        await this.props.getaddCourseTracker(params);
        const response = this.props.isGetCourseTtracker;

        if (response && response.success === 1) {
          const refreshAssignmentsCallback = this.props.navigation.getParam(
            'refreshAssignmentsCallback',
            null,
          );

          if (refreshAssignmentsCallback) {
            this.setState({showProcessingLoader: false});
            this.props.navigation.pop();
            await refreshAssignmentsCallback();
            showToast(response.message);
          }

          this.setState({
            date: '',
            chapter_No: '',
            subj: '',
            con: '',
            activity_part: '',
            class_Assigment: '',
            home_Assigment: '',
            digital_Integration: '',
            assessment_s: '',
            achieved_s: '',
            reason_s: '',
          });

          showToast(response.message);
        }
      }
    } catch (error) {
      console.log('Error', error);
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

  onContentSizeChange = (key, event) => {
    const maxHeight = 200;
    const {contentSize} = event.nativeEvent;
    const height = Math.min(maxHeight, contentSize.height);
    this.setState({[`${key}Height`]: height});
  };

  toggleClassModal = () => {
    this.setState({showClassModal: !this.state.showClassModal});
  };

  selectClass = item => {
    this.setState({
      selectedClassName: item.label,
      showClassModal: false,
    });
    this.onClassChange(item.value, item.key);
  };
  toggleDatePicker = () => {
    this.setState(prevState => ({
      showDatePicker: !prevState.showDatePicker,
    }));
  };
  render() {
    const {isLoading, showClassModal, classList, showDatePicker, date} =
      this.state;
    if (isLoading) {
      return <CustomLoader />;
    }
    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 7);
    const radio_props = [
      {label: 'Achieved', value: 'achieved'},
      {label: 'Not Achieved', value: 'notAchieved'},
    ];

    return (
      <SafeAreaView style={styles.container}>
        <ScreenHeader
          backIcon={arrow}
          title="Add CourseTracker"
          showSchoolLogo
          nav={this.props.navigation}
        />
        <ScrollView>
          <KeyboardAvoidingView style={styles.formcontainer}>
            <View style={styles.pickerContainer}>
              <TouchableHighlight
                onPress={this.toggleClassModal}
                underlayColor="#DDDDDD"
                style={styles.picker}>
                <Text style={styles.pickerText}>
                  {this.state.selectedClassName}
                </Text>
              </TouchableHighlight>
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

            <View style={styles.pickerContainer}>
              <TouchableOpacity
                style={styles.input}
                onPress={() => this.setState({showDatePicker: true})}>
                <Text style={styles.dateText}>
                  {date ? this.formatDate(date) : 'Select Date'}
                </Text>
              </TouchableOpacity>
              <Modal
                visible={showDatePicker}
                animationType="slide"
                transparent={true}
                onRequestClose={this.toggleDatePicker} // Close datepicker
              >
                <TouchableWithoutFeedback onPress={this.toggleDatePicker}>
                  <View style={styles.modalContainer}>
                    <View style={styles.datePickerContainer}>
                      <DateTimePicker
                        value={date || new Date()}
                        mode="date"
                        display="spinner"
                        onChange={this.setDate}
                        minimumDate={minDate}
                        maximumDate={maxDate}
                      />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </Modal>
            </View>

            <TextInput
              style={[
                styles.textInput,
                {height: Math.max(40, this.state.conHeight)},
              ]}
              value={this.state.subj}
              onChangeText={text => this.setState({subj: text})}
              placeholder="Subject"
              placeholderTextColor="#000"
              onContentSizeChange={event =>
                this.onContentSizeChange('con', event)
              }
              maxLength={20} // Optional: To restrict the maximum character length
            />
            {/* 1 */}
            <TextInput
              style={[
                styles.textInput,
                {height: Math.max(40, this.state.conHeight)},
              ]}
              multiline={true}
              numberOfLines={4} // You can adjust this number as needed
              value={this.state.chapter_No}
              onChangeText={text => this.setState({chapter_No: text})}
              placeholder="LP Day/Chapter No."
              placeholderTextColor="#000"
              onContentSizeChange={event =>
                this.onContentSizeChange('con', event)
              }
            />
            <TextInput
              style={[
                styles.textInput,
                {height: Math.max(40, this.state.conHeight)},
              ]}
              placeholder="Concept/Topic"
              onChangeText={text => this.setState({con: text})}
              value={this.state.con}
              onContentSizeChange={event =>
                this.onContentSizeChange('con', event)
              }
              multiline
              placeholderTextColor="#000"
            />
            <TextInput
              style={[
                styles.textInput,
                {height: Math.max(40, this.state.activityPartHeight)},
              ]}
              placeholder="Learning Engagement/Activity"
              onChangeText={text => this.setState({activity_part: text})}
              value={this.state.activity_part}
              onContentSizeChange={event =>
                this.onContentSizeChange('activityPart', event)
              }
              multiline
              placeholderTextColor="#000"
            />
            <TextInput
              style={[
                styles.textInput,
                {height: Math.max(40, this.state.classAssigmentHeight)},
              ]}
              placeholder="Class Assignment"
              onChangeText={text => this.setState({class_Assigment: text})}
              value={this.state.class_Assigment}
              onContentSizeChange={event =>
                this.onContentSizeChange('classAssigment', event)
              }
              multiline
              placeholderTextColor="#000"
            />
            <TextInput
              style={[
                styles.textInput,
                {height: Math.max(40, this.state.homeAssigmentHeight)},
              ]}
              placeholder="Home Assignment"
              onChangeText={text => this.setState({home_Assigment: text})}
              value={this.state.home_Assigment}
              onContentSizeChange={event =>
                this.onContentSizeChange('homeAssigment', event)
              }
              multiline
              placeholderTextColor="#000"
            />
            <TextInput
              style={[
                styles.textInput,
                {height: Math.max(40, this.state.digitalIntegrationHeight)},
              ]}
              placeholder="Digital Integration"
              onChangeText={text => this.setState({digital_Integration: text})}
              value={this.state.digital_Integration}
              onContentSizeChange={event =>
                this.onContentSizeChange('digitalIntegration', event)
              }
              multiline
              placeholderTextColor="#000"
            />
            <TextInput
              style={[
                styles.textInput,
                {height: Math.max(40, this.state.assessmentHeight)},
              ]}
              placeholder="Assessment"
              onChangeText={text => this.setState({assessment_s: text})}
              value={this.state.assessment_s}
              onContentSizeChange={event =>
                this.onContentSizeChange('assessment', event)
              }
              multiline
              placeholderTextColor="#000"
            />
            {/* <RadioForm
              radio_props={radio_props}
              initial={0}
              onPress={value => this.setState({achieved_s: value})}
              formHorizontal={true}
              labelHorizontal={false}
              buttonColor={'#2196f3'}
              selectedButtonColor={'#2196f3'}
              animation={true}
            /> */}
            {/* {this.state.achieved_s === 'notAchieved' && (
              <TextInput
                style={[
                  styles.textInput,
                  {height: Math.max(40, this.state.reasonHeight)},
                ]}
                placeholderTextColor="#000"
                placeholder="Reason for Not Achieving"
                onChangeText={text => this.setState({reason_s: text})}
                value={this.state.reason_s}
                onContentSizeChange={event =>
                  this.onContentSizeChange('reason', event)
                }
                multiline
              />
            )} */}
            <TouchableHighlight
              onPress={this.handleNavigate}
              style={styles.button}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableHighlight>
          </KeyboardAvoidingView>
        </ScrollView>
        {this.state.showProcessingLoader && <ProcessingLoader />}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  input: {
    height: 40,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    // marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },

  formcontainer: {
    padding: 20,
  },
  pickerContainer: {
    marginBottom: 20,
  },
  picker: {
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  pickerText: {
    fontSize: 16,
    color: '#333333',
  },
  textInput: {
    height: 40,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#2196f3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
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
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 5,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => ({
  isGetTeacherClassDetails: teacherSelectors.isGetTeacherClassDetails(state),
  isGetSubjectDetails: teacherSelectors.isGetSubjectDetails(state),
  isGetCourseTtracker: teacherSelectors.isGetCourseTtracker(state),
});

const mapDispatchToProps = {
  getTeacherClassDetails: teacherOperations.getTeacherClassDetails,
  getSubjectDetails: teacherOperations.getSubjectDetails,
  getaddCourseTracker: teacherOperations.addCourseTracker,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCourseTracker);
