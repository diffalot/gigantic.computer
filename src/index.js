// import './globe'
import choo from 'choo'
import html from 'choo/html'

import Menu from './Menu'

const app = choo()

app.route('/', function root (state, emit) {
  return html`
    <body>
      ${state.cache(Menu, 'main-menu').render()}
    </body>
  `
})

app.mount('body')
