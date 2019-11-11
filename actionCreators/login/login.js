import * as dataSource from './dataSource';
import meActionCreator from '../me';
import buildFormActionCreator from '../builders/form';
import buildUpdateDataActionCreator from '../builders/updateData';
import actionTypes, { namespaces } from '../../actionTypes/';
import { Alert } from 'react-native';

const { LOGIN } = actionTypes;

const loginActionCreator = {
  ...buildFormActionCreator(namespaces.LOGIN),
  ...buildUpdateDataActionCreator(namespaces.LOGIN),

  resetMainState() {
    return {
      type: LOGIN.RESET_STATE,
    };
  },

  resetState() {
    return dispatch => {
      dispatch(this.resetMainState());

      dispatch(this.resetFormState());

      dispatch(this.resetUpdateDataState());
    };
  },

  login(emailAddress, password, navigation) {
    return async dispatch => {
      try {
        dispatch(this.updateDataRequest());

        const { data: { access_token: accessToken }} = await dataSource.login(emailAddress, password);
        const { data } = await dataSource.fetchMyInfo(accessToken);

        dispatch(meActionCreator.resetMainState());
        dispatch(meActionCreator.setData(data));

        navigation.replace('Detail');

        dispatch(this.updateDataSuccess());
      } catch (error) {
        let errorMessage;

        if (error.original.error === 'invalid_request') {
          errorMessage = 'The email and password is required!';
        } else if (error.original.error === 'invalid_grant') {
          errorMessage = 'Sorry, it seems your login information is incorrect!';
        } else {
          errorMessage = error.message;
        }

        Alert.alert('Try Again', errorMessage);

        dispatch(this.updateDataFailure(errorMessage));
      }
    };
  },
};

export { loginActionCreator as default };
