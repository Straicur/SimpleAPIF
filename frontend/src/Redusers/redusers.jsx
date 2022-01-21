import { combineReducers } from 'redux';


export const AddToken = (value)=>({
    type:'SET_TOKEN',
    payload:{value}
})
// export const selectToken = state => state.token.token

const token = (state ="", action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return { ...state, token: action.payload.value };

        default:
            return  state ;
    }
};

export default combineReducers({ token });