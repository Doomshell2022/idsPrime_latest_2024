import React, {Component} from 'react';
import {
  View,
  Image,
  Linking,
  FlatList,
  TouchableHighlight,
  StyleSheet,
  AppState,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Components
import ScreenHeader from 'components/ScreenHeader';
import ScreenFooter from 'components/ScreenFooter';
import {SafeAreaView} from 'react-native-safe-area-context';
// import CustomLoader from '../components/CustomLoader';

import GalleryComponent from './GalleryComponent';

// API
// import {makeRequest, BASE_URL} from '../api/ApiInfo';
import {heightPercentageToDP} from 'react-native-responsive-screen';
// Images

// Icons
import ic_header_option_icon from 'assets/icons/ic_header_option_icon.png';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      galleryData: [
        {
          albumName: 'Events',
          thumbnail: 'https://www.daac.in/images/vb1.webp',
          albumData: [
            {
              description: 'Test',
              albumImage: 'https://www.daac.in/images/vb1.webp',
            },
          ],
        },
        {
          albumName: 'Office',
          thumbnail: 'https://www.daac.in/images/mb3.webp',
          albumData: [
            {
              description: 'Test',
              albumImage: 'https://www.daac.in/images/vb1.webp',
            },
          ],
        },
      ],

      notificationCount: 0,
    };
  }

  renderItem = ({item}) => (
    <GalleryComponent item={item} nav={this.props.navigation} />
  );

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  render() {
    const {images: sliderImages, blogs} = this.state;
    const {navigation} = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <ScreenHeader
          title="Gallery"
          showSchoolLogo
          nav={this.props.navigation}
        />
        <FlatList
          data={this.state.galleryData}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          ItemSeparatorComponent={this.itemSeparator}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContentContainer}
          numColumns={2}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  listContentContainer: {
    marginTop: heightPercentageToDP(2),
    padding: 8,
  },
  separator: {
    height: 8,
  },
});
