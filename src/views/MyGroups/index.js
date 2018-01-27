// @flow

import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import fakeCards from './fakeCards';

type Props = {
  classes: Object,
};

type State = {
  // tabIndex: number,
};

class MyGroups extends React.Component<Props, State> {
  static defaultProps = {};

  // constructor(props) {
  //   super(props);
  //   this.handleChange = this.handleChange.bind(this);
  // }

  // state = {
  //   tabIndex: 0,
  // };

  // handleChange = (event, tabIndex) => {
  //   this.setState({ tabIndex });
  // };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography type="title" paragraph>
          My Groups
        </Typography>
        {fakeCards}
      </div>
    );
  }
}

const styles = () => {};

const mapStateToProps = ({ firebase: { auth } }) => ({
  auth,
});

export default compose(
  firebaseConnect(),
  withStyles(styles),
  connect(mapStateToProps)
)(MyGroups);
