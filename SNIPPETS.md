# VSCode Snippets

Creating components is a really time-consuming task.<br>
To tackle this, I have created some VSCode Snnippets.

To goal is to create new snippets during the development and to share them here! 💪

## Installation

1. Go to `Preferences > User Snippets`
2. Select `JavaScript React (Babel)`
3. Add snippets you wants in the `JSON` file.
4. That's it !

## Usage

1. Create a new `.js` file
2. Write the (a part of the) `prefix` of a snippet (e.g. For `RClassComp`, you can type `rcc` or `rclc`)
3. You will see your Snippet in [IntelliSense](https://code.visualstudio.com/docs/editor/intellisense).
4. Press `Enter`
5. Enjoy your time saving 🤗.

## Snippets

* [React Fonctionnal Component](#react-fonctionnal-component)
* [React Class Component](#react-class-component)

### React Fonctionnal Component

```json
{
  "RFonctionnalComponent": {
    "prefix": "RFoncComp",
    "body": [
      "// @flow",
      "",
      "import React from 'react';",
      "import type { Node } from 'react';",
      "import { withStyles } from 'material-ui/styles';",
      "",
      "type Props = {",
      "\tclasses: Object,",
      "};",
      "",
      "const ${1:Component} = ({ classes }: Props): Node => (",
      "\t$2",
      ");",
      "",
      "${1:Component}.defaultProps = {};",
      "",
      "const styles = {}",
      "",
      "export default withStyles(styles)(${1:Component});",
      ""
    ],
    "description": "React Fonctionnal Componnent (with Flow)"
  }
}
```

### React Class Component

```json
{
  "RClassComponent": {
    "prefix": "RClassComp",
    "body": [
      "// @flow",
      "",
      "import React from 'react';",
      "import { withStyles } from 'material-ui/styles';",
      "",
      "type Props = {",
      "\tclasses: Object,",
      "};",
      "",
      "class ${1:Component} extends React.Component<Props, Props> {",
      "\tstatic defaultProps = {}",
      "\trender() {",
      "\t\treturn (",
      "\t\t\t$2",
      "\t\t);",
      "\t}",
      "}",
      "",
      "const styles = {}",
      "",
      "export default withStyles(styles)(${1:Component});",
      ""
    ],
    "description": "React Class Componnent (with Flow)"
  }
}
```

## React Class Constructor

```json
{
  "RConstructor": {
    "prefix": "RContructor",
    "body": ["constructor(props) {", "\tsuper(props);", "\t$1", "}", ""],
    "description": "React class component constructor"
  }
}
```
