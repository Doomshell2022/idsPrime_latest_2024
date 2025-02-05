import React from 'react';
import {
  Text,
  StyleSheet,
  ImageBackground,
  TouchableHighlight,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const ImageGalleryFolderComponent = props => {
  // preparing info
  const {item} = props;
  const {name, images} = item;
  const [firstImageObj] = images;
  const {image} = firstImageObj;

  // const handelGallery = () => {
  //   props.nav.push('PhotoGallery', {images});
  // };
  const handelGallery = () => {
    props.nav.push('PhotoGalleryViewer', {images});
  };

  return (
    <TouchableHighlight
      underlayColor="transparent"
      onPress={handelGallery}
      style={styles.container}>
      <ImageBackground
        source={{uri: image}}
        resizeMode="cover"
        style={styles.image}>
        <Text numberOfLines={2} style={styles.title}>
          {name}
        </Text>
      </ImageBackground>
    </TouchableHighlight>
  );
};

export default ImageGalleryFolderComponent;

const styles = StyleSheet.create({
  container: {
    width: wp(48.4),
    marginRight: wp(1),
  },
  image: {
    width: '100%',
    aspectRatio: 1 / 1,
    justifyContent: 'flex-end',
  },
  title: {
    color: '#fff',
    backgroundColor: '#00000080',
    padding: wp(1),
    textAlign: 'center',
    fontSize: wp(3.2),
  },
});
