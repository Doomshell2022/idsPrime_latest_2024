import React, {Component} from 'react';
import {Alert, Image, StyleSheet, ScrollView} from 'react-native';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import NetInfo from '@react-native-community/netinfo';

//Firebase API
import {
  checkPermission,
  createOnTokenRefreshListener,
  removeOnTokenRefreshListener,
  createNotificationListeners,
  removeNotificationListeners,
} from './src/firebase_api';

// network alert
import InternetConnectionAlert from 'react-native-internet-connection-alert';

// root toast support library
import {RootSiblingParent} from 'react-native-root-siblings';
// Routes
import {nsSetTopLevelNavigator} from './src/routes/NavigationService';

// Screens
import LoginScreen from './src/screens/LoginScreen';
import OTPVerificationScreen from './src/screens/OTPVerificationScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import DashBoardScreen from './src/screens/DashBoardScreen';
import TeacherDashBoardScreen from './src/screens/TeacherDashBoardScreen';
import AdminDashBoardScreen from './src/screens/AdminDashBoardScreen';
import AdminSearchScreen from './src/screens/AdminSearchScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import FeeScreen from './src/screens/FeeScreen';
import PaidFee from './src/screens/PaidFee';
import TotalFeeScreen from './src/screens/TotalFeeScreen';
import DueFeeScreen from './src/screens/DueFeeScreen';
import OutstandingScreen from './src/screens/OutstandingScreen';
import TransportScreen from './src/screens/TransportScreen';
import AdminTransportScreen from './src/screens/AdminTransportScreen';
import HostelScreen from './src/screens/HostelScreen';
import LibraryHomeScreen from './src/screens/LibraryHomeScreen';
import LibraryBookSearchScreen from './src/screens/LibraryBookSearchScreen';
import LibraryBookSearchResultScreen from './src/screens/LibraryBookSearchResultScreen';
import TeacherLibraryScreen from './src/screens/TeacherLibraryScreen';
import StudentChangePasswordScreen from './src/screens/StudentChangePasswordScreen';
import TeacherChangePasswordScreen from './src/screens/TeacherChangePasswordScreen';
// import NoticeBoardScreen from './src/screens/NoticeBoardScreen';
import TeacherNotificationScreen from './src/screens/TeacherNotificationScreen';
import teachersideNoticeSlider from './src/screens/TeacherNotificationScreen/teachersideNoticeSlider';
import StudentNotificationScreen from './src/screens/StudentNotificationScreen';
import StudentNotificationDetail from './src/screens/StudentNotificationDetailscreen';
import AdminNoticeBoardScreen from './src/screens/AdminNoticeBoardScreen';
import noticeBoardSlider from './src/screens/AdminNoticeBoardScreen/noticeBoardSlider';
import AssignmentScreen from './src/screens/AssignmentScreen';
import AddAssignmentScreen from './src/screens/AddAssignmentScreen';
import StudentAttendanceScreen from './src/screens/StudentAttendanceScreen';
import AdminFeeScreen from './src/screens/AdminFeeScreen';
import AdminLibraryScreen from './src/screens/AdminLibraryScreen';
import AdminLibraryBookSearchScreen from './src/screens/AdminLibraryBookSearchScreen';
import AdminLibraryBookSearchResultScreen from './src/screens/AdminLibraryBookSearchResultScreen';
import AdminCalendarScreen from './src/screens/AdminCalendarScreen';
import AdminDateSheetScreen from './src/screens/AdminDateSheetScreen';
import AttendanceScreen from './src/screens/AttendanceScreen';
import AdminCheckFeeScreen from './src/screens/AdminCheckFeeScreen';
import AdminTimeTableScreen from './src/screens/AdminTimeTableScreen';
import AdminTimeTableDetailScreen from './src/screens/AdminTimeTableDetailScreen';
import AdminAttendanceScreen from './src/screens/AdminAttendanceScreen';
import StudentTimeTableScreen from './src/screens/StudentTimeTableScreen';
import ResultScreen from './src/screens/ResultScreen';
import GalleryScreen from './src/screens/GalleryScreen';
import PhotoGalleryDetail from './src/screens/GalleryScreen/PhotoGalleryDetailScreen';
import DateSheetScreen from './src/screens/DateSheetScreen';
import TeacherDateSheetScreen from './src/screens/TeacherDateSheetScreen';
import StudentAssignmentScreen from './src/screens/StudentAssignmentScreen';
import TeacherAttendanceScreen from './src/screens/TeacherAttendanceScreen';
import AdminHostelScreen from './src/screens/AdminHostelScreen';
import AdminHostelDtlScreen from './src/screens/AdminHostelDtlScreen';
import AdminTransportDtlScreen from './src/screens/AdminTransportDtlScreen';
import StudentListScreen from './src/screens/StudentListScreen';
import SchoolListScreen from './src/screens/SchoolListScreen';
import SplashScreen from './src/screens/SplashScreen';
import StudentAbsentScreen from './src/screens/StudentAbsentScreen';
import MySuggestionScreen from './src/screens/MySuggestionScreen';
import AddMySuggestionScreen from './src/screens/AddMySuggestionScreen';
import MyGatePassScreen from './src/screens/MyGatePassScreen/';
import RequestGatePassScreen from './src/screens/RequestGatePassScreen';
import GuardHomeScreen from './src/screens/GuardHomeScreen';
import AddVisitorScreen from './src/screens/AddVisitorScreen';
import TakeVisitorPhotoScreen from './src/screens/TakeVisitorPhotoScreen';
import VisitorOTPVerificationScreen from './src/screens/VisitorOTPVerificationScreen';
import TeacherClassDetailForPhoto from './src/screens/TeacherClassDetailForPhoto';
import TeacherTakeStudentPhoto from './src/screens/TeacherTakeStudentPhoto';
import addStudentPhoto from './src/screens/TeacherTakeStudentPhoto/addStudentPhoto';
import takeStudentPhoto from './src/screens/TeacherTakeStudentPhoto/takeStudentPhoto';
import UpdateTeacherPhoto from './src/screens/ProfileScreen/updateTeacherPhoto';

