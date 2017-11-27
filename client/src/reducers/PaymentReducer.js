
const initailState = {
  payment_accounts: []
}

export default (state = initailState, action) => {
  switch(action.type) {
    case ('FETCH_PAYMENT_ACCOUNT'):{
      return action.payload
    }
    default:
      return state
  }
}