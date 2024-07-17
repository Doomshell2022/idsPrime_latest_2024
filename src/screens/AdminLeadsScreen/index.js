import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  SafeAreaView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ScreenHeader from 'components/ScreenHeader';
// icons
import ic_enquiry_info from 'assets/icons/ic_enquiry_info.png';
import CustomLoader from 'components/CustomLoader';
import AdminEnquiryComponent from './componentScreen/AdminEnquiryComponent';
// API
import {connect} from 'react-redux';
import {adminOperations, adminSelectors} from 'idsStore/data/admin';
import PickerModal from 'react-native-picker-modal-view';
import ic_down from 'assets/icons/ic_down.png';

class AdminResultComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      visitors: ['Hello', 'hello'],
      currentDate: null,
      status: null,
      isListRefreshing: false,
      showPopupScreen: false,
      popUpData: '',
      results: [],
      originalData: [],
      originalData2: [],
      mode_type: [],
      leadTypes: [],
      addAssignmentButtonZIndex: 0,
      selectedData: {
        Id: -1,
        Name: 'Select Lead Type',
        Value: '',
      },
      selectedData2: {
        Id: -1,
        Name: 'Select Mode Type',
        Value: '',
      },
    };
    //console.log('########', this.state.lead_type);
  }
  componentDidMount() {
    this.handleResultData();
  }
  // handleResultData = async () => {
  //   try {
  //     await this.props.getAdminLeadManagement();
  //     const response = this.props.isGetAdminLeadManagement;
  //     if (response && response.success === 1) {
  //       const {data} = response;
  //       console.log('!@!!!!!!!!', response.data);
  //       const {results, lead_type} = response;
  //       console.log('!!!!!', lead_type);
  //       this.setState({
  //         results: results,
  //         lead_type,
  //         isLoading: false,
  //         isListRefreshing: false,
  //       });
  //     } else {
  //       this.setState({
  //         results: [],
  //         lead_type: [],
  //         isLoading: false,
  //         isListRefreshing: false,
  //       });
  //     }
  //   } catch (error) {
  //     console.log('error in handle result data', error);
  //   }
  // };
  handleResultData = async () => {
    try {
      await this.props.getAdminLeadManagement();
      const response = this.props.isGetAdminLeadManagement;
      if (response && response.success === 1) {
        const {results, lead_type, mode_type} = response;
        const filteredLeadType = lead_type
          ? lead_type.filter(lt => lt.Name)
          : [];
        const filteredmodeType = mode_type
          ? mode_type.filter(lt => lt.Name)
          : [];
        // console.log('lead_type', filteredLeadType);
        // return false;
        this.setState({
          results: results,
          originalData: results,
          originalData2: results,
          leadTypes: filteredLeadType,
          mode_type: filteredmodeType,
          isLoading: false,
          isListRefreshing: false,
        });
      } else {
        this.setState({
          results: [],
          lead_type: [],
          mode_type: [],
          isLoading: false,
          isListRefreshing: false,
        });
      }
    } catch (error) {
      console.log('error in handle result data', error);
    }
  };

  handlePressEnquiryButton = value => {
    this.setState({showPopupScreen: true, popUpData: value});
  };
  renderItem = ({item}) => {
    const listStyle = {
      // borderLeftWidth: 3,
      // backgroundColor: item.bg,
      backgroundColor:
        '#' +
        (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6) +
        0x15,
      // backgroundColor: '#fff',
      borderRadius: 2,
      // padding: wp(1),
      flexDirection: 'row',
      alignItems: 'flex-start',
      // alignItems: 'center',
      padding: wp(3),
      borderWidth: 1,
      borderColor: '#00000015',
    };

    return (
      <View style={listStyle}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flex: 1}}>
            <Text style={styles.listText}>
              {item.name} <Text style={styles.listText2}>({item.class})</Text>
            </Text>
            <View style={styles.listData}>
              <Text style={styles.listText2}>Mobile </Text>
              <Text style={styles.listText3}>-</Text>
              <Text style={styles.listText4}>{item.mobile}</Text>
            </View>
            {/* <View style={styles.listData}>
              <Text style={styles.listText2}>Mode </Text>
              <Text style={styles.listText3}>-</Text>
              <Text style={styles.listText4}>{item.mode}</Text>
            </View> */}
            <View style={styles.listData}>
              <Text style={styles.listText2}>FollowUp</Text>
              <Text style={styles.listText3}>-</Text>
              <Text style={styles.listText4}>{item.followup_date}</Text>
            </View>
            <View style={styles.listData}>
              <Text style={styles.listText2}>Enquiry</Text>
              <Text style={styles.listText3}>-</Text>
              <Text style={styles.listText4}>{item.enquiry_date}</Text>
            </View>
            <View style={styles.listData}>
              <Text style={styles.listText2}>Mode</Text>
              <Text style={styles.listText3}>-</Text>
              <Text style={styles.listText4}>{item.mode}</Text>
            </View>
            <View style={styles.listData}>
              <Text style={styles.listText2}>Lead Type</Text>
              <Text style={styles.listText3}>-</Text>
              <Text style={styles.listText4}>{item.lead_type}</Text>
            </View>
            <Text style={styles.listText5}>{item.remark}</Text>
          </View>
          <TouchableOpacity onPress={() => this.handlePressEnquiryButton(item)}>
            <Image source={ic_enquiry_info} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  handleDownload = async value => {
    try {
      // console.log(value);
      const url = value.result_link;
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        Linking.openURL(url);
      } else {
        Linking.openURL(url);
        // showToast('Unable to handle this url!');
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;
  closePopup = () => {
    this.setState({showPopupScreen: false});
  };
  handleListRefresh = async () => {
    try {
      // pull-to-refresh
      this.setState({isListRefreshing: true});
      await this.handleResultData();
      this.setState({
        selectedData: {
          Id: -1,
          Name: 'Select Lead Type',
          Value: '',
        },
        selectedData2: {
          Id: -1,
          Name: 'Select Mode Type',
          Value: '',
        },
        isListRefreshing: false,
      });
      // await this.handleSelectedData();
      // updating list
    } catch (error) {
      console.log(error.message);
    }
  };
  handleSelectedData = selectedLeadType => {
    const {originalData, selectedData2} = this.state;
    const selectedModeType = selectedData2.Value;

    const filteredResults = originalData.filter(item => {
      return (
        item.lead_type === selectedLeadType.Value &&
        (!selectedModeType || item.mode === selectedModeType)
      );
    });

    this.setState({
      selectedData: selectedLeadType,
      results: filteredResults,
    });
  };

  handleSelectedData2 = selectedModeType => {
    const {originalData2, selectedData} = this.state;
    const selectedLeadType = selectedData.Value;

    const filteredResults = originalData2.filter(item => {
      return (
        item.mode === selectedModeType.Value &&
        (!selectedLeadType || item.lead_type === selectedLeadType)
      );
    });

    this.setState({
      selectedData2: selectedModeType,
      results: filteredResults,
    });
  };

  handleSelectedDataClose = () => {
    const {selectedData} = this.state;
    this.setState({selectedData});
  };
  renderStatesCategoryPicker = (disabled, selected, showModal, props) => {
    const {selectedData, leadTypes} = this.state;

    return (
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedData.Value}
          onValueChange={itemValue =>
            this.handleSelectedData({...selectedData, Value: itemValue})
          }
          style={styles.picker}>
          <Picker.Item
            label={selectedData.Name}
            value=""
            style={styles.pickerItem}
          />
          {leadTypes.map(item => (
            <Picker.Item
              key={item.Id}
              label={item.Name}
              value={item.Value}
              style={styles.pickerItem}
            />
          ))}
        </Picker>
      </View>
    );
  };

  renderStatesCategoryPicker1 = (disabled, selected, showModal, props) => {
    const {selectedData2, mode_type} = this.state;

    return (
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedData2.Value}
          onValueChange={itemValue =>
            this.handleSelectedData2({...selectedData2, Value: itemValue})
          }
          style={styles.picker}>
          <Picker.Item
            label={selectedData2.Name}
            value=""
            style={styles.pickerItem}
          />
          {mode_type.map(item => (
            <Picker.Item
              key={item.Id}
              label={item.Name}
              value={item.Value}
              style={styles.pickerItem}
            />
          ))}
        </Picker>
      </View>
    );
  };
  handleSelectedDataClose2 = () => {
    const {selectedData2} = this.state;
    this.setState({selectedData2});
  };
  // renderStatesCategoryPicker1 = (disabled, selected, showModal, props) => {
  //   const {selectedData2} = this.state;
  //   const {Name} = selectedData2;

  //   const labelStyle = {
  //     color: '#000',
  //     fontSize: wp(3),
  //   };

  //   if (Name === 'Select Educational Level') {
  //     labelStyle.color = '#777';
  //   }

  //   const handlePress = disabled ? null : showModal;

  //   return (
  //     <View>
  //       <TouchableOpacity
  //         underlayColor="transparent"
  //         onPress={handlePress}
  //         style={{
  //           marginTop: wp(2.5),
  //           marginLeft: wp(1),
  //           marginRight: wp(1),
  //           flexDirection: 'row',
  //           alignItems: 'center',
  //           justifyContent: 'space-between',
  //         }}>
  //         <Text style={{color: '#000', fontSize: wp(3)}}>{Name}</Text>
  //         <Image source={ic_down} resizeMode="cover" style={styles.downIcon} />
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };
  // handleListRefresh = async () => {
  //   try {
  //     // Reset selected values to their initial states
  //     this.setState({
  //       selectedData: {
  //         Id: -1,
  //         Name: 'Select Lead Type',
  //         Value: '',
  //       },
  //       selectedData2: {
  //         Id: -1,
  //         Name: 'Select Mode Type',
  //         Value: '',
  //       },
  //       isListRefreshing: true,
  //     });

  //     // Fetch and update the list data
  //     await this.handleResultData();
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  render() {
    const {leadTypes, mode_type} = this.state;
    if (this.state.isLoading) {
      return <CustomLoader />;
    }
    return (
      <SafeAreaView style={styles.container}>
        <ScreenHeader
          title="Leads"
          showSchoolLogo
          nav={this.props.navigation}
        />

        <View style={styles.centeredContainer}>
          {/* <View style={styles.centeredContainer}> */}
          {this.renderStatesCategoryPicker()}
          {this.renderStatesCategoryPicker1()}
          {/* </View> */}
        </View>
        <FlatList
          data={this.state.results}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={this.itemSeparator}
          contentContainerStyle={styles.listContentContainer}
          refreshing={this.state.isListRefreshing}
          onRefresh={this.handleListRefresh}
        />
        {this.state.showPopupScreen && (
          <AdminEnquiryComponent
            closePopup={this.closePopup}
            nav={this.props.navigation}
            item={this.state.popUpData}
          />
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  isGetAdminLeadManagement: adminSelectors.isGetAdminLeadManagement(state),
});
const mapDispatchToProps = {
  getAdminLeadManagement: adminOperations.getAdminLeadManagement,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminResultComponent);

const styles = StyleSheet.create({
  centeredContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: wp(5),
  },
  container: {
    flex: 1,
  },
  downIcon: {
    width: wp(3),
    aspectRatio: 1 / 1,
    marginLeft: wp(2),
  },
  listText: {
    flex: 1,
    fontSize: wp(3.2),
    fontWeight: '700',
  },
  listText2: {
    flex: 1,
    fontSize: wp(3.2),
    fontWeight: '400',
  },
  listText3: {
    paddingRight: wp(2),
    fontSize: wp(3.2),
    fontWeight: '400',
  },
  listText4: {
    flex: 2,
    fontSize: wp(3.2),
    fontWeight: '400',
  },
  listText5: {
    marginTop: wp(2),
    fontSize: wp(3.2),
    fontWeight: '400',
  },
  icon: {
    height: wp(6),
    aspectRatio: 1 / 1,
  },
  listContentContainer: {
    padding: wp(2),
  },
  separator: {
    height: wp(2),
  },
  listData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(5),
    marginLeft: wp(5),
    marginBottom: wp(1),
    height: hp(6), // Increase the height for better visibility
    borderRadius: wp(1),
    borderWidth: 1,
    borderColor: '#ccc',
    overflow: 'hidden',
  },
  picker: {
    flex: 1,
    color: '#000',
  },
  pickerItem: {
    fontSize: wp(3),
  },
});