// Admin Leads
import AdminLeadsScreen from './src/screens/AdminLeadsScreen';

// Admin Prospectus and Addmission Screens
import AdminProsAdmissionScreen from './src/screens/AdminProsAdmissionScreen';

//admin photo gallery screens
import PhotoGalleryFolderScreen from './src/screens/AdminPhotoGalleryScreens/PhotoGalleryFolderScreen';
import PhotoGalleryScreen from './src/screens/AdminPhotoGalleryScreens/PhotoGalleryScreen';
import PhotoGalleryViewerScreen from './src/screens/AdminPhotoGalleryScreens/PhotoGalleryViewerScreen';
// admin attendance
import AdminAttendanceStudentTab from './src/screens/AdminAttendanceStudentTab';
import AbsentStudentReport from './src/screens/AdminAttendanceStudentTab/AbsentStudentReport';
import AdminTakeAttendance from './src/screens/AdminAttendanceStudentTab/AdminTakeAttendance';
import AdminAttendanceTeacherTab from './src/screens/AdminAttendanceTeacherTab';
// admin school Profile
import AdminSchoolProfile from './src/screens/AdminSchoolProfileScreen';
import AdminEditSchoolProfile from './src/screens/AdminEditSchoolProfile';

// Admin Student Summary
import AdminGetDetailStudentSummary from './src/screens/AdminGetDetailStudentSummaryScreen';
import AdminStudentSummary from './src/screens/AdminStudentSummaryScreen';
import AdminStudentProfile from './src/screens/AdminStudentSummaryScreen/componentScreen/AdminStudentProfileComponent';
import AdminResult from './src/screens/AdminStudentSummaryScreen/componentScreen/AdminResultComponent';
import Attendance from './src/screens/AdminStudentSummaryScreen/componentScreen/Attendance';
import AdminFee from './src/screens/AdminStudentSummaryScreen/componentScreen/AdminFee';
import PaidFeesComponent from './src/screens/AdminStudentSummaryScreen/componentScreen/PaidFeesComponent';

// admin visitor
import AdminVisitor from './src/screens/AdminVisitorScreen';
// AdminFeedback
import AdminFeedback from './src/screens/AdminFeedbackScreen';
import AdminSuggestionForm from './src/screens/AdminFeedbackScreen/AdminSuggestionFormScreen';
// AdminRaiseComplaint
import AdminRaiseComplaint from './src/screens/AdminRaiseComplaintScreen';
// AdminHomework
import AdminHomework from './src/screens/AdminHomeworkScreen';
// Admin Teacher Detail
import AdminTeacherDetail from './src/screens/AdminTeacherDetailScreen';
import AdminGetTeacherDetail from './src/screens/AdminGetTeacherDetail';

