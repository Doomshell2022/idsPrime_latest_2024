import React, {Component} from 'react';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  // SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {styles} from './styles';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Cell,
} from 'react-native-table-component';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// Components
import CustomLoader from 'components/CustomLoader';
import ScreenHeader from 'components/ScreenHeader';
// API
import {connect} from 'react-redux';
import {adminOperations, adminSelectors} from 'idsStore/data/admin';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class studentAbsent extends Component {
  constructor(props) {
    super(props);
    this.navi = props.navigation;
    this.state = {
      isLoading: true,
      totalStudents: null,
      totalAbsentStudents: null,
      tableData: null,
      status: null,

      tableHead: ['S.No.', 'Class', 'Total', 'Absent'],
    };
  }
  UNSAFE_componentWillMount() {
    this.didFocusSubscription = this.navi.addListener('didFocus', () => {
      this.fetchStudentAttendance();
    });
  }
  // componentDidMount() {

  // }
  componentWillUnmount() {
    // unsubscribing from didFocus listener
    this.didFocusSubscription;
  }

  fetchStudentAttendance = async () => {
    try {
      // processing response
      await this.props.getStudentAttendance();
      const response = this.props.isGetStudentAttendance;
      if (response) {
        const {success} = response;

        if (success === 1) {
          const {output} = response;
          const {totalStudents, totalAbsentStudents, classInfo} = output;
          const tableData = classInfo.map((student, index) => {
            var serialNo = `${index + 1}.`;
            var {
              class: studentClass,
              totalStudent,
              totalPresent,
              totalAbsent,
              class_id,
              section_id,
            } = student;
            return [
              (serialNo = serialNo),
              (studentClass = studentClass),
              (totalStudent = totalStudent),
              (totalAbsent = totalAbsent),
              (class_id = class_id),
              (section_id = section_id),
            ];
          });
          // console.log('Student', tableData, totalStudents, totalAbsentStudents);
          this.setState({
            totalStudents,
            totalAbsentStudents,
            tableData,
            status: null,
            isLoading: false,
          });
        } else {
          const {message: status} = response;
          this.setState({
            status,
            totalStudents: null,
            totalAbsentStudents: null,
            tableData: null,
            isLoading: false,
          });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  onPressRowSelect = data => {
    console.log('data when select', data);
  };

  itemSeparator2 = () => <View style={{height: wp(2), background: '#000'}} />;

  renderItem = ({item, index}) => {
    const onSchoolNamePress = () => {
      console.log('==', item);
      this.props.navigation.navigate('AdminTakeAttendance', {item});
    };
    const onAbsentDataPress = () => {
      if (item[3] !== 0) {
        console.log('==', item[3] !== 0);
        this.props.navigation.navigate('AbsentStudentReport', {data: item});
      }
    };

    const renderItemItem = ({item, index}) => {
      return (
        <View style={{marginTop: wp(2), paddingLeft: wp(2)}}>
          {/* <TouchableOpacity onPress={() => onSchoolNamePress(item, index)}> */}
          {index === 1 ? (
            <Text
              style={
                index === 1
                  ? {
                      fontWeight: '700',
                      width: wp(50),
                      fontSize: wp(3.2),
                      marginTop: wp(2),
                    }
                  : null
              }>
              {item}
            </Text>
          ) : index === 2 ? (
            <Text
              style={
                index === 2
                  ? {width: wp(19), fontSize: wp(3.2), marginTop: wp(2)}
                  : null
              }>
              {item}
            </Text>
          ) : index === 3 ? (
            // <TouchableOpacity onPress={() => onAbsentDataPress(item, index)}>
            <Text
              style={
                index === 3
                  ? {
                      fontWeight: '700',
                      width: wp(19),
                      fontSize: wp(3.2),
                      marginTop: wp(2),
                    }
                  : null
              }>
              {item}
            </Text>
          ) : // </TouchableOpacity>
          index === 0 ? (
            <Text
              style={{
                width: wp(12),
                textAlign: 'left',
                paddingLeft: 5,
                paddingTop: -5,
                fontSize: wp(3.2),
                marginTop: wp(2),
              }}>
              {item}
            </Text>
          ) : null}
          {/* </TouchableOpacity> */}
        </View>
      );
    };
    const assignmentInfoList = {
      backgroundColor:
        '#' +
        (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6) +
        0x15,
      // padding: wp(2),
      // borderWidth: 1,
      // borderColor: '#00000015',
      borderRadius: wp(2),
      // paddingVertical: wp(3),
      // marginBottom: wp(1.5),
    };
    return (
      <View style={styles.schoolStyle}>
        <TouchableOpacity onPress={() => onSchoolNamePress(item, index)}>
          <View style={assignmentInfoList}>
            <FlatList
              data={item}
              renderItem={renderItemItem}
              keyExtractor={this.keyExtractor}
              ItemSeparatorComponent={this.itemSeparator2}
              numColumns={4}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingTop: wp(2)}}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const {isLoading} = this.state;
    if (isLoading) {
      return <CustomLoader />;
    }

    const {
      totalStudents,
      totalAbsentStudents,
      tableHead,

      tableData,
      status,
    } = this.state;
    // const widthArr = [wp(12), wp(50), wp(19), wp(19)];
    return (
      <ScrollView style={styles.container}>
        <ScreenHeader
          title="Student Attendance"
          showSchoolLogo
          nav={this.props.navigation}
        />
        <View style={styles.absentReasonContainer}>
          <Text style={styles.teacherName}>
            Total Students: {totalStudents}
          </Text>
          <Text style={styles.teacherName}>
            Total Absent: {totalAbsentStudents}
          </Text>
        </View>

        {tableData ? (
          <View style={styles.contentContainer}>
            {/* <Table borderStyle={{borderColor: 'transparent'}}>
              <Row
                data={tableHead}
                widthArr={widthArr}
                // flexArr={[1, 2, 1, 1]}
                style={styles.header}
                textStyle={styles.text}
              />
            </Table> */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#1ba2de',
                padding: wp(3),
                height: hp(6),
              }}>
              <View>
                <Text style={{color: '#fff', fontSize: wp(3.2)}}>S.No</Text>
              </View>
              <View>
                <Text
                  style={{color: '#fff', fontSize: wp(3.2), marginLeft: hp(4)}}>
                  Class
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: wp(3.2),
                    marginLeft: hp(4.5),
                  }}>
                  Total
                </Text>
              </View>
              <View>
                <Text style={{color: '#fff', fontSize: wp(3.2)}}>Absent</Text>
              </View>
            </View>
            <View style={{width: '100%'}}>
              <FlatList
                data={tableData}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
                ItemSeparatorComponent={this.itemSeparator}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingTop: wp(2)}}
                refreshing={this.state.isListRefreshing}
                onRefresh={this.handleListRefresh}
              />
            </View>
          </View>
        ) : (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{status}</Text>
          </View>
        )}
      </ScrollView>
    );
  }
}
const mapStateToProps = state => ({
  isGetStudentAttendance: adminSelectors.isGetStudentAttendance(state),
});
const mapDispatchToProps = {
  getStudentAttendance: adminOperations.getStudentAttendance,
};

export default connect(mapStateToProps, mapDispatchToProps)(studentAbsent);
