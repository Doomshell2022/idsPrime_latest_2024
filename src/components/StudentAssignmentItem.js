import React from 'react';
import {
  View,
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const StudentAssignmentItem = props => {
  const handleAttachmentDownload = async () => {
    try {
      const url = props.item.file;
      Linking.openURL(url);
    } catch (error) {
      console.log(error.message);
    }
  };

  const item = props.item;

  // Function to determine text color based on background brightness
  const getTextColor = backgroundColor => {
    // Convert hex color to RGB
    const hexToRgb = hex =>
      hex.match(/[A-Za-z0-9]{2}/g).map(v => parseInt(v, 16));

    const [r, g, b] = hexToRgb(backgroundColor);
    // Calculate relative luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Return white text for dark backgrounds and black text for light backgrounds
    return luminance > 0.5 ? '#000' : '#FFF';
  };

  // Extracting created date from item.info
  const createdDate = item;
  console.log('====================================');
  console.log('s', createdDate);
  console.log('====================================');
  const backgroundColor = randomLightColor();

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <View style={styles.assignmentInfoContainer}>
        <Text style={[styles.title, {color: getTextColor(backgroundColor)}]}>
          {item.info[0]}{' '}
          <Text
            style={{
              color: getTextColor(backgroundColor),
              fontSize: wp(3),
            }}>
            ({item.info[3]})
          </Text>
        </Text>

        <Text style={[styles.subtitle, {color: getTextColor(backgroundColor)}]}>
          {item.info[1]}
        </Text>
        <Text
          style={[styles.description, {color: getTextColor(backgroundColor)}]}>
          {item.info[2]}
        </Text>
      </View>

      {props.item.file && (
        <TouchableOpacity
          style={styles.downloadButton}
          onPress={handleAttachmentDownload}>
          <Image
            source={require('../assets/icons/downloaded.png')}
            style={styles.downloadIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const randomLightColor = () => {
  return '#' + ((Math.random() * 0xcccccc) | 0).toString(16);
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp(3),
    borderRadius: wp(5),
    marginBottom: hp(2),
    elevation: 2,
  },
  assignmentInfoContainer: {
    flex: 1,
  },
  title: {
    fontSize: wp(4),
    fontWeight: 'bold',
    marginBottom: hp(0.5),
  },
  subtitle: {
    fontSize: wp(3.5),
    marginBottom: hp(0.5),
  },
  description: {
    fontSize: wp(3.5),
  },
  downloadButton: {
    backgroundColor: '#FFD700', // Light yellow color
    padding: wp(2),
    borderRadius: wp(5),
  },
  downloadIcon: {
    width: wp(4),
    height: wp(4),
    tintColor: '#333', // Dark gray color
  },
});

export default StudentAssignmentItem;
