// @flow

import React from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import type { Group } from 'types/group';

type Props = {
  classes: Object,
  group: Group,
};

type State = {
  info: string,
};

class GroupPreferences extends React.Component<Props, State> {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.handleInfoChange = this.handleInfoChange.bind(this);
  }

  state = {
    info: '',
  };

  componentWillMount() {
    const { info } = this.props.group;
    this.setState({ info });
  }

  handleInfoChange: Function;

  handleInfoChange(event) {
    this.setState({ info: event.target.value });
  }

  render() {
    const { classes } = this.props;
    const { info } = this.state;
    return (
      <div className={classes.container}>
        <div className={classes.form}>
          <TextField
            id="info"
            name="info"
            label="Info"
            type="text"
            fullWidth
            helperText="Information you want to communicate to users. They will be visible to all users (even those who will not be members of the group)."
            multiline
            rows="4"
            value={info}
            onChange={this.handleInfoChange}
          />
        </div>
        <Button className={classes.button}>Send</Button>
      </div>
    );
  }
}

const styles = ({ spacing }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: spacing.unit * 3,
  },
  form: {
    paddingBottom: spacing.unit * 3,
  },
  button: {
    alignSelf: 'flex-end',
  },
});

export default withStyles(styles)(GroupPreferences);
