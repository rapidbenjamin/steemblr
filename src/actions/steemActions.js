import { GET_LOGGED_PROFILE, GET_FOLLOWING } from './types';
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
  console.log(props)
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
