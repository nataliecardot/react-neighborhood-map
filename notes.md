TODOS

API key

add api... https://developers.google.com/maps/documentation/javascript/tutorial
All data requests are retrieved in an asynchronous manner using either the Fetch API or XMLHttpRequest.

components

State control is managed appropriately: event handlers are passed as props to child components, and state is managed by parent component functions when appropriate.

There are at least 5 locations in the model. These may be hard-coded or retrieved from a data API.

Alt text for images

Elements on the page use the appropriate semantic elements. For those elements in which a semantic element is not available, appropriate ARIA roles are defined.

Focus is appropriately managed allowing users to noticeably tab through each of the important elements of the page. Modal or interstitial windows appropriately lock focus.

gitignore: node_modules
service worker
README -  clear instructions for setting up and running your project application code

create react app - jsx must be transpiled to regular JSX. normally you'd use babel and then webpack to bundle the assets. eliminates the need to install or configure module bundlers like Webpack, or transpilers like Babel; they come preconfigured with create react app. installs react, react-dom, and react-scripts (installs Babel, webpack, and webpack-dev-server that provides auto-reload behavior) packages.

first use npm install -g create-react-app
then create-react-app myapp
use npm start or yarn start to start dev server
