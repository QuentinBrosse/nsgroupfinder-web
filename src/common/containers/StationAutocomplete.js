// @flow

import React from 'react';
import type { Node } from 'react';
import { withStyles } from 'material-ui/styles';
import firebase from 'firebase';
import 'firebase/firestore';
import _ from 'lodash';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { CircularProgress } from 'material-ui/Progress';
import { MenuItem } from 'material-ui/Menu';
import { InputIconAdornment } from 'common/components';
import type { Station } from 'types/station';

type Props = {
  classes: Object,
  iconName: string,
  id: string,
  placeholder: string,
  input: Object,
  meta: Object,
  change: Function,
};

type State = {
  loading: boolean,
  suggestions: Station[],
};

class StationAutocomplete extends React.Component<Props, State> {
  static getSuggestionValue(suggestion: Station): string {
    return suggestion.name;
  }
  static defaultProps = {
    meta: {},
  };

  static shouldRenderSuggestions(value: string): boolean {
    return value.trim().length > 2;
  }

  static renderSuggestion(suggestion, { query, isHighlighted }): Node {
    const matches = match(suggestion.name, query);
    const parts = parse(suggestion.name, matches);

    return (
      <MenuItem selected={isHighlighted} component="div">
        <div>
          {parts.map(
            (part, index) =>
              part.highlight ? (
                <span key={String(index)} style={{ fontWeight: 300 }}>
                  {part.text}
                </span>
              ) : (
                <strong key={String(index)} style={{ fontWeight: 500 }}>
                  {part.text}
                </strong>
              )
          )}
        </div>
      </MenuItem>
    );
  }

  static renderSuggestionsContainer(options): Node {
    const { containerProps, children } = options;

    return (
      <Paper {...containerProps} square>
        {children}
      </Paper>
    );
  }

  static renderInput(inputProps): Node {
    const {
      classes,
      iconName,
      fetchingSuggestions,
      ref,
      helperText,
      error,
      ...other
    } = inputProps;

    return (
      <TextField
        inputRef={ref}
        className={classes.textField}
        fullWidth
        margin="normal"
        helperText={helperText || 'Accents are mandatory'}
        error={error}
        InputProps={{
          startAdornment: <InputIconAdornment iconName={iconName} />,
          endAdornment: fetchingSuggestions && <CircularProgress size={20} />,
          ...other,
        }}
      />
    );
  }

  constructor(props) {
    super(props);
    const firestore = firebase.firestore();
    this.firestoreStationRef = firestore.collection('stations');
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(
      this
    );
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(
      this
    );
    this.fetchSuggestions = _.debounce(this.fetchSuggestions, 500);
  }

  state = {
    loading: false,
    suggestions: [],
  };

  onSuggestionsFetchRequested({ value, reason }) {
    if (reason === 'input-changed') {
      // Avoid a useless call to firebase.
      const clearedValue = value.trim().toLowerCase();
      this.fetchSuggestions(clearedValue);
    }
  }

  onSuggestionsClearRequested() {
    this.setState({ suggestions: [] });
  }

  fetchSuggestions: Function;
  firestoreStationRef: Object;
  onSuggestionsFetchRequested: Function;
  onSuggestionsClearRequested: Function;

  fetchSuggestions(value: string): Promise<*> {
    this.setState({ loading: true });

    return this.firestoreStationRef
      .limit(4)
      .orderBy('name_insensitive')
      .startAt(value)
      .endAt(`${value}\uf8ff`)
      .get()
      .then(snapshot => {
        const stations = snapshot.docs.map(d => d.data());
        this.setState({ loading: false, suggestions: stations });
      })
      .catch(console.error);
  }

  render() {
    const { suggestions, loading } = this.state;
    const {
      id,
      classes,
      placeholder,
      iconName,
      input,
      meta: { touched, error, warning },
      change,
    } = this.props;

    const errorProps =
      touched && (error || warning)
        ? {
            error: Boolean(error || warning),
            helperText: error || warning,
          }
        : {};

    const inputProps = {
      classes,
      id,
      placeholder,
      iconName,
      fetchingSuggestions: loading,
      ...input,
      ...errorProps,
    };

    return (
      <Autosuggest
        id={`autosuggest-${id}`}
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderInputComponent={StationAutocomplete.renderInput}
        suggestions={suggestions}
        shouldRenderSuggestions={StationAutocomplete.shouldRenderSuggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={(event, { suggestion, suggestionValue }) => {
          change(input.name, suggestionValue);
          change(`${input.name}_obj`, suggestion);
        }}
        getSuggestionValue={StationAutocomplete.getSuggestionValue}
        renderSuggestionsContainer={
          StationAutocomplete.renderSuggestionsContainer
        }
        renderSuggestion={StationAutocomplete.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

const styles = {
  container: {
    flexGrow: 1,
    position: 'relative',
    width: '100%',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  textField: {
    width: '100%',
  },
};

export default withStyles(styles)(StationAutocomplete);
