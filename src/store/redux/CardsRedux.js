import {createActions, createReducer} from 'reduxsauce/lib/reduxsauce';
import Immutable from 'seamless-immutable';

const {Types, Creators} = createActions({
  getAllCards: null,
  getAllCardsSuccess: ['allCards', 'cardsByMechanics'],
  getAllCardsError: ['error'],
  resetCardsState: null,
});

const INITIAL_STATE = Immutable({
  allCards: [],
  cardsByMechanics: null,
  error: '',
  fetching: false,
});

export const CardsActionTypes = Types;
export default Creators;

export const getAllCards = state => {
  return state.merge({fetching: true, error: INITIAL_STATE.error});
};

export const getAllCardsSuccess = (state, {allCards, cardsByMechanics}) =>
  state.merge({fetching: INITIAL_STATE.fetching, allCards, cardsByMechanics});

export const getAllCardsError = (state, {error}) =>
  state.merge({error, fetching: INITIAL_STATE.fetching});

export const reset = () => INITIAL_STATE;

export const cardsReducer = createReducer(INITIAL_STATE, {
  [Types.GET_ALL_CARDS]: getAllCards,
  [Types.GET_ALL_CARDS_SUCCESS]: getAllCardsSuccess,
  [Types.GET_ALL_CARDS_ERROR]: getAllCardsError,
  [Types.RESET_CARDS_STATE]: reset,
});
