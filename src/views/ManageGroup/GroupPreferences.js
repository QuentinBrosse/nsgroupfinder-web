// @flow

import React from 'react';
import { withStyles } from 'material-ui/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import type { Group } from 'types/group';
import { updateGroup } from 'actions/groups';

type Props = {
  classes: Object,
  group: Group,
  dUpdateGroup: Function,
};

type State = {
  info: string,
};

class GroupPreferences extends React.Component<Props, State> {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.handleInfoChange = this.handleInfoChange.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  state = {
    info: '',
  };

  componentWillMount() {
    const { info } = this.props.group;
    this.setState({ info: info || '' });
  }

  handleInfoChange: Function;
  handleSend: Function;

  handleInfoChange(event) {
    this.setState({ info: event.target.value || '' });
  }

  handleSend() {
    const { group, dUpdateGroup } = this.props;
    const { info } = this.state;
    dUpdateGroup(group.id, { info });
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
        <Button className={classes.button} onClick={this.handleSend}>
          Send
        </Button>
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

const mapDispatchToProps = {
  dUpdateGroup: updateGroup,
};

export default compose(withStyles(styles), connect(null, mapDispatchToProps))(
  GroupPreferences
);
