import md5 from 'blueimp-md5';
import classNames from 'classnames';

import React, { PropTypes } from 'react';

import { Card, CardActions, CardHeader, CardText, CardTitle } from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import ValidationError from '../Auth/ValidationError';

const UserSideBarUpdate = (props) => {
  const user = props.userDetails.user;
  const updatedUser = props.userDetails.updatedUser;
  const userGravatar =
    `https://www.gravatar.com/avatar/${user ? md5(user.email) : ''}?d=identicon`;

  const hideComponent = (item) => classNames({
    hidden: props.userDetails.validations[item]
  });

  const roles = ['admin', 'user'];
  return (
    <div className='sidebar'>
      <Card className='sidebar-card' zDepth={3}>
        <CardHeader
          avatar={`${userGravatar}&s=40`}
          subtitle={user && user.role && user.role.title === 'admin'
            ? user.role.title
            : `@${user.username}`
          }
          title={user.name
            ? `${user.name.firstName} ${user.name.lastName}`
            : user.username
          }
        />
        <CardTitle
          subtitle={user ? user.email : ''}
          title={`${user ? user.username + ' - ' : ''}Profile Update`} // eslint-disable-line
        />
        <CardText className='center'>
          <div>
            <TextField
              defaultValue={user.username}
              floatingLabelText='Username'
              name='username'
              onChange={props.handleFieldUpdate}
              type='text'
            />
            <span>
              <br />
              <ValidationError
                error={props.userDetails.validations.username}
                style={hideComponent('username')}
              />
            </span>
          </div>
          <div>
            <TextField
              defaultValue={user.email}
              floatingLabelText='Email'
              name='email'
              onChange={props.handleFieldUpdate}
              type='email'
            />
            <span>
              <br />
              <ValidationError
                error={props.userDetails.validations.email}
                style={hideComponent('email')}
              />
            </span>
          </div>
          <div>
            <TextField
              defaultValue={user.name ? user.name.firstName : ''}
              floatingLabelText='First Name'
              name='firstName'
              onChange={props.handleFieldUpdate}
              type='text'
            />
            <span>
              <br />
              <ValidationError
                error={props.userDetails.validations.firstName}
                style={hideComponent('firstName')}
              />
            </span>
          </div>
          <div>
            <TextField
              defaultValue={user.name ? user.name.lastName : ''}
              floatingLabelText='Last Name'
              name='lastName'
              onChange={props.handleFieldUpdate}
              type='text'
            />
            <span>
              <br />
              <ValidationError
                error={props.userDetails.validations.lastName}
                style={hideComponent('lastName')}
              />
            </span>
          </div>
          {props.isAdmin
          ?
            <SelectField
              floatingLabelText='Role'
              name='role'
              onChange={props.handleRoleFieldUpdate}
              style={{ textAlign: 'left' }}
              value={updatedUser.role
                ? updatedUser.role.title || updatedUser.role
                : user.role.title
              }
            >
              {roles.map((role) => (
                <MenuItem
                  key={role}
                  label={role}
                  primaryText={role}
                  value={role}
                />
              ))}
            </SelectField>
          : null
          }
          <div>
            <TextField
              floatingLabelText='Password'
              name='password'
              onChange={props.handleFieldUpdate}
              type='password'
            />
            <span>
              <br />
              <ValidationError
                error={props.userDetails.validations.password}
                style={hideComponent('password')}
              />
            </span>
          </div>
          <div>
            <TextField
              floatingLabelText='Confirm Password'
              name='confirmPassword'
              onChange={props.handleFieldUpdate}
              type='password'
            />
            <span>
              <br />
              <ValidationError
                error={props.userDetails.validations.confirmPassword}
                style={hideComponent('confirmPassword')}
              />
            </span>
          </div>
        </CardText>
        {props.userDetails.isFetching
        ?
          <div className='center'><CircularProgress size={0.5} /></div>
        :
          <CardActions className='center'>
            {props.errors
              ? props.errors.map(item => (
                <p key={item}>
                  <ValidationError error={item} />
                </p>
              ))
              : null
            }
            <RaisedButton
              disabled={!props.userDetails.validations.isValid}
              label='Update'
              onClick={props.handleProfileUpdate}
              primary
            />
            <RaisedButton
              label='Cancel'
              onClick={props.handleToggleShowUpdate}
            />
          </CardActions>
        }
      </Card>
    </div>
  );
};

UserSideBarUpdate.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.object),
  handleFieldUpdate: PropTypes.func.isRequired,
  handleProfileUpdate: PropTypes.func.isRequired,
  handleRoleFieldUpdate: PropTypes.func.isRequired,
  handleToggleShowUpdate: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  userDetails: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    updatedUser: PropTypes.object,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      role: PropTypes.shape({
        accessLevel: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    validations: PropTypes.object
  }).isRequired
};

export default UserSideBarUpdate;
