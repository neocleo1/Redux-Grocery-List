// dom element vars
const grocerySubmit = document.getElementById('addGrocery')
const list = document.getElementById('list')
const clearBtn = document.getElementById('clear')

// default
const initialState = {
  groceries: [],
}

//reducer
const groceryReducer = (state = initialState.groceries, action) => {
  switch (action.type) {
    case 'grocery/add':
      return [
        ...state,
        {
          text: action.text,
        },
      ]
    case 'grocery/clear':
      return []
    default:
      return state
  }
}

//store
let store = Redux.createStore(groceryReducer)

//clear list
const clearList = () => {
  document.getElementById('newItem').value = ''
  store.dispatch({ type: 'grocery/clear' })
}

//add new item
const newGrocery = (e) => {
  e.preventDefault()
  let groceryText = document.getElementById('newItem').value
  store.dispatch({
    type: 'grocery/add',
    text: groceryText,
  })
  console.log(store.getState())
}

//event listeners
grocerySubmit.addEventListener('click', (e) => {
  newGrocery(e)
})
clearBtn.addEventListener('click', clearList)

//render data
const renderList = (state) => {
  while (list.firstChild) {
    list.removeChild(list.firstChild)
  }
  state.forEach((grocery) => {
    // Generate a new list element for each grocery item
    let li = document.createElement('li')
    // Append the new element to our list DOM element, we targeted
    // it at the beginning of this code-along!
    list.appendChild(li)
    // Populate the text content of the list item
    li.textContent = grocery.text
  })
}

const render = () => {
  const state = store.getState()
  renderList(state)
}

store.subscribe(render)