// Icons
import ic_attendance_black from './src/assets/icons/drawer_icons/teacher_attendance.png';
import student_attendance from './src/assets/icons/drawer_icons/student_attendance.png';
import studentSummary from './src/assets/icons/drawer_icons/studentSummary.png';
import student_photo from './src/assets/icons/drawer_icons/student_photo.png';
import ic_calendar_black from './src/assets/icons/drawer_icons/ic_calendar_black.png';
import ic_check_fee_black from './src/assets/icons/drawer_icons/ic_check_fee_black.png';
import ic_fee_black from './src/assets/icons/drawer_icons/ic_fee_black.png';
import ic_home_black from './src/assets/icons/drawer_icons/ic_home_black.png';
import ic_library_black from './src/assets/icons/drawer_icons/ic_library_black.png';
import ic_logout_black from './src/assets/icons/drawer_icons/ic_logout_black.png';
import ic_notice_board_black from './src/assets/icons/drawer_icons/ic_notice_board_black.png';
import ic_timetable_black from './src/assets/icons/drawer_icons/ic_timetable_black.png';
import ic_gallery from './src/assets/icons/drawer_icons/ic_gallery.png';
import ic_hostel from './src/assets/icons/drawer_icons/ic_hostel.png';
import ic_results from './src/assets/icons/drawer_icons/ic_results.png';
import ic_tranport from './src/assets/icons/drawer_icons/ic_tranport.png';
import ic_date_sheet from './src/assets/icons/drawer_icons/ic_date_sheet.png';
import ic_change_password from './src/assets/icons/drawer_icons/ic_change_password.png';
import ic_assignment_black from './src/assets/icons/drawer_icons/ic_assignment_black.png';
import ic_view_profile_black from './src/assets/icons/drawer_icons/ic_view_profile_black.png';
import ic_notification from './src/assets/icons/drawer_icons/ic_notification.png';
import ic_gatepass from './src/assets/icons/drawer_icons/ic_gatepass.png';
import ic_my_suggestion from './src/assets/icons/drawer_icons/ic_my_suggestion.png';
import schoolProfile from './src/assets/icons/drawer_icons/ic_school_black.png';
import ic_homeWork_black from './src/assets/icons/drawer_icons/ic_homeWork_black.png';
import id_card_black from './src/assets/icons/drawer_icons/id_card_black.png';
import ic_lead_black from './src/assets/icons/drawer_icons/ic_lead_black.png';
import ic_Prospectus_manager from './src/assets/icons/drawer_icons/ic_Prospectus_manager.png';
import ic_complaint_black from './src/assets/icons/drawer_icons/ic_complaint_black.png';
import ic_visitor_black from './src/assets/icons/drawer_icons/ic_visitor_black.png';
// Admin take Student Photos
import AdminTakeStudentPhoto from './src/screens/AdminTakeStudentPhotoScreen';
import AdminTakePhoto from './src/screens/AdminTakeStudentPhotoScreen/AdminTakePhoto';
import takeStudentPhotos from './src/screens/AdminTakeStudentPhotoScreen/AdminTakePhoto/takeStudentPhotos';
import addStudentPhotos from './src/screens/AdminTakeStudentPhotoScreen/AdminTakePhoto/addStudentPhotos';
// User Preference
import {
  getRoleId,
  clearData,
  getTeacherDesignation,
  getActiveSchool,
} from './src/api/UserPreference';
import TeacherCourseTracker from 'screens/TeacherCourseTracker/TeacherCourseTracker';
import AddCourseTracker from 'screens/TeacherCourseTrackerAdd/AddCourseTracker';
import KidsClubSplashScreen from 'screens/KidsClubSPlashScreen/KidsClubSplashScreen';
import NoInternetScreen from 'components/NoInternetScreen';

// Style Sheet
const styles = StyleSheet.create({
  drawerItemIcon: {
    height: wp(5),
    aspectRatio: 1 / 1,
  },
  drawerContentContainer: {
    flex: 1,
  },
  drawerLabel: {
    fontSize: wp(3),
  },
});

// ---------------------------- Navigation set up -------------------------------
const setDrawerItemIcon = itemIcon => ({
  drawerIcon: (
    <Image source={itemIcon} resizeMode="cover" style={styles.drawerItemIcon} />
  ),
});

const drawerContentContainerInset = {
  top: 'always',
  horizontal: 'never',
};

const onLogoutYesPress = nav => async () => {
  try {
    // Clearing user preferences from local storage
    await clearData();

    // Resetting Navigation to initial state for login again
    nav.navigate('LoggedOut');
  } catch (error) {
    console.log(error.message);
  }
};
const onCheckData = nav => async () => {
  try {
    // Clearing user preferences from local storage

    // Resetting Navigation to initial state for login again
    nav.goBack();
  } catch (error) {
    console.log(error.message);
  }
};

