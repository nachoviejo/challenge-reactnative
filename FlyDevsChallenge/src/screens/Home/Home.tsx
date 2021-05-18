import React, {useEffect, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../../shared/styles/colors';
import ChapterItem from './components/ChapterItem';
import {
  paginationSelector,
  chapterIdSelector,
  fetchChapters,
  cleanChapters,
  Pagination,
} from '../../redux/chapterSlice';
import {loadingSelector} from '../../redux/loadingReducer';
import {requestTypes} from '../../shared/utils/actionsInterface';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  const pagination: Pagination = useSelector(paginationSelector());

  const chaptersId: string[] = useSelector(chapterIdSelector());

  //Loading flag
  const loading = useSelector(loadingSelector([requestTypes.chapters]));

  useEffect(() => {
    dispatch(fetchChapters(pagination.actual, pagination.max, searchQuery));
  });

  const _fetchChapters = () => {
    dispatch(fetchChapters(pagination.actual, pagination.max, searchQuery));
  };

  const _onRefreshHandler = async () => {
    setRefreshing(true);
    await dispatch(
      fetchChapters(pagination.actual, pagination.max, searchQuery),
    );
    setRefreshing(false);
  };

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    dispatch(cleanChapters());
  };

  const renderChapterItem = ({item}: {item: string}) => {
    return <ChapterItem chapterId={item} />;
  };

  const ListEmptyComponent = (
    <View style={styles.emptyComponent}>
      <Text>No Result</Text>
    </View>
  );

  const refreshControl = (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={_onRefreshHandler}
      colors={[colors.white, colors.black]}
      tintColor={colors.white}
    />
  );

  return (
    <>
      <SafeAreaView>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
        />
        {!loading && (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={chaptersId}
            renderItem={renderChapterItem}
            keyExtractor={item => item.toString()}
            refreshControl={refreshControl}
            ListEmptyComponent={ListEmptyComponent}
            onEndReached={_fetchChapters}
            onEndReachedThreshold={0.7}
          />
        )}
      </SafeAreaView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  searchBar: {
    marginHorizontal: '5%',
    marginVertical: '4%',
  },
  emptyComponent: {justifyContent: 'center', alignItems: 'center'},
});
