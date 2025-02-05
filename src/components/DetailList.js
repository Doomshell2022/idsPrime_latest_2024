import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const DetailList = props => {
  const renderList = () => {
    let detailList = [];

    function allAreNull(arr) {
      return arr && arr.every(element => element === null);
    }
    //     console.log('====================================');
    //     console.log('vidhata3', props.infoArr);
    //     console.log('====================================');
    if (allAreNull(props.infoArr) === true) {
      return (
        <View style={styles.noData}>
          <Text style={styles.noDataError}>No Fees Collected</Text>
        </View>
      );
    } else {
      // console.log('====================================');
      // console.log('vidhata', props.infoArr);
      // console.log('====================================');
      // console.log('====================================');
      // console.log('vidhata2', props.item);
      // console.log('====================================');
      for (let i = 0; props.titleArr2 && i < props.titleArr2.length; i++) {
        props.infoArr[i] !== 0
          ? detailList.push(
              props.infoArr[i] !== null ? (
                <View style={styles.userInfoRow} key={i}>
                  {/* <Text style={styles.userInfoLeft}>{props.titleArr[i]}</Text>
                  <Text style={styles.userInfoCenter}>-</Text> */}
                  <Text style={styles.userInfoRight}>{props.infoArr[i]}</Text>
                </View>
              ) : null,
            )
          : null;
      }

      props.teacherDesignation === 'Class Teacher' && detailList.splice(0, 2);

      return detailList;
    }
  };

  let containerStyle = styles.userInfo;
  props.skipContainerStyle && (containerStyle = undefined);

  return <View style={containerStyle}>{renderList()}</View>;
};
export default DetailList;
const styles = StyleSheet.create({
  userInfo: {
    paddingVertical: hp(1),
    borderRadius: 2,
    backgroundColor: '#000',
    borderLeftWidth: 3,
    borderLeftColor: '#1ba2de',
  },
  userInfoRow: {
    // flexDirection: 'row',
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.25),
    marginBottom: wp(0.5),
  },
  userInfoLeft: {
    width: wp(35),
    fontSize: wp(3),
    fontWeight: 'bold',
  },
  userInfoCenter: {
    width: wp(5),
    fontSize: wp(3),
  },
  userInfoRight: {
    flex: 1,
    fontSize: wp(3),
    color: '#fff',
    fontWeight: 'bold',
  },
  noData: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataError: {
    fontSize: wp(3.5),
    fontWeight: '400',
  },
});
