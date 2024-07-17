// import React, {Component} from 'react';
// import {View, Text, TouchableOpacity, FlatList} from 'react-native';
// import {withNavigation} from 'react-navigation';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import {styles} from './styles';
// class YourComponent extends Component {
//   onSchoolNamePress = (item, index) => {
//     console.log('==', item);
//     this.props.navigation.navigate('AdminTakePhoto', {item});
//   };

//   onAbsentDataPress = (item, index) => {
//     if (item[3] !== 0) {
//       console.log('==', item[3] !== 0);
//       // this.props.navigation.navigate('AbsentStudentReport', { data: item });
//     }
//   };

//   renderItemItem = ({item, index}) => {
//     return (
//       <View>
//         <TouchableOpacity onPress={() => this.onSchoolNamePress(item, index)}>
//           {index === 1 ? (
//             <Text
//               style={index === 1 ? {fontWeight: '700', width: wp(50)} : null}>
//               {item}
//             </Text>
//           ) : index === 2 ? (
//             <Text style={index === 2 ? {width: wp(19)} : null}>{item}</Text>
//           ) : index === 3 ? (
//             // <TouchableOpacity onPress={() => this.onAbsentDataPress(item, index)}>
//             <Text
//               style={index === 3 ? {fontWeight: '700', width: wp(19)} : null}>
//               {item}
//             </Text>
//           ) : // </TouchableOpacity>
//           index === 0 ? (
//             <Text
//               style={{
//                 width: wp(12),
//                 textAlign: 'left',
//                 paddingLeft: 5,
//                 paddingTop: -5,
//               }}>
//               {item}
//             </Text>
//           ) : null}
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   render() {
//     const {item} = this.props;
//     const assignmentInfoList = {
//       backgroundColor:
//         '#' +
//         (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6) +
//         0x15,
//       padding: wp(2),
//       // borderWidth: 1,
//       // borderColor: '#00000015',
//       borderRadius: wp(2),
//       paddingVertical: wp(5),
//       marginBottom: wp(3),
//     };
//     return (
//       <View style={styles.schoolStyle}>
//         <View style={assignmentInfoList}>
//           <FlatList
//             data={item}
//             renderItem={this.renderItemItem}
//             keyExtractor={this.keyExtractor}
//             ItemSeparatorComponent={this.itemSeparator2}
//             numColumns={4}
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={{paddingTop: wp(2)}}
//           />
//         </View>
//       </View>
//     );
//   }
// }

// export default withNavigation(YourComponent);
