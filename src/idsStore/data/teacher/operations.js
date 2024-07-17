import * as actions from './actions';
import {
  BASE_URL,
  GET_TEACHER_INFO,
  GET_TEACHER_DATE_SHEET,
  GET_TEACHER_ISSUED_BOOKS,
  GET_STUDENT_ATTENDANCE_PANEL,
  FETCH_TEACHER_ASSIGNMENTS,
  GET_TEACHER_CLASS_DETAILS,
  GET_SUBJECT_DETAILS,
  DELETE_ASSIGNMENT,
  GET_STUDENT_ATTENDANCE_LIST,
  UPDATE_STUDENT_ATTENDANCE,
  GET_TEACHER_CLASS_LIST,
  GET_SECTION_DETAILS,
  ASSIGN_ASSIGNMENT,
  UPDATE_PROFILE_IMAGE,
  makeRequest,
  GET_COURSE_TRACKER,
  DELETE_COURSE_TRACKER,
} from 'api/ApiInfo';
import {getData, getActiveSchool} from 'api/UserPreference';
import moment from 'moment';

export const getTeacherInfo = () => async dispatch => {
  try {
    // fetching active school from local storage
    const activeSchool = await getActiveSchool();
    if (!activeSchool) {
      return;
    }

    // fetching empId from local storage
    const userInfo = await getData();
    if (!userInfo) {
      return;
    }

    const {idsprimeID} = activeSchool;
    const {empId} = userInfo;

    // preparing params
    const params = {
      empId,
      idsprimeID,
    };

    // calling api
    const response = await makeRequest(GET_TEACHER_INFO, params);

    // processing response
    return dispatch(actions.getTeacherInfo(response));
  } catch (error) {
    console.log(error.message);
  }
};
export const updateProfilePhoto = photo => async dispatch => {
  try {
    // fetching active school from local storage
    const activeSchool = await getActiveSchool();
    if (!activeSchool) {
      return;
    }

    // fetching empId from local storage
    const userInfo = await getData();
    if (!userInfo) {
      return;
    }

    const {idsprimeID} = activeSchool;
    const {empId} = userInfo;
    const visitorPhoto = {
      uri: photo.uri,
      type: 'image/jpeg',
      name: 'visitor_photo.jpg',
      size: 100,
    };
    // preparing params
    const params = {
      teacherId: empId,
      photo: visitorPhoto,
      idsprimeID,
    };
    console.log('params', params);
    // calling api
    const response = await makeRequest(
      UPDATE_PROFILE_IMAGE,
      params,
      true,
      false,
    );

    console.log('response', response);
    // processing response
    return dispatch(actions.updateProfilePhoto(response));
  } catch (error) {
    console.log('error from update profile image');
  }
};

export const getTeacherClassList = () => async dispatch => {
  try {
    // fetching active school from local storage
    const activeSchool = await getActiveSchool();
    if (!activeSchool) {
      return;
    }

    // fetching empId from local storage
    const userInfo = await getData();
    if (!userInfo) {
      return;
    }

    const {idsprimeID} = activeSchool;
    const {empId} = userInfo;

    // preparing params
    const params = {
      teacherId: empId,
      idsprimeID,
    };

    // calling api
    const response = await makeRequest(GET_TEACHER_CLASS_LIST, params);
    return dispatch(actions.getTeacherClassList(response));
  } catch (error) {}
};
export const getSectionDetails = classId => async dispatch => {
  try {
    // fetching active school from local storage
    const activeSchool = await getActiveSchool();
    if (!activeSchool) {
      return;
    }

    const {idsprimeID} = activeSchool;

    // preparing params
    const params = {
      class_id: classId,
      idsprimeID,
    };

    // calling api
    const response = await makeRequest(GET_SECTION_DETAILS, params);
    return dispatch(actions.getSectionDetails(response));
  } catch (error) {}
};

export const getDateSheet = () => async dispatch => {
  try {
    // fetching active school from local storage
    const activeSchool = await getActiveSchool();
    if (!activeSchool) {
      return;
    }

    // fetching empId from local storage
    const userInfo = await getData();
    if (!userInfo) {
      return;
    }

    const {idsprimeID} = activeSchool;
    const {empId} = userInfo;

    // Preparing params
    const params = {
      teacherId: empId,
      idsprimeID,
    };

    // calling api
    const response = await makeRequest(GET_TEACHER_DATE_SHEET, params);

    // processing response
    return dispatch(actions.getDateSheet(response));
  } catch (error) {
    console.log(error.message);
  }
};

export const getIssuedBooks = () => async dispatch => {
  try {
    // fetching active school from local storage
    const activeSchool = await getActiveSchool();
    if (!activeSchool) {
      return;
    }

    // fetching empId from local storage
    const userInfo = await getData();
    if (!userInfo) {
      return;
    }

    const {idsprimeID} = activeSchool;
    const {empId} = userInfo;

    // Preparing params
    const params = {
      teacherId: empId,
      idsprimeID,
    };

    // calling api
    const response = await makeRequest(GET_TEACHER_ISSUED_BOOKS, params);
    return dispatch(actions.getIssuedBooks(response));
  } catch (error) {
    console.log(error.message);
  }
};