const onDrawerItemPress = props => async route => {
  const designationData = await getTeacherDesignation();
  // console.log('designationData', designationData);
  if (route.route.routeName !== 'Logout') {
    if (designationData !== 'Class Teacher' && designationData !== null) {
      if (
        route.route.routeName === 'Student Photo' ||
        route.route.routeName === 'Attendance'
      ) {
        props.navigation.closeDrawer();
        Alert.alert(
          'Alert !',
          'You are not aurthorised for this services',
          [
            {text: 'NO', style: 'cancel'},
            {text: 'YES', onPress: onCheckData(props.navigation)},
          ],
          {
            cancelable: false,
          },
        );
        return;
      }
    }
    props.onItemPress(route);
    return;
  }

  // If 'Logout' route pressed
  props.navigation.closeDrawer();

  Alert.alert(
    'Logout',
    'Are you sure, you want to logout?',
    [
      {text: 'NO', style: 'cancel'},
      {text: 'YES', onPress: onLogoutYesPress(props.navigation)},
    ],
    {
      cancelable: false,
    },
  );
};

const CustomDrawerContentComponent = props => (
  <ScrollView>
    <SafeAreaView
      style={styles.drawerContentContainer}
      forceInset={drawerContentContainerInset}>
      <DrawerItems
        {...props}
        onItemPress={onDrawerItemPress(props)}
        activeTintColor="#1ba2de"
        labelStyle={styles.drawerLabel}
      />
    </SafeAreaView>
  </ScrollView>
);

const AddNoticeStackNavigator = createStackNavigator(
  {
    NoticeBoard: AdminNoticeBoardScreen,
    noticeBoardSlider: noticeBoardSlider,
  },
  {
    initialRouteName: 'NoticeBoard',
    headerMode: 'none',
  },
);

// const HostelDetailStackNavigator = createStackNavigator(
//   {
//     Hostel: AdminHostelScreen,
//     HostelDetail: AdminHostelDtlScreen,
//   },
//   {
//     initialRouteName: 'Hostel',
//   },
// );

// const TransportDetailStackNavigator = createStackNavigator(
//   {
//     Transport: AdminTransportScreen,
//     TransportDetail: AdminTransportDtlScreen,
//   },
//   {
//     initialRouteName: 'Transport',
//   },
// );

const AdminLibraryStackNavigator = createStackNavigator(
  {
    AdminLibrary: AdminLibraryScreen,
    AdminLibraryBookSearch: AdminLibraryBookSearchScreen,
    AdminLibraryBookSearchResult: AdminLibraryBookSearchResultScreen,
  },
  {
    initialRouteName: 'AdminLibrary',
    headerMode: 'none',
  },
);

const AdminHomeStackNavigator = createStackNavigator(
  {
    AdminDashBoard: AdminDashBoardScreen,
    AdminSearch: AdminSearchScreen,
  },
  {
    initialRouteName: 'AdminDashBoard',
    headerMode: 'none',
  },
);

const AdminTimeTableStackNavigator = createStackNavigator(
  {
    AdminTimeTable: AdminTimeTableScreen,
    AdminTimeTableDetail: AdminTimeTableDetailScreen,
  },
  {
    initialRouteName: 'AdminTimeTable',
    headerMode: 'none',
  },
);

const AdminSchoolProfileNavigator = createStackNavigator(
  {
    'School Profile': AdminSchoolProfile,
    EditSchoolProfile: AdminEditSchoolProfile,
  },
  {
    initialRouteName: 'School Profile',
    headerMode: 'none',
  },
);
const AdminStudentSummaryNavigator = createStackNavigator(
  {
    'Student Summary': AdminGetDetailStudentSummary,
    GetDetailSummary: AdminStudentSummary,
    AdminStudentProfile: AdminStudentProfile,
    AdminResult: AdminResult,
    Attendance: Attendance,
    AdminFee: AdminFee,
    StPaidFeeDetail: PaidFeesComponent,
    StTotalFeeDetail: TotalFeeScreen,
    StDueFeeDetail: DueFeeScreen,
    StOutstandingDetail: OutstandingScreen,
  },
  {
    initialRouteName: 'Student Summary',
    headerMode: 'none',
  },
);
const AdminAttendanceStudentNavigator = createStackNavigator(
  {
    'Student Attendance': AdminAttendanceStudentTab,
    AdminTakeAttendance: AdminTakeAttendance,
    AdminStudentAbsent: StudentAbsentScreen,
    AbsentStudentReport: AbsentStudentReport,
  },
  {
    initialRouteName: 'Student Attendance',
    headerMode: 'none',
  },
);

const AdminTeacherDetailNavigator = createStackNavigator(
  {
    'Teacher Detail': AdminTeacherDetail,
    AdminGetTeacherDetail: AdminGetTeacherDetail,
  },
  {
    initialRouteName: 'Teacher Detail',
    headerMode: 'none',
  },
);

