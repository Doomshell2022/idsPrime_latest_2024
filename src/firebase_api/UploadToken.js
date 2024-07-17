import {UPLOAD_TOKEN, makeRequest} from '../api/ApiInfo';
import {getData, getActiveSchool} from '../api/UserPreference';

const uploadToken = async fcmToken => {
  try {
    const activeSchool = await getActiveSchool();
    if (!activeSchool) {
      return;
    }

    // fetching empId from local storage
    const userInfo = await getData();
    console.log('====================================');
    console.log('456', userInfo);
    console.log('====================================');
    if (!userInfo) {
      return;
    }

    const {idsprimeID} = activeSchool;
    const {roleId} = userInfo;

    // preparing userId
    let userId = null;
    if (roleId === 'STUDENT') {
      const {userdetail: students} = activeSchool;
      const studentIds = students.map(student => student.id);
      userId = studentIds.join();
      console.log('ss23232', userId);
    } else if (roleId === 'TEACHER') {
      userId = userInfo.empId;
    } else if (roleId === 'ADMIN') {
      userId = userInfo.empId;
      console.log('skhush', userId);
    } else {
      userId = userInfo.empId;
    }

    if (fcmToken) {
      // preparing params
      const params = {
        idsprimeID,
        userId,
        roleId,
        token: fcmToken,
      };
      console.log('123456', params);

      // calling api
      const response = await makeRequest(UPLOAD_TOKEN, params, true, true);

      // processing response
      if (response) {
        const {success} = response;

        if (success) {
          // persisting fcmToken
          console.log('upload token successfully');
        } else {
          // persisting fcmToken
          console.log('upload token Fail');
        }
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

export default uploadToken;
