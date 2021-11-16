import connect from 'react-redux/lib/connect/connect';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import CardsRedux from '../../store/redux/CardsRedux';
import Dummy from '../../../DummyData.js';

const MainScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CardsRedux.getAllCards());
  }, [dispatch]);

  useEffect(() => {
    let cardsByMechanics = {};
    const allCards = [];

    Object.values(Dummy).forEach((cardSet, _idx) => {
      cardSet.forEach((card, _id) => {
        allCards.push(card);

        if (card.hasOwnProperty('mechanics')) {
          card.mechanics.forEach(({name}, _key) => {
            let mechanicGroup = cardsByMechanics[name] || [];
            mechanicGroup.push(card);
            cardsByMechanics[name] = mechanicGroup;
          });
        }
      });
    });
    console.log(cardsByMechanics);
    console.log(allCards);
    dispatch(CardsRedux.getAllCardsSuccess(allCards, cardsByMechanics));
  }, []);

  return null;
};

const mapStateToProps = state => {
  return {
    state,
  };
};
export default connect(mapStateToProps)(MainScreen);
