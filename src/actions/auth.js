import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  AUTHENTICATION_FAIL,
  AUTHENTICATION_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_SUCCESS,
  USERNAME_RESET_FAIL,
  USERNAME_RESET_SUCCESS,
  USERNAME_RESET_CONFIRM_FAIL,
  USERNAME_RESET_CONFIRM_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  ACTIVATION_FAIL,
  ACTIVATION_SUCCESS,
  GOOGLE_AUTH_FAIL,
  GOOGLE_AUTH_SUCCESS,
  GET_JOBS_SUCCESS,
  GET_JOBS_FAIL,
  ADD_JOB_SUCCESS,
  ADD_JOB_FAIL,
  LOGOUT,
} from "./types";
import api from "../api/posts";
import axios from "axios";

export const load_user = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `JWT ${localStorage.getItem("access")}`,
        'Accept': "application/json",
      },
    };
    try {
      const response = await api.get("api/v1/auth/users/me/", config);
      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: LOAD_USER_FAIL,
      });
    }
  } else {
    dispatch({
      type: LOAD_USER_FAIL,
    });
  }
};

export const googleAuthenticate = (state, code) => async dispatch =>{
  if(state && code && !localStorage.getItem('access')){
    const config = {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    }
    const detalis = {
      'state': state,
      'code': code
    }
    const formBody = Object.keys(detalis).map(key => encodeURIComponent(key)+ '='+ encodeURIComponent(detalis[key])).join('&');
    try{
      const response = await api.post(`api/v1/auth/o/google-oauth2/?${formBody}`, config); //google-oauth2/
      dispatch({
        type: GOOGLE_AUTH_SUCCESS,
        payload: response.data
      })
      dispatch(load_user())
    }catch(err){
      dispatch({
        type: GOOGLE_AUTH_FAIL
      })
    }
  }
}

export const checkAuthenticated = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        'Accept': "application/json",
      },
    };
    console.log('authentication1')
    const body = JSON.stringify({ token: localStorage.getItem("access") });
    try {
      console.log('authentication2')
      const response = await api.post("api/v1/auth/jwt/verify/", body, config);
      if (response.data.code !== "token_not_valid") {
        dispatch({
          type: AUTHENTICATION_SUCCESS,
        });
      } else {
        dispatch({
          type: AUTHENTICATION_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: AUTHENTICATION_FAIL,
      });
    }
  } else {
    dispatch({
      type: AUTHENTICATION_FAIL,
    });
  }
};

export const login = (username, password) => async dispatch => {
  const config = {
      headers: {
          'Content-Type': 'application/json'
      }
  };

  const body = JSON.stringify({ username, password });

  try {
      const res = await api.post("api/v1/auth/jwt/create/", body, config);

      dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data
      });

      dispatch(load_user());
  } catch (err) {
      dispatch({
          type: LOGIN_FAIL
      })
  }
};

export const signup = (first_name, last_name, email, password, re_password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ first_name, last_name, email, password, re_password });

  try {
    console.log('try api');
    const response = await api.post("api/v1/auth/users/", body, config);
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: response.data,
    });
    dispatch(load_user());
  } catch (err) {
    dispatch({
      type: SIGNUP_FAIL,
    });
  }
};

export const verify = (uid, token) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ uid, token });

  try {
    console.log('try api');
    await api.post("api/v1/auth/users/activation/", body, config);
    dispatch({
      type: ACTIVATION_SUCCESS,
    });
    dispatch(load_user());
  } catch (err) {
    dispatch({
      type: ACTIVATION_FAIL,
    });
  }
}

export const password_reset = (email) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({email});

  try{
    const response = await api.post("api/v1/auth/users/reset_password/", body, config);
    dispatch({
      type: PASSWORD_RESET_SUCCESS
    })
  }catch(err){
    dispatch({
      type: PASSWORD_RESET_FAIL
    })
  }
}

export const reset_password_confirmed = (uid, token, new_password, re_new_password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({uid, token, new_password, re_new_password});
  try{
    const response = await api.post("api/v1/auth/users/reset_password_confirm/", body, config);
    dispatch({
      type: PASSWORD_RESET_CONFIRM_SUCCESS
    })
  }catch(err){
    dispatch({
      type: PASSWORD_RESET_CONFIRM_FAIL
    })
  }
}
export const username_reset = (email) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({email});

  try{
    const response = await api.post("api/v1/auth/users/reset_username/", body, config);
    dispatch({
      type: USERNAME_RESET_SUCCESS
    })
  }catch(err){
    dispatch({
      type: USERNAME_RESET_FAIL
    })
  }
}
export const username_password_confirmed = (new_username) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({new_username});
  try{
    const response = await api.post("api/v1/auth/users/reset_username_confirm/", body, config);
    dispatch({
      type: USERNAME_RESET_CONFIRM_SUCCESS
    })
  }catch(err){
    dispatch({
      type: USERNAME_RESET_CONFIRM_FAIL
    })
  }
}
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

export const get_user_jobs = (userId) => dispatch => {
  //const userId = getState().auth.user._id;
  const jobs = api.get(`api/v1/${userId}`)
  .then((res) =>
    dispatch({
      type: GET_JOBS_SUCCESS,
      payload: res.data,
    })
  )
  .catch((err) => {
    dispatch({
      type: GET_JOBS_FAIL
    })
  });
  console.log(jobs);
  return jobs;
}

export const add_offer = (company_name, salary, job_name, place, tags, author, category ) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ company_name, salary, job_name, place, tags, author, category });

  try {
    console.log('try api');
    const response = await api.post("api/v1/", body, config);
    dispatch({
      type: ADD_JOB_SUCCESS,
      payload: response.data,
    });
    dispatch(load_user());
  } catch (err) {
    dispatch({
      type: ADD_JOB_FAIL,
    });
  }
}


export const edit_offer = (company_name, salary, job_name, place, tags, author, category, id ) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ company_name, salary, job_name, place, tags, author, category });

  try {
    console.log('try api');
    const response = await api.put(`api/v1/${id}`, body, config);
    dispatch({
      type: ADD_JOB_SUCCESS,
      payload: response.data,
    });
    dispatch(load_user());
  } catch (err) {
    dispatch({
      type: ADD_JOB_FAIL,
    });
  }
}