// ATTENDANCE_DETAILS
export const getStudentAttendancePanel = () => async dispatch => {
  // fetching active school from local storage
  const activeSchool = await getActiveSchool();
  if (!activeSchool) {
    return;
  }

  // fetching empId from local storage
  const userInfo = await getData();
  if (!userInfo) {
    return;
  }

  const {idsprimeID} = activeSchool;
  const {empId} = userInfo;

  // preparing params
  const params = {
    teacher_id: empId,
    idsprimeID: idsprimeID,
  };

  // calling api
  const response = await makeRequest(GET_STUDENT_ATTENDANCE_PANEL, params);
  return dispatch(actions.getStudentAttendancePanel(response));
};
export const getStudentAttendanceList =
  (classId, sectionId) => async dispatch => {
    // fetching active school from local storage
    const activeSchool = await getActiveSchool();
    if (!activeSchool) {
      return;
    }

    // fetching empId from local storage
    const userInfo = await getData();
    if (!userInfo) {
      return;
    }

    const {idsprimeID} = activeSchool;
    const {empId} = userInfo;

    // preparing params
    const params = {
      teacher_id: empId,
      class_id: classId,
      section_id: sectionId,
      idsprimeID,
    };

    // calling api
    const response = await makeRequest(GET_STUDENT_ATTENDANCE_LIST, params);

    return dispatch(actions.getStudentAttendanceList(response));
  };
export const updateStudentAttendance =
  (classId, sectionId, presentStudents, absentStudents) => async dispatch => {
    try {
      // fetching active school from local storage
      const activeSchool = await getActiveSchool();
      if (!activeSchool) {
        return;
      }

      // fetching empId from local storage
      const userInfo = await getData();
      if (!userInfo) {
        return;
      }

      const {idsprimeID} = activeSchool;
      const {empId} = userInfo;

      // preparing params
      const params = {
        employee_id: empId,
        class_id: classId,
        section_id: sectionId,
        present_students: presentStudents,
        absent_students: absentStudents,
        idsprimeID,
      };

      // calling api
      const response = await makeRequest(UPDATE_STUDENT_ATTENDANCE, params);
      return dispatch(actions.updateStudentAttendance(response));
    } catch (error) {}
  };
// assignment
export const getAssignment = date => async dispatch => {
  try {
    // fetching active school from local storage
    const activeSchool = await getActiveSchool();
    if (!activeSchool) {
      return;
    }

    // fetching empId from local storage
    const userInfo = await getData();
    if (!userInfo) {
      return;
    }

    const {idsprimeID} = activeSchool;
    const {empId} = userInfo;
    // if (date === null) {
    //   const currentDate = moment().format('YYYY-MM-DD');
    //   date = currentDate;
    // }
    // console.log('====================================');
    // console.log('Date from => ', date);
    // console.log('====================================');
    // preparing params
    const params = {
      employee_id: empId,
      idsprimeID,
      date: date,
    };
    // console.log('====================================');
    // console.log('!!!!!!!!!!', params);
    // console.log('====================================');
    // calling api
    const response = await makeRequest(FETCH_TEACHER_ASSIGNMENTS, params);
    // Alert.alert('', FETCH_TEACHER_ASSIGNMENTS);
    return dispatch(actions.getAssignment(response));
  } catch (error) {}
};

export const getTeacherClassDetails = () => async dispatch => {
  try {
    // fetching active school from local storage
    const activeSchool = await getActiveSchool();
    if (!activeSchool) {
      return;
    }

    // fetching empId from local storage
    const userInfo = await getData();
    if (!userInfo) {
      return;
    }

    const {idsprimeID} = activeSchool;
    const {empId} = userInfo;

    // preparing params
    const params = {
      t_id: empId,
      idsprimeID,
    };

    // calling api
    const response = await makeRequest(GET_TEACHER_CLASS_DETAILS, params);
    return dispatch(actions.getTeacherClassDetails(response));
  } catch (error) {}
};

export const getSubjectDetails = (classId, sectionId) => async dispatch => {
  try {
    // fetching active school from local storage
    const activeSchool = await getActiveSchool();
    if (!activeSchool) {
      return;
    }

    // fetching empId from local storage
    const userInfo = await getData();
    if (!userInfo) {
      return;
    }

    const {idsprimeID} = activeSchool;
    const {empId} = userInfo;

    // preparing params
    const params = {
      clas_id: classId,
      sec_id: sectionId,
      teach_id: empId,
      idsprimeID,
    };

    // calling api
    const response = await makeRequest(GET_SUBJECT_DETAILS, params);
    return dispatch(actions.getSubjectDetails(response));
  } catch (error) {}
};

