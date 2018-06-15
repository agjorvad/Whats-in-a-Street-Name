import axios from 'axios';
import { takeEvery, call, put as dispatch } from 'redux-saga/effects';

function* rootSaga()    {
    yield takeEvery('FETCH_STREETS', fetchStreets);
}

function* fetchStreets() {
    try{
      const streetResponse = yield call(axios.get, '/api/street');
      yield dispatch({
        type: 'SET_STREETS',
        payload: streetResponse.data
      })
    } catch (error) {}
  }

//   const streetList = (state = [], action) => {
//     console.log('HEHEBHEHEHHEHEHEHEHEEH', action.payload)
//     switch (action.type) {
//       case 'SET_STREETS':
//         return action.payload;
//       default:
//         return state;
//     }
    
//   };




export default rootSaga;