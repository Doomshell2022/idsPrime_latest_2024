import React from 'react';
import {View, Alert, AppState, Image} from 'react-native';
import {styles} from './styles';
import ImageSlider from 'react-native-image-slider';
import {SafeAreaView} from 'react-native-safe-area-context';

// Components
import Tile from 'components/Tile';
import ScreenHeader from 'components/ScreenHeader';
import CustomLoader from 'components/CustomLoader';
import course from 'assets/icons/course_Tracker.png';

// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
// Icons
import ic_header_option_icon from 'assets/icons/ic_header_option_icon.png';
import ic_attendance from 'assets/icons/ic_attendance.png';
import ic_fee from 'assets/icons/ic_fee.png';
import ic_timetable from 'assets/icons/ic_timetable.png';
import ic_results from 'assets/icons/ic_results.png';
import ic_library from 'assets/icons/ic_library.png';
import ic_calendar from 'assets/icons/ic_calendar.png';
import ic_tranport from 'assets/icons/ic_tranport.png';
import ic_gallery from 'assets/icons/ic_gallery.png';
import ic_hostel from 'assets/icons/ic_hostel.png';
import ic_date_sheet from 'assets/icons/ic_date_sheet.png';
import ic_notice_board from 'assets/icons/ic_notice_board.png';
import ic_change_password from 'assets/icons/ic_change_password.png';
import takepicture from 'assets/icons/take-picture.png';
import ic_assignment_white from 'assets/icons/ic_assignment_white.png';
import ic_view_profile from 'assets/icons/ic_view_profile.png';
import offline from 'assets/icons/internetConnectionState.gif';
//data
import {connect} from 'react-redux';
import {sliderOperations, sliderSelectors} from 'idsStore/data/slider';
import {
  notificationOperations,
  notificationSelectors,
} from 'idsStore/data/notifi';
import {teacherOperations, teacherSelectors} from 'idsStore/data/teacher';
// User Preference
import {getData, getActiveSchool, teacherDesignation} from 'api/UserPreference';
import Carousel from 'react-native-snap-carousel';

class DashBoardScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isClassTeacher: false,
      connectionState: true,
      sliderImages: [],
      notificationCount: 0,
      appState: AppState.currentState,
    };
  }
  data = [
    {image: require('../../assets/images/admin_slider1.png')},
    {image: require('../../assets/images/admin_slider1.png')},
  ];
  renderItem = ({item}) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
    </View>
  );
  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
    AppState.addEventListener('change', this.handleAppStateChange);
    this.fetchSliderImages();
  }

  componentWillUnmount() {
    this.unsubscribe();
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  // fetchSliderImages = async () => {
  //   try {
  //     // const response = await dashboardSlider();
  //     await this.props.getDashboardSlider();
  //     const response = this.props.isSliderGet;

  //     if (this.state.connectionState === true) {
  //       if (response.success === 1) {
  //         const sliderImages = response.slider.map(item => item.image);
  //         this.setState({sliderImages});

  //         // fetching notification count
  //         await this.fetchNotificationCount();
  //         await this.checkTeachProfile();
  //       } else {
  //         // fetching notification count
  //         await this.checkTeachProfile();
  //         await this.fetchNotificationCount();
  //         this.setState({sliderImages: [], isLoading: false});
  //       }
  //     } else {
  //       this.setState({isLoading: false});
  //     }
  //   } catch (error) {
  //     Alert.alert('', error);
  //     console.log(error.message);
  //   }
  // };
  fetchSliderImages = async () => {
    try {
      // const response = await dashboardSlider();
      await this.props.getDashboardSlider();
      const response = this.props.isSliderGet;

      if (this.state.connectionState === true) {
        if (response.success === 1) {
          const sliderImages = response.slider
            ? response.slider.map(item => item.image)
            : [];
          this.setState({sliderImages});
          // console.log('====================================');
          // console.log('ssssssdsss', sliderImages);
          // console.log('====================================');

          // fetching notification count
          await this.fetchNotificationCount();
          await this.checkTeachProfile();
        } else {
          // fetching notification count
          await this.checkTeachProfile();
          await this.fetchNotificationCount();
          this.setState({sliderImages: [], isLoading: false});
        }
      } else {
        this.setState({isLoading: false});
      }
    } catch (error) {
      Alert.alert('', error);
      console.log(error.message);
    }
  };

  fetchNotificationCount = async () => {
    try {
      // fetching active school from local storage
      const activeSchool = await getActiveSchool();
      if (!activeSchool) {
        return;
      }

      // fetching empId from local storage
      const userInfo = await getData();

      if (userInfo) {
        const {idsprimeID} = activeSchool;
        const {empId} = userInfo;

        // preparing params
        const params = {
          userId: empId,
          login_type: 'Teacher',
          idsprimeID,
        };

        // calling api
        await this.props.getNotificationCount(params);
        const response = this.props.isGetNotificationCount;

        // processing response
        if (response) {
          const {success} = response;

          if (success === 1) {
            const {notificationCount} = response;
            this.setState({notificationCount, isLoading: false});
          } else {
            this.setState({notificationCount: 0, isLoading: false});
            //Alert.alert('', response.message);
          }
        } else {
          this.setState({notificationCount: 0, isLoading: false});
          //Alert.alert('', response.message);
        }
      }
    } catch (error) {
      Alert.alert('', error);
      console.log(error.message);
    }
  };

  // Checking its callTeacher or not
  checkTeachProfile = async () => {
    try {
      await this.props.getTeacherInfo();
      const response = this.props.isGetTeacherInfo;
      if (response && response.success === 1) {
        const {details} = response;
        const {designation} = details;

        if (designation === 'Class Teacher') {
          await teacherDesignation(designation);

          this.setState({isClassTeacher: true});
        } else {
          await teacherDesignation(designation);

          this.setState({isClassTeacher: false});
        }
      } else {
        this.setState({isClassTeacher: false});
      }
    } catch (error) {}
  };

  handleAppStateChange = async nextAppState => {
    try {
      const {appState} = this.state;
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        await this.fetchNotificationCount();
        await this.checkTeachProfile();
      }

      this.setState({appState: nextAppState});
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    if (this.state.isLoading) {
      return <CustomLoader />;
    }

    // Processing data
    const {sliderImages, notificationCount} = this.state;
    const {navigation} = this.props;

    return (
      <SafeAreaView style={styles.container}>
        {this.state.connectionState && (
          <>
            <ScreenHeader title="Home" showSchoolLogo nav={navigation} />

            <View style={styles.imageSliderContainer}>
              <ImageSlider
                loop
                loopBothSides
                autoPlayWithInterval={2000}
                images={sliderImages}
              />
            </View>

            <View style={styles.tilesContainer}>
              {this.state.isClassTeacher === true ? (
                <View style={styles.tilesRow}>
                  <Tile
                    title="Attendance"
                    color="#5366c7"
                    image={ic_attendance}
                    nav={navigation}
                  />
                  <Tile
                    title="Student Photo"
                    color="#d2434e"
                    image={takepicture}
                    nav={navigation}
                  />
                  <Tile
                    title="Time Table"
                    color="#33a375"
                    image={ic_timetable}
                    nav={navigation}
                  />
                </View>
              ) : (
                <View style={styles.tilesRow}>
                  <Tile
                    title="Time Table"
                    color="#33a375"
                    image={ic_timetable}
                    nav={navigation}
                  />
                </View>
              )}

              <View style={styles.tilesRow}>
                <Tile
                  title="Homework"
                  color="#00c0f0"
                  image={ic_assignment_white}
                  nav={navigation}
                />
                <Tile
                  title="Calendar"
                  color="#982257"
                  image={ic_calendar}
                  nav={navigation}
                />
                {notificationCount !== 0 ? (
                  <Tile
                    title="Notification"
                    color="#eea023"
                    // image={ic_notice_board}
                    image={require('assets/images/79167-notification-bell.gif')}
                    nav={navigation}
                    showNotification
                    notificationCount={notificationCount}
                  />
                ) : (
                  <Tile
                    title="Notification"
                    color="#eea023"
                    image={ic_notice_board}
                    // image={require('assets/images/79167-notification-bell.gif')}
                    nav={navigation}
                    showNotification
                    notificationCount={notificationCount}
                  />
                )}
              </View>

              <View style={styles.tilesRow}>
                <Tile
                  title="Library"
                  color="#bb4c54"
                  image={ic_library}
                  nav={navigation}
                />
                <Tile
                  title="Date Sheet/Syllabus"
                  color="#2fa8ab"
                  image={ic_date_sheet}
                  nav={navigation}
                />
                {/* <Tile
                  title="View Profile"
                  color="#a4c96a"
                  image={ic_view_profile}
                  nav={navigation}
                /> */}
                {/* <Tile
							title='Photo Gallery'
							color='#d2434e'
							image={ic_gallery}
							nav={navigation}
						/>
						<Tile
							title='Transport'
							color='#d4ab70'
							image={ic_tranport}
							nav={navigation}
						/> */}
                <Tile
                  title="CourseTracker"
                  color="#d2434e"
                  image={course}
                  nav={navigation}
                />
              </View>
            </View>
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
  isSliderGet: sliderSelectors.isSliderGet(state),
  isGetNotificationCount: notificationSelectors.isGetNotificationCount(state),
  isGetTeacherInfo: teacherSelectors.isGetTeacherInfo(state),
});
const mapDispatchToProps = {
  getDashboardSlider: sliderOperations.getDashboardSlider,
  getNotificationCount: notificationOperations.getNotificationCount,
  getTeacherInfo: teacherOperations.getTeacherInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoardScreen);
