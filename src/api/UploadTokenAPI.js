import {UPLOAD_TOKEN, makeRequest} from './ApiInfo';
import {getData, getActiveSchool} from './UserPreference';

const uploadToken = async fcmToken => {
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
    const {roleId} = userInfo;

    // preparing userId
    let userId = null;

    if (roleId === 'TEACHER') {
      userId = userInfo.empId;
    } else if (roleId === 'STUDENT') {
      const {userdetail: students} = activeSchool;
      const studentIds = students.map(student => student.id);
      userId = studentIds.join();
    } else if (roleId === 'Admin') {
      userId = userInfo.empId;
      console.log('skhush', userId);
    } else {
      userId = userInfo.empId;
    }

    // preparing params
    const params = {
      idsprimeID,
      userId,
      roleId,
      token: fcmToken,
    };
    console.log('====================================');
    console.log('1234', params);
    console.log('====================================');
    // calling api
    const response = await makeRequest(UPLOAD_TOKEN, params);
    // processing response
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export default uploadToken;
