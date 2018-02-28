// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import type { Element } from 'react';
import type { FetchProp, FetchRequest } from 'types/api';
import fetchApi from 'services/fetchApi';
import { throwAccentSnackbar } from 'actions/snackbar';
import merge from 'lodash/merge';
import omit from 'lodash/omit';

type HocOptions = {
  onStart?: null | Function,
  onSuccess?: null | Function,
  onError?: null | Function,
  onFinish?: null | Function,
  children: Element<*>,
};

type HocMandatoryProps = {
  dThrowAccentSnackbar: typeof throwAccentSnackbar,
};

const hocMandatoryPropsKeys = ['dThrowAccentSnackbar'];

function withFetch<Props: HocMandatoryProps>(
  WrappedComponent: React.ComponentType<Props>,
  mandatoryOptions: HocOptions
): React.ComponentType<$Diff<Props, { fetch: FetchProp }>> {
  const defaultOptions = {
    onStart: null,
    onSuccess: null,
    onError: null,
    onFinish: null,
  };

  const options: HocOptions = merge(defaultOptions, mandatoryOptions);

  type State = {
    fetch: FetchProp,
  };

  class HOC extends React.Component<Props, State> {
    constructor(props: Props) {
      super(props);
      this.initialState = {
        fetch: {
          started: false,
          data: null,
          error: null,
          startRequest: this.startRequest,
          finished: false,
        },
      };
      this.state = this.initialState;
    }

    componentDidUpdate(_: Props, prevState: State) {
      const { onStart, onSuccess, onError, onFinish } = options;
      const { dThrowAccentSnackbar } = this.props;
      const { fetch } = this.state;
      const { fetch: prevFetch } = prevState;

      // On Start
      if (onStart && fetch.started && !prevFetch.started) {
        onStart();
      }

      // On Error
      if (fetch.error && !prevFetch.error) {
        if (onError) {
          onError();
        }
        dThrowAccentSnackbar(fetch.error.message);
      }

      // On Success
      if (onSuccess && fetch.data && !prevFetch.data) {
        onSuccess();
      }

      // On Finish
      if (onFinish && fetch.finished && !prevFetch.finished) {
        onFinish();
      }
    }

    initialState: State;

    startRequest = async (request: FetchRequest) => {
      this.setState({
        fetch: {
          ...this.initialState.fetch,
          started: true,
        },
      });

      const { data, error } = await fetchApi(request);

      this.setState(state => ({
        fetch: {
          ...state.fetch,
          started: false,
          data,
          error,
          finished: true,
        },
      }));
    };

    render() {
      const { fetch } = this.state;
      const wrappedComponentProps = omit(this.props, hocMandatoryPropsKeys);
      return <WrappedComponent {...wrappedComponentProps} fetch={fetch} />;
    }
  }

  const mapDispatchToProps = {
    dThrowAccentSnackbar: throwAccentSnackbar,
  };

  return connect(null, mapDispatchToProps)(HOC);
}

export default withFetch;
