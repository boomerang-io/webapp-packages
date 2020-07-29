/* eslint-disable no-console*/
import axios from "axios";

/**
 * Reducer boilerplate to make api calls
 *
 * @param {Obj} actions - object with actions regarding this request
 * @param {Obj} config - axios config
 * @example
 * const appsOverviewReset = () => ({ type: types.APPS_OVERVIEW_RESET });
 * const fetchAppsOverviewRequest = () => ({ type: types.FETCH_APPS_OVERVIEW_REQUEST });
 * const fetchAppsOverviewSuccess = data => ({ type: types.FETCH_APPS_OVERVIEW_SUCCESS, data });
 * const fetchAppsOverviewFailure = error => ({ type: types.FETCH_APPS_OVERVIEW_FAILURE, error });
 *
 * const fetchActionCreators = {
 *	reset: appsOverviewReset,
 *	request: fetchAppsOverviewRequest,
 *	success: fetchAppsOverviewSuccess,
 *	failure: fetchAppsOverviewFailure
 * };
 *
 * const fetchApi = requestFactory(fetchActionCreators);
 * const fetchAppsOverview = url => dispatch => dispatch(fetchApi.request({ method: "get", url }));
 * // fecthAppsOverview is called with param url and dispatch the fetchApi method request with the url
 * const cancelFetchAppsOverview = () => dispatch => dispatch(fecthApi.cancelRequest());
 */
const thunkRequestFactory = actions => {
  const CancelToken = axios.CancelToken;
  let cancel;

  const cancelRequest = () => {
    return dispatch => {
      console.log("Request canceled");
      cancel("Request Canceled");
      dispatch(actions.reset());
    };
  };

  const request = (config, ...args) => dispatch => {
    dispatch(actions.request(...args));
    return axios(config, {
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      })
    })
      .then(response => {
        dispatch(actions.success(response.data, ...args));
        return Promise.resolve(response);
      })
      .catch(error => {
        console.log("AXIOS Error :-S", error);
        if (axios.isCancel(error)) {
          console.log(error);
          return;
        } else {
          dispatch(actions.failure(error, ...args));
          return Promise.reject(error);
        }
      });
  };

  return {
    request,
    cancelRequest
  };
};

export default thunkRequestFactory;
