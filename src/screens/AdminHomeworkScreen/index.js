import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';

// Components
import ScreenHeader from 'components/ScreenHeader';
import AdminHomeworkComponent from './AdminHomeworkComponent';
import CustomLoader from 'components/CustomLoader';
// Icons
import ic_search_black from 'assets/icons/ic_search_black.png';
// Api
import {BASE_URL, makeRequest} from 'api/ApiInfo';
// API
import {connect} from 'react-redux';
import {adminOperations, adminSelectors} from 'idsStore/data/admin';
import PickerModal from 'react-native-picker-modal-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ic_down from 'assets/icons/ic_down.png';

class AdminHomeworkScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      pickerModalKey: 0,
      infoArr1: [],
      infoArr2: [],
      isLoading: false,
      infoArr: null,
      message: null,
      isListRefreshing: true,
      classes: [],
      originalData: [],
      selectedData: {
        Id: -1,
        Name: 'Select Class',
        Value: 'Select Class',
      },
      // data: [
      //   {
      //     Id: 1,
      //     Name: 'khush',
      //     Value: 'khush',
      //   },
      // ],
    };

    this.titleArr = [
      'Subject',
      'Submission Date',
      'Description',
      'Class',
      'Given By',
      'Section Name',
    ];
  }

  componentDidMount() {
    // subscribing to didFocus listener
    this.fetchAssignments();
    // this.didFocusSubscription = this.props.navigation.addListener(
    //   'didFocus',
    //   () => {
    //     this.fetchAssignments();
    //   },
    // );
  }

  // componentWillUnmount() {
  //   // unsubscribing from didFocus listener
  //   this.didFocusSubscription.remove();
  // }

  fetchAssignments = async () => {
    try {
      // starting loader
      this.setState({isLoading: true});

      // calling api
      await this.props.adminGetHomework();
      const response = this.props.isAdminGetHomework;

      if (response !== null) {
        if (response.success === 1) {
          const assignments = response.output; // set default value as empty array
          const classes = response.classes;
          const filteredLeadType = classes ? classes.filter(lt => lt.Name) : [];

          this.setState({
            infoArr: assignments,
            infoArr2: assignments,
            originalData: assignments,
            classes: filteredLeadType,
            isLoading: false,
            isListRefreshing: false,
          });
        } else if (response.success === 0) {
          const classes = response.classes;

          const filteredLeadType = classes ? classes.filter(lt => lt.Name) : [];
          const message = response.message;
          this.setState({
            message,
            infoArr: null,
            classes: filteredLeadType,
            isLoading: false,
            isListRefreshing: false,
          });
        }
      } else {
        const message = response.message;

        this.setState({
          message,
          infoArr: null,
          classes: null,
          isLoading: false,
          isListRefreshing: false,
        });
      }
    } catch (error) {
      const errMessage = error.message;
      console.log(errMessage);
    }
  };

  handleSearch = searchText => {
    this.setState({searchText});
    const searchTextLength = searchText.length;
    const foodProducts = this.state.infoArr2;
    if (searchTextLength === 0 || searchTextLength >= 1) {
      const filteredData = this.state.infoArr.filter(item => {
        const searchPattern = searchText;
        // const searchPattern = searchText;
        const {classname, givenby, subject} = item;
        let data = classname;
        let data2 = givenby;
        let data3 = subject;
        let found = data.indexOf(searchPattern) > -1;
        let found1 = data2.indexOf(searchPattern) > -1;
        let found2 = data3.indexOf(searchPattern) > -1;

        let {selected} = item;
        selected = false;

        if (!found || !found1 || !found2) {
          const {classname, givenby, subject} = item;
          data = classname;
          data2 = givenby;
          data3 = subject;
          found = data.indexOf(searchText) > -1;
          found1 = data2.indexOf(searchText) > -1;
          found2 = data3.indexOf(searchText) > -1;
          // found = data.indexOf(searchText) > -1;
        }
        return found || found1 || found2;
      });
      this.setState({infoArr: filteredData});
    }
    if (searchTextLength === 0) {
      // var ouput2 = foodProducts;
      // console.log('Output', ouput2);
      this.setState({infoArr: foodProducts});
    }
  };

  renderItem = ({item}) => (
    <AdminHomeworkComponent titleArr={this.titleArr} item={item} />
  );

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  handleListRefresh = async () => {
    try {
      // pull-to-refresh
      this.setState({isListRefreshing: true});
      // updating list
      await this.fetchAssignments();
    } catch (error) {
      console.log(error.message);
    }
  };
  handleSelectedData = classes => {
    this.setState({isLoading: true, isListRefreshing: true});
    const {originalData} = this.state;
    const filteredData = originalData.filter(
      e => e.classname.toLowerCase() === classes.Name.toLowerCase(),
    );
    this.setState({
      selectedData: classes,
      infoArr: filteredData,
      isLoading: false,
      isListRefreshing: false,
    });
  };

  handleSelectedDataClose = () => {
    const {selectedData} = this.state;
    this.setState({selectedData});
  };
  renderStatesCategoryPicker = (disabled, selected, showModal, props) => {
    const {selectedData} = this.state;
    const {Name} = selectedData;

    const labelStyle = {
      color: '#000',
      fontSize: wp(3),
    };

    if (Name === '') {
      labelStyle.color = '#777';
    }
    const handlePress = disabled ? null : showModal;

    // Check if selectedData is null and set Name to an empty string
    const displayName = selectedData ? Name : '';
    return (
      <View>
        <TouchableOpacity
          underlayColor="transparent"
          onPress={handlePress}
          style={{
            marginTop: wp(2.5),
            marginLeft: wp(1),
            marginRight: wp(1),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: '#000', fontSize: wp(3)}}>{displayName}</Text>
          <Image source={ic_down} resizeMode="cover" style={styles.downIcon} />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const {classes, data, status} = this.state;
    // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', this.state.classes);
    return this.state.isLoading ? (
      <CustomLoader />
    ) : (
      <SafeAreaView style={styles.container}>
        <ScreenHeader
          title="Homework"
          showSchoolLogo
          nav={this.props.navigation}
        />
        <View
          style={{
            marginRight: wp(3),
            marginLeft: wp(3),
            marginTop: wp(3),
            marginBottom: wp(3),
            // width: hp(22),
            height: wp(10),
            borderRadius: wp(1),
            borderWidth: 1,
            borderColor: '#ccc',
          }}>
          <PickerModal
            items={classes}
            searchInputTextColor="#000"
            requireSelection={true}
            selected={this.state.selectedData}
            onSelected={this.handleSelectedData}
            onClosed={this.handleSelectedDataClose}
            showToTopButton={true}
            showAlphabeticalIndex={true}
            autoGenerateAlphabeticalIndex={false}
            searchPlaceholderText="Search Class"
            // isListRefreshing={this.state.selectedData}
            renderSelectView={this.renderStatesCategoryPicker}
          />
        </View>
        {/* {
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Search by Class Name"
              placeholderTextColor="#666"
              style={styles.searchBar}
              onChangeText={value => this.handleSearch(value)}
              value={this.state.searchText}
            />1234
            <TouchableOpacity>
              <Image
                source={ic_search_black}
                resizeMode="cover"
                style={styles.searchIcon}
              />
            </TouchableOpacity>
          </View>
        } */}
        {this.state.infoArr === null ? (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{this.state.message}</Text>
          </View>
        ) : (
          <FlatList
            data={this.state.infoArr}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            ItemSeparatorComponent={this.itemSeparator}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContentContainer}
            refreshing={this.state.isListRefreshing}
            onRefresh={this.handleListRefresh}
          />
        )}
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  isAdminGetHomework: adminSelectors.isAdminGetHomework(state),
});
const mapDispatchToProps = {
  adminGetHomework: adminOperations.adminGetHomework,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminHomeworkScreen);