export const addAssignment = params => async dispatch => {
  try {
    const response = await makeRequest(
      BASE_URL + 'addassignment',
      params,
      true,
      false,
    );
    return dispatch(actions.addAssignment(response));
  } catch (error) {}
};

export const deleteAssignment = assignmentId => async dispatch => {
  try {
    // fetching active school from local storage
    const activeSchool = await getActiveSchool();
    if (!activeSchool) {
      return;
    }

    const {idsprimeID} = activeSchool;

    // preparing params
    const params = {
      assignment_id: assignmentId,
      idsprimeID,
    };

    // calling api
    const response = await makeRequest(DELETE_ASSIGNMENT, params);
    return dispatch(actions.deleteAssignment(response));
  } catch (error) {}
};

export const assignAssignment =
  (assignmentId, classId, sectionId, submissionDate) => async dispatch => {
    try {
      // fetching active school from local storage
      const activeSchool = await getActiveSchool();
      if (!activeSchool) {
        return;
      }

      // Fetching empId from local storage
      const userInfo = await getData();
      if (!userInfo) {
        return;
      }

      const {idsprimeID} = activeSchool;
      const {empId} = userInfo;

      // Preparing params
      const params = {
        teacher_id: empId,
        assignment_id: assignmentId,
        class_id: classId,
        section_id: sectionId,
        due_date: submissionDate,
        idsprimeID,
      };

      // calling api
      const response = await makeRequest(ASSIGN_ASSIGNMENT, params);
      return dispatch(actions.assignAssignment(response));
    } catch (error) {}
  };

// student List
export const getStudentList = (classId, sectionId) => async dispatch => {
  // fetching active school from local storage
  const activeSchool = await getActiveSchool();
  if (!activeSchool) {
    return;
  }

  // fetching empId from local storage
  const userInfo = await getData();
  if (!userInfo) {
    return;
  }

  const {idsprimeID} = activeSchool;
  const {empId} = userInfo;

  // preparing params
  const params = {
    teacher_id: empId,
    class_id: classId,
    section_id: sectionId,
    idsprimeID,
  };

  // calling api
  const response = await makeRequest(BASE_URL + 'studentList', params);
  return dispatch(actions.getStudentList(response));
};
export const studentUploadImage = (student_id, photo) => async dispatch => {
  try {
    // fetching active school from local storage
    const activeSchool = await getActiveSchool();
    if (!activeSchool) {
      return;
    }

    // fetching empId from local storage
    const userInfo = await getData();
    if (!userInfo) {
      return;
    }

    const {idsprimeID} = activeSchool;
    const visitorPhoto = {
      uri: photo.uri,
      type: 'image/jpeg',
      name: 'visitor_photo.jpg',
      size: 90,
    };
    // preparing params
    const params = {
      student_id,
      file: visitorPhoto,
      idsprimeID,
    };

    // calling api
    const response = await makeRequest(
      BASE_URL + 'studentuploadimage',
      params,
      true,
      false,
    );
    return dispatch(actions.studentUploadImage(response));
  } catch (error) {}
};

export const addCourseTracker = params => async dispatch => {
  try {
    const response = await makeRequest(
      BASE_URL + 'addCoursetracker',
      params,
      true,
      false,
    );
    return dispatch(actions.addCourseTracker(response));
  } catch (error) {}
};
export const fetchCourseTracker =
  (date, selectedClassId, selectedSectionId) => async dispatch => {
    try {
      // fetching active school from local storage
      const activeSchool = await getActiveSchool();
      if (!activeSchool) {
        return;
      }

      // fetching empId from local storage
      const userInfo = await getData();
      if (!userInfo) {
        return;
      }

      const {idsprimeID} = activeSchool;
      const {empId} = userInfo;
      // if (date === null) {
      // const currentDate = moment().format('YYYY-MM-DD');
      // date = currentDate;
      // }
      // preparing params
      const params = {
        teacherId: empId,
        idsprimeID,
        date: date,
        classId: selectedClassId,
        sec_id: selectedSectionId,
      };
      // console.log('====================================');
      // console.log('ds', params);
      // console.log('====================================');
      // calling api
      const response = await makeRequest(GET_COURSE_TRACKER, params);
      // Alert.alert('', FETCH_TEACHER_ASSIGNMENTS);
      return dispatch(actions.fetchCourseTracker(response));
    } catch (error) {}
  };
export const deleteCoursetracker = assignmentId => async dispatch => {
  try {
    // fetching active school from local storage
    const activeSchool = await getActiveSchool();
    if (!activeSchool) {
      return;
    }

    const {idsprimeID} = activeSchool;

    // preparing params
    const params = {
      trackerId: assignmentId,
      idsprimeID,
    };

    // calling api
    const response = await makeRequest(DELETE_COURSE_TRACKER, params);
    return dispatch(actions, deleteCoursetracker(response));
  } catch (error) {}
};
