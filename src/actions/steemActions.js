import { GET_LOGGED_PROFILE, GET_FOLLOWING, CHANGE_LOGIN_STATUS, GET_PROFILE_VOTES } from './types';
import api from '../Api'
import steem from 'steem'

export const getUserProfile = () => async dispatch => {
  await api.me(function (err, res) {
    if (err !== null) {
      return err
    } else {
      return res
    }
  }).then(res =>
      dispatch({
        type: GET_LOGGED_PROFILE,
        payload: res
      })
    );
};

export const getUserFollowing = (props) => async dispatch => {
  let bucket = [];
  await steem.api.getFollowingAsync(props, 0, 'blog', 1000).then((result) => {
    result.map((item) => {
      bucket.push(item.following)
    })
    return result
  }).then(res => 
      dispatch({
        type: GET_FOLLOWING,
        payload: bucket
      })
    )
}
export const changeLoginStatus = (action) => dispatch => {
  return dispatch({
    type: CHANGE_LOGIN_STATUS,
    payload: action
  })
}

export const getProfileVotes = props => async dispatch => {
  let bucket = []
  await steem.api.getAccountVotesAsync(props).then((result) => {

    result.map((vote) => {
      bucket.push(vote.authorperm)
    })
  }).then(res => 
      dispatch({
        type: GET_PROFILE_VOTES,
        payload: bucket
      })
    )
  


}