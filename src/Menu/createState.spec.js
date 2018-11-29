import test from 'tape'

import createState from './createState'

test('the createState function', function (t) {
  t.deepEqual(createState().items, [], 'returns an empty `items` array by default')

  const items = [ 1, 2, 3 ]
  t.deepEqual(createState({ items }).items, items, 'returns object with the items passed into it')

  t.end()
})
