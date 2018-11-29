/**
   The Menu Component provides a button that expands into a menu
 * @fileOverview
 * @name index.jsm
 * @author Alice Davis <alice@gigantic.computer>
 * @license GPL-3
 */
import html from 'choo/html'
import Component from 'choo/component'

export function createState (state) {
  const initialState = Object.freeze({
    items: [
      {
        url: 'HTTP://github.com/diffalot',
        title: 'github'
      },
      {
        url: 'https://diff.mx/',
        title: 'blog'
      }
    ]
  })

  return {
    ...initialState,
    ...state
  }
}

/**
 * Class contains a button to toggle the list and the list of menu items
 */
export default class Menu extends Component {
  /**
   * create a Menu

   * @param {nanobus} emit
   * @param {itemsArray} items
   */
  constructor ({ emit, items }) {
    super()
    this.state = createState({ items })
    this.emit = emit
  }

  /**
   * Must be implemented for choo
   * @returns {boolean} should the component update
   */
  update () {
    return false
  }

  /**
   * First render
   * @returns {nanohtml}
   */
  createElement (items) {
    console.log(this.state)
    return html`<div>words</div><ul><li>thing one</li><li>thing two</li></ul>`
  }
}
