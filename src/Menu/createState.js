/**
 * Create the initial state of the Menu
 * @returns {MenuState}
 */
export default function createState ({ items } = {}) {
  return {
    items: items || []
  }
}
