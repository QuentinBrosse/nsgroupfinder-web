# NS Group Finder

Meet the people who will share your NS trip.

---

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Table of Contents

* [Quick Start](#quick-start)
* [Available Scripts](#available-scripts)
  * [yarn start](#yarn-start)
  * [yarn test](#yarn-test)
  * [yarn lint](#yarn-lint)
  * [yarn flow](#yarn-flow)
  * [yarn prettier](#yarn-prettier)
  * [yarn build](#yarn-build)
  * [yarn eject](#yarn-eject)
* [Folder Structure](#folder-structure)
* [Component Structure](#component-structure)
* [Firebase](#firebase)
* [Formatting Code Automatically](#formatting-code-automatically)
* [Static Typing](#static-typing)
* [Material](#material)
* [CSS-in-JS](#css-in-js)

**External links:**

* [Snippets](SNIPPETS.md)

---

## Quick Start

1. Clone the project.
2. Install the last LTS version of [node](https://nodejs.org/en).
3. Run `yarn install` inside the project.
4. Install the [VSCode](https://code.visualstudio.com) extensions:
   1. [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
   2. [Flow Language Support](https://marketplace.visualstudio.com/items?itemName=flowtype.flow-for-vscode)
   3. [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
5. To allow Prettier to auto-format your current file on save, add this line in your workspace settings: `"editor.formatOnSave": true,`.
6. Read the [Available Scripts](#available-scripts) section to start the project.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests) for more information.

### `yarn lint`

Runs [eslint](https://eslint.org/) to check the files for syntax errors.

### `yarn flow`

Runs [flow](https://flow.org/) to check the files for type errors.

### `yarn prettier`

Format all the project files with Prettier.<br>
See the section about [prettier](#formatting-code-automatically) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Folder Structure

```
nsgroupfinder/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    actions/
    assets/
    common/
      components/
        index.js
        ExamplePresentationalComponent.js
      containers/
        index.js
        ExampleContainerComponent.js
    config/
    epics/
    reducers/
    utils/
    views/
      ExampleView/
        index.js
        AComponentSpecificToThisView.js
        AnotherComponentSpecificToThisView.js
    index.js
    registerServiceWorker.js
```

### Details

### `public/`

[More info](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#using-the-public-folder)

Only files inside `public` can be used from `public/index.html`.<br>

### `src`

Contain all the source code.

For faster rebuilds, only files inside `src` are processed by Webpack.<br>
You need to **put any JS and CSS files inside `src`**, otherwise Webpack won’t see them.

### `src/actions`

Contain all the [Redux Actions](https://redux.js.org/docs/basics/Actions.html).

### `src/assets`

Where all static assets are stored (e.g. `images/*.{svg|png|jpg|...}` or `fonts/*.{ttf|otf|...}`).

### `src/common`

Contain all **reusable** components (i.e. those who are not specific to a particular view or container):

* `src/common/components` for presentational components
* `src/common/containers` for container components

Please read [this](https://redux.js.org/docs/basics/UsageWithReact.html#presentational-and-container-components) in order to learn the presentational and container components concepts.

Read [this](#component-structure) learn the component structure used in this project.

When you create a new `component`, please add this line in the `src/common/components/index.js` (and same for `containers`):

```js
export { default as ComponentName } from './ComponentName';
```

The created component can be imported like this:

```js
import { ComponentName } from 'common/components';
```

(thanks to absolute imports)

### `src/config`

All config files.

### `src/epics`

All epics files<br>
A function who build the root epic lives in `src/epics/index.js`.

### `src/reducers`

Contain all the [Redux Reducers](https://redux.js.org/docs/basics/Reducers.html).<br>
A function who build the root reducer lives in `src/reducers/index.js`.

### `src/utils`

Helpers classes / functions / libraries.<br>
For example, the `createStore.js` lives here.

### `src/views`

All views will live here and take the form of container components (created with a classes).

Read [this](#component-structure) learn the component structure used in this project.

A view can contain his own specific presentational and container components those who are not in `src/common/`.

Example:

```
Home/
  index.js : The view (always named `index.js` !)
  HomeWelcomingMessage.js : A component specific to this view (which will be used nowhere else)
```

### Requirements

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

## Component Structure

A component will **always** lives in a single `.js` file.<br>
You can check [the snippets](SNIPPETS.md) to save time during the creation of your components.

## Formatting Code Automatically

Prettier is an opinionated code formatter with support for JavaScript, CSS and JSON. With Prettier you can format the code you write automatically to ensure a code style within your project. See the [Prettier's GitHub page](https://github.com/prettier/prettier) for more information, and look at this [page to see it in action](https://prettier.github.io/prettier).

In this project, Prettier will format the changed files automatically when you make a commit.<br/>
To allow Prettier to auto-format your current file on save, add this line in your workspace settings: `"editor.formatOnSave": true,`.

You can also:

* Format all the project files with [yarn prettier](#yarn-prettier).
* Format the current file / selection like describe [here](https://github.com/prettier/prettier-vscode#usage).

## Static Typing

Flow is a static type checker that helps you write code with fewer bugs. Check out this [introduction to using static types in JavaScript](https://medium.com/@preethikasireddy/why-use-static-types-in-javascript-part-1-8382da1e0adb) if you are new to this concept.

As you installed the [Flow Language Support](https://marketplace.visualstudio.com/items?itemName=flowtype.flow-for-vscode) VSCode extention, the files will be checked in real-time in VSCode.
You can also run [yarn flow](#yarn-flow).

To learn more about Flow, check out [its documentation](https://flowtype.org).
To learn who to use it with React, read [this](https://flow.org/en/docs/react) and [this](https://medium.com/flow-type/even-better-support-for-react-in-flow-25b0a3485627).

## Firebase

This project use [Firebase](https://firebase.google.com/docs).

We use [Firestore](https://firebase.google.com/docs/firestore) and not `Realtime Database` for all the data (even the user profiles).

In order to use Firebase with Redux, we use [React Redux Firebase](http://react-redux-firebase.com);

## Material

This UI of this projet will use [Material UI Next (in beta)](https://material-ui-next.com) for the Material integration.

## CSS-in-JS

The project use a `CSS-in-JS` solution (we writing the `CSS` with `JS`).<br>
I suggest [this reading](https://material-ui-next.com/customization/css-in-js) to know a little more about the subject and how it is implemented in the project.
