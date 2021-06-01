import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {IChapter} from '../../../redux/chapterSlice';
import {colors} from '../../../shared/styles/colors';

interface Props {
  chapter: IChapter;
  image: string;
  hideModal: () => void;
}

const deviceHeigh: number = Dimensions.get('window').height;

const imageChaptercontainer = ({chapter, image, hideModal}: Props) => {
  const _touchable = () => {
    hideModal();
  };

  return (
    <TouchableWithoutFeedback onPress={_touchable}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: image,
            }}
            style={styles.image}
          />
          <View style={styles.textContainer}>
            <View style={styles.boldView}>
              <Text style={styles.bold}>{chapter.name}</Text>
            </View>
            <View style={styles.boldView}>
              <Text style={styles.bold}>Episode: </Text>
              <Text style={styles.data}>{chapter.episode}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default imageChaptercontainer;

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    borderRadius: 5,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    backgroundColor: '#000000AA',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    marginHorizontal: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
    maxHeight: deviceHeigh * 0.5,
  },
  boldView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'left',
  },
  data: {
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'left',
    color: colors.grey,
  },
  textContainer: {
    justifyContent: 'flex-start',
    textAlign: 'left',
    marginTop: '3%',
    marginRight: '30%',
  },
});