const AdminPhotoGalleryNavigator = createStackNavigator(
  {
    ' Gallery': PhotoGalleryFolderScreen,
    PhotoGallery: PhotoGalleryScreen,
    PhotoGalleryViewer: PhotoGalleryViewerScreen,
  },
  {
    initialRouteName: ' Gallery',
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);
const AdminSuggestionNavigator = createStackNavigator(
  {
    'Raise Complaint': AdminSuggestionForm,
    AdminSuggestionForm: AdminFeedback,
  },
  {
    initialRouteName: 'Raise Complaint',
    headerMode: 'none',
  },
);
const AdminTakeStudentPhotoStackNavigator = createStackNavigator(
  {
    'Student Photos': AdminTakeStudentPhoto,
    AdminTakePhoto: AdminTakePhoto,
    takeStudentPhotos: takeStudentPhotos,
    addStudentPhotos: addStudentPhotos,
  },
  {
    initialRouteName: 'Student Photos',
    headerMode: 'none',
  },
);
const AdminDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: AdminHomeStackNavigator,
      navigationOptions: setDrawerItemIcon(ic_home_black),
    },
    'School Profile': {
      screen: AdminSchoolProfileNavigator,
      navigationOptions: setDrawerItemIcon(schoolProfile),
    },
    'Student Photo': {
      screen: AdminTakeStudentPhotoStackNavigator,
      navigationOptions: setDrawerItemIcon(student_photo),
    },
    'Staff Attendance': {
      screen: AdminAttendanceTeacherTab,
      navigationOptions: setDrawerItemIcon(ic_attendance_black),
    },
    'Student Summary': {
      screen: AdminStudentSummaryNavigator,
      navigationOptions: setDrawerItemIcon(studentSummary),
    },

    'Student Attendance': {
      screen: AdminAttendanceStudentNavigator,
      navigationOptions: setDrawerItemIcon(student_attendance),
    },
    Homework: {
      screen: AdminHomework,
      navigationOptions: setDrawerItemIcon(ic_homeWork_black),
    },
    'Teacher Detail': {
      screen: AdminTeacherDetailNavigator,
      navigationOptions: setDrawerItemIcon(id_card_black),
    },
    Fees: {
      screen: AdminFeeScreen,
      navigationOptions: setDrawerItemIcon(ic_fee_black),
    },

    // 'Check Fee': {
    //   screen: AdminCheckFeeScreen,
    //   navigationOptions: setDrawerItemIcon(ic_check_fee_black),
    // },
    'Time Table': {
      screen: AdminTimeTableStackNavigator,
      navigationOptions: setDrawerItemIcon(ic_timetable_black),
    },
    Notification: {
      screen: AddNoticeStackNavigator,
      navigationOptions: setDrawerItemIcon(ic_notice_board_black),
    },
    Library: {
      screen: AdminLibraryStackNavigator,
      navigationOptions: setDrawerItemIcon(ic_library_black),
    },
    Calendar: {
      screen: AdminCalendarScreen,
      navigationOptions: setDrawerItemIcon(ic_calendar_black),
    },
    'Date Sheet/Syllabus': {
      screen: AdminDateSheetScreen,
      navigationOptions: setDrawerItemIcon(ic_date_sheet),
    },

    Visitor: {
      screen: AdminVisitor,
      navigationOptions: setDrawerItemIcon(ic_visitor_black),
    },
    'Raise Complaint': {
      screen: AdminSuggestionNavigator,
      navigationOptions: setDrawerItemIcon(ic_complaint_black),
    },

    Gallery: {
      screen: AdminPhotoGalleryNavigator,
      navigationOptions: setDrawerItemIcon(ic_gallery),
    },
    Leads: {
      screen: AdminLeadsScreen,
      navigationOptions: setDrawerItemIcon(ic_lead_black),
    },
    'Prospectus & Admission': {
      screen: AdminProsAdmissionScreen,
      navigationOptions: setDrawerItemIcon(ic_Prospectus_manager),
    },
    // Transport: {
    //   screen: TransportDetailStackNavigator,
    //   navigationOptions: setDrawerItemIcon(ic_tranport),
    // },
    // Hostel: {
    //   screen: HostelDetailStackNavigator,
    //   navigationOptions: setDrawerItemIcon(ic_hostel),
    // },
    // 'Change Password': {
    //   screen: TeacherChangePasswordScreen,
    //   navigationOptions: setDrawerItemIcon(ic_change_password),
    // },
    Logout: {
      screen: 'NoScreen',
      navigationOptions: setDrawerItemIcon(ic_logout_black),
    },
  },
  {
    initialRouteName: 'Home',
    unmountInactiveRoutes: true,
    overlayColor: 'rgba(0,0,0,0.7)',
    contentComponent: CustomDrawerContentComponent,
  },
);

