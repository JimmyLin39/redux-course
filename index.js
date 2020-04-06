/*
Characteristics of a Pure Function
1) They always return the same result if the same arguments are passed in.
2) They depend only on the arguments passed into them.
3) Never produce any side effects.
*/

// Reducer function
function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.todo])
    case 'REMOVE_TODO':
      return state.filter(todo => todo.id !== action.id)
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id !== action.id
          ? todo
          : Object.assign({}, todo, { complete: !todo.complete })
      )
    default:
      return state
  }
}

function createStore(reducer) {
  // The store should have four parts
  // 1. The state
  // 2. Get the state
  // 3. Listen to changes on the state
  // 4. Update the state

  let state
  let listeners = []

  const getState = () => state

  const subscribe = listener => {
    listeners.push(listener)
    // return unsubscribe listener
    return () => {
      listeners = listeners.filter(l => l !== listener)
    }
  }

  const dispatch = action => {
    state = reducer(state, action)
    listeners.forEach(listener => listener())
  }
  return {
    getState,
    subscribe,
    dispatch
  }
}

const store = createStore(todos)

store.subscribe(() => {
  console.log('The new state is:\n', store.getState())
})

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 0,
    name: 'Learn Redux',
    complete: false
  }
})

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 1,
    name: 'Learn Vue',
    complete: false
  }
})

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 2,
    name: 'Learn Snowboard',
    complete: false
  }
})

store.dispatch({
  type: 'REMOVE_TODO',
  id: 2
})

store.dispatch({
  type: 'TOGGLE_TODO',
  id: 1
})
