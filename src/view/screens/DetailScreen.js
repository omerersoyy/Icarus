import React, {useState} from 'react';
import connect from 'react-redux/lib/connect/connect';
import {useDispatch} from 'react-redux';
import {FlatList, View, Image} from 'react-native';
import Card from '../components/Card';

const DetailScreen = ({cardsByMechanics, selectedCardMechanic}) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const renderItem = ({item}) => {
    const {img, name, type} = item;
    return <Card img={img} label={name} title={type} />;
  };

  const increasePage = () => setPage(p => p + 1);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}>
      <FlatList
        data={cardsByMechanics[selectedCardMechanic].slice(0, page * 10) ?? []}
        renderItem={renderItem}
        onEndReached={increasePage}
        onEndReachedThreshold={0.8}
      />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    cardsByMechanics: state.cards.cardsByMechanics,
    selectedCardMechanic: state.cards.selectedCardMechanic,
  };
};
export default connect(mapStateToProps)(DetailScreen);