//* Teacher Drawer Navigator

const AssignmentStackNavigator = createStackNavigator(
  {
    Assignment: AssignmentScreen,
    AddAssignment: AddAssignmentScreen,
  },
  {
    initialRouteName: 'Assignment',
    headerMode: 'none',
  },
);

const TakeAttendanceStackNavigator = createStackNavigator(
  {
    Attendance: TeacherAttendanceScreen,
    TakeAttendance: StudentAttendanceScreen,
    StudentAbsent: StudentAbsentScreen,
  },
  {
    initialRouteName: 'Attendance',
    headerMode: 'none',
  },
);
const TakeStudentPhotoStackNavigator = createStackNavigator(
  {
    'Student Photo': TeacherClassDetailForPhoto,
    TeacherTakeStudentPhoto: TeacherTakeStudentPhoto,
    takeStudentPhoto: takeStudentPhoto,
    addStudentPhoto: addStudentPhoto,
  },
  {
    initialRouteName: 'Student Photo',
    headerMode: 'none',
  },
);
const UpdateProfileNavigator = createStackNavigator(
  {
    'View Profile': ProfileScreen,
    UpdateTeacherPhoto: UpdateTeacherPhoto,
  },
  {
    initialRouteName: 'View Profile',
    headerMode: 'none',
  },
);
const TeacherLibraryStackNavigator = createStackNavigator(
  {
    TeacherLibrary: LibraryHomeScreen,
    LibraryBookSearch: LibraryBookSearchScreen,
    LibraryBookSearchResult: LibraryBookSearchResultScreen,
  },
  {
    initialRouteName: 'TeacherLibrary',
    headerMode: 'none',
  },
);

const TeacerNotificationStackNavigator = createStackNavigator(
  {
    NoticeBoard: TeacherNotificationScreen,
    teachersideNoticeSlider: teachersideNoticeSlider,
  },
  {
    initialRouteName: 'NoticeBoard',
    headerMode: 'none',
  },
);
const TeacherCourseTrackerStackNavigator = createStackNavigator(
  {
    TeacherCourseTracker: TeacherCourseTracker,
    AddCourseTracker: AddCourseTracker,
    // LibraryBookSearchResult: LibraryBookSearchResultScreen,
  },
  {
    initialRouteName: 'TeacherCourseTracker',
    headerMode: 'none',
  },
);
const ClassTeacherDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: TeacherDashBoardScreen,
      navigationOptions: setDrawerItemIcon(ic_home_black),
    },
    Attendance: {
      screen: TakeAttendanceStackNavigator,
      navigationOptions: setDrawerItemIcon(ic_attendance_black),
    },
    'Student Photo': {
      screen: TakeStudentPhotoStackNavigator,
      navigationOptions: setDrawerItemIcon(student_photo),
    },

    'Time Table': {
      screen: StudentTimeTableScreen,
      navigationOptions: setDrawerItemIcon(ic_timetable_black),
    },
    Homework: {
      screen: AssignmentStackNavigator,
      navigationOptions: setDrawerItemIcon(ic_assignment_black),
    },
    Calendar: {
      screen: AdminCalendarScreen,
      navigationOptions: setDrawerItemIcon(ic_calendar_black),
    },
    // 'Notice Board': {
    //   screen: NoticeBoardScreen,
    //   navigationOptions: setDrawerItemIcon(ic_notice_board_black),
    // },
    Notification: {
      screen: TeacerNotificationStackNavigator,
      navigationOptions: setDrawerItemIcon(ic_notice_board_black),
    },
    Library: {
      screen: TeacherLibraryStackNavigator,
      navigationOptions: setDrawerItemIcon(ic_library_black),
    },
    'Date Sheet/Syllabus': {
      screen: TeacherDateSheetScreen,
      navigationOptions: setDrawerItemIcon(ic_date_sheet),
    },
    Gallery: {
      screen: AdminPhotoGalleryNavigator,
      navigationOptions: setDrawerItemIcon(ic_gallery),
    },
    'View Profile': {
      screen: UpdateProfileNavigator,
      navigationOptions: setDrawerItemIcon(ic_view_profile_black),
    },
    // 'Photo Gallery': {
    //  screen: GalleryScreen,
    //  navigationOptions: setDrawerItemIcon(ic_gallery),
    // },
    // Transport: {
    //  screen: TransportScreen,
    //  navigationOptions: setDrawerItemIcon(ic_tranport),
    // },
    // 'Change Password': {
    //   screen: TeacherChangePasswordScreen,
    //   navigationOptions: setDrawerItemIcon(ic_change_password),
    // },
    CourseTracker: {
      screen: TeacherCourseTrackerStackNavigator,
      navigationOptions: setDrawerItemIcon(ic_view_profile_black),
    },
    Logout: {
      screen: 'NoScreen',
      navigationOptions: setDrawerItemIcon(ic_logout_black),
    },
  },
  {
    initialRouteName: 'Home',
    overlayColor: 'rgba(0,0,0,0.7)',
    contentComponent: CustomDrawerContentComponent,
  },
);

