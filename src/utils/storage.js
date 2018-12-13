const TOKEN_KEY = '__tk__'
const CODE_KEY = '__code__'

function stringify (key, val, storage) {
  const normalize = typeof val === 'string'
    ? val
    : JSON.stringify(val)
  storage.setItem(key, normalize)
}

function createStorageOperator (key, storage = window.localStorage) {
  return {
    setItem (value) {
      stringify(key, value, storage)
    },
    getItem () {
      return JSON.parse(storage.getItem(key))
    },
    removeItem () {
      storage.removeItem(key)
    }
  }
}

export const tokenFromStorage = createStorageOperator(TOKEN_KEY, localStorage)

export const codeFromStorage = createStorageOperator(CODE_KEY, localStorage)
