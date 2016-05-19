/* eslint-disable no-unused-vars */
import React, {PropTypes} from 'react';

import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
/* eslint-enable no-unused-vars */

const errorStyle = {
  fontSize: '0.8em',
  color: 'red'
};

const Signup = (props) => {
  return (
    <div className='row'>
      <div className='col-xs-12 col-sm-offset-2 col-sm-8 col-md-offset-3 col-lg-offset-4 col-md-6 col-lg-4'>
        <div className='box center'>
          <Card>
            <CardTitle title='Signup'/>
            <CardText>
              <TextField
                hintText='Enter Username'
                floatingLabelText='Username'
                name='username'
                type='text'
                onChange={props.onFieldUpdate}
              />
              <br />
              <TextField
                hintText='Enter Email'
                floatingLabelText='Email'
                name='email'
                type='email'
                onChange={props.onFieldUpdate}
              />
              <br />
              <TextField
                hintText='Enter Password'
                floatingLabelText='Password'
                name='password'
                type='password'
                onChange={props.onFieldUpdate}
              />
              <br />
              <TextField
                hintText='Confirm Password'
                floatingLabelText='Confirm Password'
                name='confirmPassword'
                type='password'
                onChange={props.onFieldUpdate}
              />
            </CardText>
            {props.auth.isFetching
              ? <CircularProgress size={0.5}/>
              : <CardActions>
                {props.errors
                  ? props.errors.map(item => (
                    <p style={errorStyle} key={item}>{item}</p>))
                  : null
                }
                <RaisedButton
                  backgroundColor='#00BCD4'
                  label='Signup'
                  onClick={props.onSignup}
                  />
                </CardActions>
            }
          </Card>
        </div>
      </div>
    </div>
  );
};

Signup.propTypes = {
  onSignup: PropTypes.func.isRequired,
  onFieldUpdate: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

export default Signup;
