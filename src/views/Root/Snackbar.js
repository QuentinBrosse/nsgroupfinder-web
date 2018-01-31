// @flow

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import DefaultSnackbar from 'material-ui/Snackbar';
import { dismissSnackbar } from 'actions/snackbar';
import type { SnackbarState } from 'types/snackbar';

type Props = {
  dispatch: Function,
  snackbar: SnackbarState,
  dDismissSnackbar: Function,
};

type State = {};

class Snackbar extends React.Component<Props, State> {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick: Function;

  handleClick() {
    const { snackbar, dDismissSnackbar, dispatch } = this.props;
    const { actionOnClickButton } = snackbar.button;
    dDismissSnackbar();
    if (actionOnClickButton) {
      dispatch(actionOnClickButton);
    }
  }

  render() {
    const { snackbar, dDismissSnackbar } = this.props;
    const { opened, message, button } = snackbar;
    const buttonColor = button.type === 'default' ? 'contrast' : button.type;
    return (
      <DefaultSnackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={opened}
        autoHideDuration={6000}
        onClose={dDismissSnackbar}
        SnackbarContentProps={{
          'aria-describedby': 'snackbar-message',
        }}
        message={<span id="snackbar-message">{message}</span>}
        action={[
          <Button key={1} color={buttonColor} dense onClick={this.handleClick}>
            {button.label || 'Dismiss'}
          </Button>,
        ]}
      />
    );
  }
}

const mapStateToProps = ({ snackbar }) => ({
  snackbar,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      dDismissSnackbar: dismissSnackbar,
      dispatch,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Snackbar);