const TakePaidFeeStackNavigator = createStackNavigator(
  {
    PaidFee: FeeScreen,
    PaidFeeDetail: PaidFee,
    TotalFeeDetail: TotalFeeScreen,
    DueFeeDetail: DueFeeScreen,
    OutstandingDetail: OutstandingScreen,
  },
  {
    initialRouteName: 'PaidFee',
    headerMode: 'none',
  },
);

const GatePassStackNavigator = createStackNavigator(
  {
    MyGatePass: MyGatePassScreen,
    RequestGatePass: RequestGatePassScreen,
  },
  {
    initialRouteName: 'MyGatePass',
    headerMode: 'none',
  },
);

const MySuggestionStackNavigator = createStackNavigator(
  {
    MySuggestion: MySuggestionScreen,
    AddMySuggestion: AddMySuggestionScreen,
  },
  {
    initialRouteName: 'MySuggestion',
    headerMode: 'none',
  },
);

const LibraryStackNavigator = createStackNavigator(
  {
    LibraryHome: LibraryHomeScreen,
    LibraryBookSearch: LibraryBookSearchScreen,
    LibraryBookSearchResult: LibraryBookSearchResultScreen,
  },
  {
    initialRouteName: 'LibraryHome',
    headerMode: 'none',
  },
);

const StudentNotificationDetailkNavigator = createStackNavigator(
  {
    Notification: StudentNotificationScreen,
    StudentNotificationDetail: StudentNotificationDetail,
  },
  {
    initialRouteName: 'Notification',
    headerMode: 'none',
  },
);
const StudentGalleryNavigator = createStackNavigator(
  {
    GalleryScreen: GalleryScreen,
    PhotoGalleryDetail: PhotoGalleryDetail,
  },
  {
    initialRouteName: 'GalleryScreen',
    headerMode: 'none',
  },
);

const StudentDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: DashBoardScreen,
      navigationOptions: setDrawerItemIcon(ic_home_black),
    },

    Attendance: {
      screen: AttendanceScreen,
      navigationOptions: setDrawerItemIcon(ic_attendance_black),
    },
    Homework: {
      screen: StudentAssignmentScreen,
      navigationOptions: setDrawerItemIcon(ic_assignment_black),
    },
    'Time Table': {
      screen: StudentTimeTableScreen,
      navigationOptions: setDrawerItemIcon(ic_timetable_black),
    },

    Results: {
      screen: ResultScreen,
      navigationOptions: setDrawerItemIcon(ic_results),
    },
    Notification: {
      screen: StudentNotificationDetailkNavigator,
      navigationOptions: setDrawerItemIcon(ic_notification),
    },
    Library: {
      screen: LibraryStackNavigator,
      navigationOptions: setDrawerItemIcon(ic_library_black),
    },
    Calendar: {
      screen: AdminCalendarScreen,
      navigationOptions: setDrawerItemIcon(ic_calendar_black),
    },
    'Date Sheet/Syllabus': {
      screen: DateSheetScreen,
      navigationOptions: setDrawerItemIcon(ic_date_sheet),
    },
    // Transport: {
    //  screen: TransportScreen,
    //  navigationOptions: setDrawerItemIcon(ic_tranport),
    // },
    Gallery: {
      screen: AdminPhotoGalleryNavigator,
      navigationOptions: setDrawerItemIcon(ic_gallery),
    },
    // Hostel: {
    //  screen: HostelScreen,
    //  navigationOptions: setDrawerItemIcon(ic_hostel),
    // },

    Fees: {
      screen: TakePaidFeeStackNavigator,
      navigationOptions: setDrawerItemIcon(ic_fee_black),
    },
    // 'Notice Board': {
    //   screen: NoticeBoardScreen,
    //   navigationOptions: setDrawerItemIcon(ic_notice_board_black),
    // },

    'Gate Pass': {
      screen: GatePassStackNavigator,
      navigationOptions: setDrawerItemIcon(ic_gatepass),
    },
    'My Suggestion': {
      screen: MySuggestionStackNavigator,
      navigationOptions: setDrawerItemIcon(ic_my_suggestion),
    },
    'View Profile': {
      screen: ProfileScreen,
      navigationOptions: setDrawerItemIcon(ic_view_profile_black),
    },
    // 'Change Password': {
    //   screen: StudentChangePasswordScreen,
    //   navigationOptions: setDrawerItemIcon(ic_change_password),
    // },
    Logout: {
      screen: 'NoScreen',
      navigationOptions: setDrawerItemIcon(ic_logout_black),
    },
  },
  {
    initialRouteName: 'Home',
    overlayColor: 'rgba(0,0,0,0.7)',
    contentComponent: CustomDrawerContentComponent,
  },
);

