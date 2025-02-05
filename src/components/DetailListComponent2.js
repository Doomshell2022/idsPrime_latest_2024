import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const DetailListComponent2 = props => {
  const renderList = () => {
    let detailList = [];

    function allAreNull(arr) {
      return arr && arr.every(element => element === null);
    }

    if (allAreNull(props.infoArr) === true) {
      return (
        <View style={styles.noData}>
          <Text style={styles.noDataError}>No Fees Collected</Text>
        </View>
      );
    } else {
      for (let i = 0; i < props.titleArr.length; i++) {
        if (
          props.infoArr &&
          props.infoArr.length > i &&
          props.infoArr[i] !== 0
        ) {
          detailList.push(
            props.infoArr[i] !== null ? (
              <View style={styles.userInfoRow} key={i}>
                <Text style={styles.userInfoLeft}>{props.titleArr[i]}</Text>
                <Text style={styles.userInfoCenter}>-</Text>
                <Text style={styles.userInfoRight}>{props.infoArr[i]}</Text>
              </View>
            ) : null,
          );
        }
      }
      props.teacherDesignation === 'Class Teacher' && detailList.splice(0, 2);

      return detailList;
    }
  };

  let containerStyle = styles.userInfo;
  props.skipContainerStyle && (containerStyle = undefined);

  return <View style={containerStyle}>{renderList()}</View>;
};

export default DetailListComponent2;

const styles = StyleSheet.create({
  userInfo: {
    paddingVertical: hp(1),
    borderRadius: 2,

    borderLeftWidth: 3,
    borderLeftColor: '#1ba2de',
  },

  userInfoRow: {
    flexDirection: 'row',
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.25),
    marginBottom: wp(0.5),
  },
  userInfoLeft: {
    width: wp(35),
    fontSize: wp(3.2),
    fontWeight: '600',
    color: '#000',
  },
  userInfoCenter: {
    width: wp(5),
    fontSize: wp(3.2),
    color: '#000',
  },
  userInfoRight: {
    flex: 1,
    fontSize: wp(3.2),
    color: '#000',
  },
  noData: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataError: {
    fontSize: wp(3.2),
    fontWeight: '400',
  },
});
