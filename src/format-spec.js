const snapshot = require('.')
const {stripIndent} = require('common-tags')

/* global it */
it('compares just keys', () => {
  const o = {
    foo: Math.random(),
    bar: Math.random()
  }
  snapshot(Object.keys(o))
})
// snapshot will be something like
/*
exports['compares just keys 1'] = [
  "foo",
  "bar"
]
*/

const compose = (f, g) => x => f(g(x))
const upperCase = x => x.toUpperCase()
const upValue = compose(snapshot, upperCase)

it('compares upper case string', () => {
  upValue('foo')
})
/*
exports['compares upper case string 1'] = "FOO"
*/

it('compares multiple upper case values', () => {
  upValue('foo')
  upValue('bar')
  upValue('baz')
})

// multi line comparison
it('compares multi line strings', () => {
  snapshot(`
    this is a line
    and a second line
    with number 42
  `)
})

// multi line with stripped indent
it('no indent', () => {
  snapshot(stripIndent`
    foo = 'bar'
      baz = 42
  `)
})
