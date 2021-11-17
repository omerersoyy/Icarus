import React, {useRef, useState} from 'react';
import connect from 'react-redux/lib/connect/connect';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import CardsRedux from '../../store/redux/CardsRedux';
import {
  FlatList,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Text,
  Dimensions,
  Button,
} from 'react-native';
import ColorScheme from '../utils/ColorScheme';
import MechanicGroupListItem from '../components/MechanicGroupListItem';
import {useNavigation} from '@react-navigation/native';
import SearchResultsListItem from '../components/SearchResultsListItem';
import Card from '../components/Card';
import LoadingIndicator from '../components/LoadingIndicator';

const MainScreen = ({navigation, cardsByMechanics, allCards, fetching}) => {
  const dispatch = useDispatch();
  const nav = useNavigation();
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (allCards.length < 1) {
      dispatch(CardsRedux.getAllCards());
    }
  }, [allCards, dispatch]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          color={ColorScheme.background}
          onPress={() => {
            /*
            since we're using redux-persist to cache cards data
            only trigger the action again if user requests for it
             */
            dispatch(dispatch(CardsRedux.getAllCards()));
          }}
          title="Sync cards"
        />
      ),
    });
  }, [navigation]);

  const handlePressSearchResultItem = cardId => {
    setSelectedCard(searchResults.find(card => card.cardId === cardId));
    setShowModal(true);
    setSearchResults([]);
    inputRef?.current.clear();
  };

  const handleSearch = input => {
    if (input.length < 3) {
      return;
    }
    const result = allCards.filter(c => c.name.includes(input));
    setSearchResults(result.slice(0, 5));
  };

  const renderItem = ({item}) => (
    <MechanicGroupListItem
      label={item}
      badge={cardsByMechanics[item].length}
      onPress={() => {
        dispatch(CardsRedux.setSelectedCardMechanic(item));
        nav.navigate('Detail');
      }}
    />
  );

  return (
    <View style={styles.container}>
      {fetching && <LoadingIndicator />}
      <View style={styles.searchBarContainer}>
        <TextInput
          ref={inputRef}
          clearTextOnFocus
          style={styles.input}
          placeholder={'Search for a card...'}
          placeholderTextColor={ColorScheme.black}
          onChangeText={handleSearch}
        />
        <View style={styles.resultsContainer}>
          {searchResults.map((v, k) => {
            const {cardId, name} = v;
            return (
              <SearchResultsListItem
                key={cardId}
                description={name}
                onPress={() => handlePressSearchResultItem(cardId)}
              />
            );
          })}
        </View>
      </View>
      {!showModal && (
        <FlatList
          data={Object.keys(cardsByMechanics) ?? []}
          renderItem={renderItem}
        />
      )}
      <Modal
        style={styles.modal}
        animationType="slide"
        transparent
        visible={selectedCard !== null && showModal}>
        <View style={styles.modalContentWrapper}>
          <TouchableOpacity
            style={{height: 240}}
            onPress={() => {
              setShowModal(false);
            }}
          />
          <View style={styles.modalContent}>
            {selectedCard !== null &&
              (() => {
                const {img, name, type} = selectedCard;
                return <Card img={img} label={name} title={type} />;
              })()}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    cardsByMechanics: state.cards.cardsByMechanics,
    allCards: state.cards.allCards,
    fetching: state.cards.fetching,
  };
};
export default connect(mapStateToProps)(MainScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarContainer: {
    backgroundColor: ColorScheme.secondary,
  },
  input: {
    height: 50,
    margin: 7,
    color: ColorScheme.white,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: ColorScheme.background,
  },
  resultsContainer: {
    backgroundColor: ColorScheme.info,
    justifyContent: 'center',
    borderRadius: 5,
  },
  modal: {
    margin: 0,
  },
  modalContentWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  modalContent: {
    height: Dimensions.get('window').height - 240,
    backgroundColor: ColorScheme.background,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: 'hidden',
  },
  modalHeader: {
    padding: 13,
    justifyContent: 'center',
  },
  modalHeaderTitle: {
    fontSize: 19,
    color: ColorScheme.text,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
