import expect from 'expect';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { asyncMiddleware } from 'redux-amrc';
import { load, loadSuccess } from 'redux-amrc/lib/redux';
import nock from 'nock';
import config from '../../../config';
import counter, {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
  increment,
  decrement,
  incrementIfOdd,
  incrementAsync,
  loadCounter,
  loadCounterIfNeeded
} from '../counter';


const middlewares = [thunk, asyncMiddleware];
const mockStore = configureStore(middlewares);
const data = { value: 100 };

function setup(state = {}) {
  global.__SERVER__ = true;
  global.__COOKIE__ = null;
  nock('http://' + config.host + ':' + config.port)
    .get('/api/counter')
    .reply(200, data);
  return mockStore(state);
}

describe('common', () => {
  describe('redux', () => {
    describe('counter actions test', () => {
      afterEach(() => {
        nock.cleanAll();
      });
      it('increment should create increment action', () => {
        expect(increment()).toEqual({ type: INCREMENT_COUNTER });
      });

      it('decrement should create decrement action', () => {
        expect(decrement()).toEqual({ type: DECREMENT_COUNTER });
      });

      it('incrementIfOdd should create increment action', () => {
        const expectedActions = [
          { type: INCREMENT_COUNTER }
        ];
        const getState = { async: { counter: { value: 1 } } };
        const store = mockStore(getState);
        store.dispatch(incrementIfOdd());
        expect(store.getActions()).toEqual(expectedActions);
      });

      it('incrementIfOdd shouldnt create increment action if counter is even', () => {
        const expectedActions = [];
        const getState = { async: { counter: { value: 2 } } };
        const store = mockStore(getState);
        store.dispatch(incrementIfOdd());
        expect(store.getActions()).toEqual(expectedActions);
      });

      it('incrementAsync should create increment action', (done) => {
        const expectedActions = [
          { type: INCREMENT_COUNTER }
        ];
        const getState = { async: { counter: { value: 0 } } };
        const store = mockStore(getState);
        store.dispatch(incrementAsync(100));
        setTimeout(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        }, 100);
      });
      it('loadCounter should create Load and LOAD_SUCCESS actions and return Promise', () => {
        const expectedActions = [
          load('counter'),
          loadSuccess('counter', data)
        ];
        const store = setup();
        return store.dispatch(loadCounter())
          .then((action) => {
            expect(action).toEqual(loadSuccess('counter', data));
            expect(store.getActions()).toEqual(expectedActions);
          });
      });
      it('loadCounterIfNeeded should dispatch loadCounter if not state.async.loadState.counter.loaded', () => {
        const expectedActions = [
          load('counter'),
          loadSuccess('counter', data)
        ];
        const store = setup({ async: { loadState: { counter: { loaded: false } } } });
        return store.dispatch(loadCounterIfNeeded())
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });
      it('loadCounterIfNeeded shouldn\'t dispatch loadCounter if state.async.loadState.counter.loaded', () => {
        const expectedActions = [];
        const store = setup({ async: { loadState: { counter: { loaded: true } } } });
        return store.dispatch(loadCounterIfNeeded())
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });
    });
    describe('counter reducer test', () => {
      it('counter should handle INCREMENT_COUNTER action', () => {
        expect(counter({
          value: 0
        }, { type: INCREMENT_COUNTER })).toEqual({
          value: 1
        });
      });

      it('counter should handle DECREMENT_COUNTER action', () => {
        expect(counter({
          value: 1
        }, { type: DECREMENT_COUNTER })).toEqual({
          value: 0
        });
      });

      it('counter should ignore unknown actions', () => {
        expect(counter({
          value: 0
        }, { type: 'unknown' })).toEqual({
          value: 0
        });
      });
    });
  });
});
