// import polyfills
// reference https://babeljs.io/docs/en/v7-migration#remove-proposal-polyfills-in-babel-polyfill-https-githubcom-babel-babel-issues-8416
import "core-js/stable"
import "regenerator-runtime/runtime"

import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/Root'

const render = Component => {
  ReactDOM.render(
    <Component />,
     document.getElementById('main')
  )
}

render(Root)

if (module.hot) {
  module.hot.accept('./components/Root', () => { render(require('./components/Root').default)})
}