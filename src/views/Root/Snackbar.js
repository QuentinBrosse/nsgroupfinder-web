// @flow

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MuiThemeProvider } from 'material-ui/styles';
import Button from 'material-ui/Button';
import DefaultSnackbar from 'material-ui/Snackbar';
import { dismissSnackbar } from 'actions/snackbar';
import type { SnackbarState } from 'types/snackbar';

const snackbarTheme = outerTheme => ({
  ...outerTheme,
  palette: {
    ...outerTheme.palette,
    primary: outerTheme.palette.success,
  },
});

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
    const buttonColor = button.type === 'default' ? 'primary' : 'secondary';
    return (
      <MuiThemeProvider theme={snackbarTheme}>
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
            <Button
              key={1}
              color={buttonColor}
              size="small"
              onClick={this.handleClick}
            >
              {button.label || 'Dismiss'}
            </Button>,
          ]}
        />
      </MuiThemeProvider>
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
