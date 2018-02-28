// @flow

import React from 'react';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { LogInButton } from 'common/containers';
import { isConnected } from 'utils/user';
import type { FetchProp } from 'types/api';

type Props = {
  groupId: string,
  auth: Object,
  fetch: FetchProp,
};

type State = {
  message: string,
  ticketUnits: number,
};

class RequestForm extends React.Component<Props, State> {
  static defaultProps = {};

  state = {
    message: '',
    ticketUnits: 1,
  };

  handleChanges = (field: string) => (event: Object) => {
    this.setState({ [field]: event.target.value });
  };

  sendRequest = () => {
    const { fetch, groupId } = this.props;
    const { message, ticketUnits } = this.state;
    fetch.startRequest({
      endPoint: 'members',
      method: 'POST',
      payload: {
        groupId,
        message,
        ticketUnits,
      },
    });
  };

  render() {
    const { auth } = this.props;
    const { message, ticketUnits } = this.state;
    return (
      <Grid container>
        <Grid item xs={12} sm={6}>
          <TextField
            margin="dense"
            id="message"
            label="Message"
            helperText="A nice message for the creator of the group."
            type="text"
            fullWidth
            onChange={this.handleChanges('message')}
            value={message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            margin="dense"
            id="ticketUnits"
            label="Number of Tickets"
            type="number"
            InputProps={{
              inputProps: {
                min: '1',
                max: '6',
              },
            }}
            fullWidth
            onChange={this.handleChanges('ticketUnits')}
            value={ticketUnits}
          />
        </Grid>
        <Grid item xs={12}>
          {isConnected(auth) ? (
            <Button variant="raised" color="primary" onClick={this.sendRequest}>
              Request Tickets
            </Button>
          ) : (
            <LogInButton onLoggedIn={this.sendRequest}>
              Connect and Request Tickets
            </LogInButton>
          )}
        </Grid>
      </Grid>
    );
  }
}

export default RequestForm;
