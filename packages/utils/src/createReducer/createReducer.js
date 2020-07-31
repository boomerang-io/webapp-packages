/**
 * Reducer boilerplate to create reducers
 *
 * @param {Obj} initialState - intial state of reducer
 * @param {Obj} actionHandlers - action types and what they do to state
 * @example
 * const initialState = {
 * 	fetchingState: "",
 * 	data: []
 * }
 * const actionHandlers = {
 * 	APPS_OVERVIEW_RESET: () => {
 *    return { ...initialState };
 *  },
 * 	FETCH_APPS_OVERVIEW_REQUEST: state => {
 *    return { ...state, fetchingState: "fetching" };
 *  },
 * 	FETCH_APPS_OVERVIEW_SUCCESS: (state, action) => {
 *    return { ...state, data: action.data, fetchingState: "success" };
 *  },
 * 	FETCH_APPS_OVERVIEW_FAILURE: state => {
 *    return { ...state, data: [], fetchingState: "failure" };
 *  }
 * };
 *
 * export default createReducer(initialState, actionHandlers);
 */
const createReducer = (initialState, actionHandlers) => {
  return function reducer(state = initialState, action) {
    if (Boolean(actionHandlers[action.type]) && typeof actionHandlers[action.type] === "function") {
      return actionHandlers[action.type](state, action);
    } else {
      return state;
    }
  };
};

export default createReducer;
