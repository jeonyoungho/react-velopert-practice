import React, { createContext, useContext, useReducer, useRef } from 'react';

const initialTodos = [
  {
    id: 1,
    text: '프로젝트 생성하기2',
    done: true
  },
  {
    id: 2,
    text: '컴포넌트 스타일링하기2',
    done: true
  },
  {
    id: 3,
    text: 'Context 만들기2',
    done: false
  },
  {
    id: 4,
    text: '기능 구현하기2',
    done: false
  }
];

const handleAllToggle = (todos) => {
  if (todos.every(todo => todo.done) || todos.every(todo => !todo.done)) { // 전부 체크된 경우 또는 전부 체크 안된 경우
    return todos.map(todo => {
      return {
        ...todo,
        done: !todo.done
      }
    });
  }

  return todos.map(todo =>
    !todo.done ? {...todo, done: !todo.done} : todo
  );
}

function todoReducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return state.concat(action.todo);
    case 'TOGGLE':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      )
    case 'REMOVE':
      return state.filter(todo => todo.id !== action.id);
    case "ALL_TOGGLE":
      return handleAllToggle(state);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({children}) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(5);
  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export function useTodoNextId() {
  const context = useContext(TodoNextIdContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}