const SchoolStudentListStackNavigator = createStackNavigator(
  {
    SchoolList: SchoolListScreen,
    StudentList: StudentListScreen,
  },
  {
    initialRouteName: 'SchoolList',
    headerMode: 'none',
  },
);

const StudentSwitchNavigator = createSwitchNavigator(
  {
    SchoolStudentList: SchoolStudentListStackNavigator,
    StudentDrawer: StudentDrawerNavigator,
  },
  {
    initialRouteName: 'SchoolStudentList',
  },
);

const GuardStackNavigator = createStackNavigator(
  {
    Home: GuardHomeScreen,
    AddVisitor: AddVisitorScreen,
    TakeVisitorPhoto: TakeVisitorPhotoScreen,
    VisitorOTPVerification: VisitorOTPVerificationScreen,
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  },
);

const LoginStackNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    ForgotPassword: ForgotPasswordScreen,
    OTPVerification: OTPVerificationScreen,
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },
);

const createRootNavigator = roleId => {
  const ROUTES = {
    // LoggedOut routes
    LoggedOut: LoginStackNavigator,

    // LoggedIn routes
    StudentHome: StudentSwitchNavigator,
    TeacherHome: ClassTeacherDrawerNavigator,
    GuardHome: GuardStackNavigator,
    AdminHome: AdminDrawerNavigator,
  };

  let initialRouteName = 'LoggedOut';

  if (roleId) {
    switch (roleId) {
      case 'STUDENT':
        initialRouteName = 'StudentHome';
        break;

      case 'TEACHER':
        initialRouteName = 'TeacherHome';
        break;

      case 'GUARD':
        initialRouteName = 'GuardHome';
        break;

      case 'ADMIN':
        initialRouteName = 'AdminHome';
    }
  }

  return createSwitchNavigator(ROUTES, {initialRouteName});
};

// ------------------- App Component -------------------
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      roleId: null,
      desiData: null, //  TEACHER - ADMIN - student
      isOffline: false,
      isConnected: true,
    };
    // this.notif = new notification(
    //   this.onRegister.bind(this),
    //   this.onNotif.bind(this),
    // );
  }

  async componentDidMount() {
    this.unsubscribeNetInfo = NetInfo.addEventListener(state => {
      this.setState({isConnected: state.isConnected});
    });
    // Initial setup
    setTimeout(this.initialSetup, 3000);

    // this.getAsyncDataDesignation();
    createOnTokenRefreshListener(this);
    // Adding firebase listeners
    createNotificationListeners(this);
  }

  componentWillUnmount() {
    // Removing firebase listeners
    removeOnTokenRefreshListener(this);
    removeNotificationListeners(this);
  }

  initialSetup = async () => {
    try {
      await checkPermission(this);
      // Fetching roleId
      const roleId = await getRoleId();
      this.setState({roleId, isLoading: false});
    } catch (error) {
      console.log(error.message);
    }
  };

  setNavigatorRef = ref => {
    nsSetTopLevelNavigator(ref);
  };

  render() {
    const {isLoading, isConnected} = this.state;
    if (isLoading) {
      return <SplashScreen />;
    }
    if (!isConnected) {
      return <NoInternetScreen />;
    }
    const {roleId, desiData} = this.state;
    const RootNavigator = createRootNavigator(roleId, desiData);
    const AppContainer = createAppContainer(RootNavigator);
    return (
      // <InternetConnectionAlert
      //   onChange={connectionState => {
      //     console.log('Connection State: ', connectionState);
      //   }}>
      <RootSiblingParent>
        <SafeAreaProvider>
          <AppContainer ref={this.setNavigatorRef} />
        </SafeAreaProvider>
      </RootSiblingParent>
      // </InternetConnectionAlert>
    );
  }
}
