import { combineReducers } from 'redux';


const roads = (state = [], action) => {
    console.log('HEHEBHEHEHHEHEHEHEHEEH', action.payload)
    switch (action.type) {
      case 'SET_STREETS':
        return action.payload;
      default:
        return state;
    }
}

    export default roads
        // storeThumbnails,