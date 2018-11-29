import test from 'tape'

import Menu from './'

const emit = {}
const items = []

const menu = new Menu({ emit, items })

test('the Menu Component class', function (t) {
  t.equal(menu.update(), false, 'should never update')
  t.end()
})
