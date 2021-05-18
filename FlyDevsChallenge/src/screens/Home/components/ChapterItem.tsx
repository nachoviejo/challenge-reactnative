import React, {useEffect, useRef, useState} from 'react';
import {Image, StyleSheet, Text, View, Modal} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {chapterSelector, IChapter} from '../../../redux/chapterSlice';
import ChapterDetails from './ChapterDetails';
// import {
//   ICharacter,
//   randomCharacterSelector,
// } from '../../../redux/characterReducer';
import {loadingSelector} from '../../../redux/loadingReducer';
import {colors} from '../../../shared/styles/colors';
import {requestTypes} from '../../../shared/utils/actionsInterface';

interface Props {
  chapterId: string;
}
const ChapterItem = ({chapterId}: Props) => {
  const chapter: IChapter = useSelector(chapterSelector(Number(chapterId)));
  const [modalVisible, setModalVisible] = useState(false);
  const loading = useSelector(loadingSelector([requestTypes.characters]));
  const random = useRef<number>();
  const image = `https://rickandmortyapi.com/api/character/avatar/${random.current}.jpeg`;
  //Select random chapter because the API does not provide an episode image so we need to show
  //an character image.
  // const character: ICharacter = useSelector(randomCharacterSelector());

  useEffect(() => {
    random.current = Math.floor(Math.random() * 671);
  }, []);

  const showModal = () => setModalVisible(true);

  const hideModal = () => setModalVisible(false);

  return (
    <>
      {!loading && (
        <TouchableOpacity style={styles.container} onPress={showModal}>
          <View>
            <Image
              source={{
                uri: image,
              }}
              style={styles.image}
            />
          </View>
          <View style={{flexDirection: 'column', justifyContent: 'center'}}>
            <View style={styles.row}>
              <Text style={styles.bold}>{chapter.name}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.bold}>Created: </Text>
              <Text style={styles.data}>{chapter.name}</Text>
            </View>
          </View>
          <Modal visible={modalVisible} transparent={true}>
            <ChapterDetails
              chapter={chapter}
              image={image}
              hideModal={hideModal}
            />
          </Modal>
        </TouchableOpacity>
      )}
    </>
  );
};

export default ChapterItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: '2%',
    marginHorizontal: '5%',
    borderRadius: 5,
    borderWidth: 0.4,
    shadowOffset: {
      width: 4,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 7,
    backgroundColor: colors.background,
  },
  image: {
    flex: 1,
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginHorizontal: '8%',
    marginVertical: '0.2%',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000AA',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
  },
});
