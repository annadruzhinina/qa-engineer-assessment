import React from 'react';
import { render, fireEvent, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';  // Provides additional matchers like toBeInTheDocument
import App from './App';  // Adjust the path if needed
import { Todo } from './interface';


// Mock localStorage for testing purposes
beforeEach(() => {
  const localStorageMock = (() => {
    let store: { [key: string]: string } = {};

    return {
      getItem(key: string) {
        return store[key] || null;
      },
      setItem(key: string, value: string) {
        store[key] = value;
        console.log('setItem: ',key, value)
      },
      clear() {
        store = {};
      },
      removeItem(key: string) {
        delete store[key];
      },
    };
  })();

  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });
});

afterEach(() => {
  // Clear localStorage between tests
  window.localStorage.clear();
});

// Toggle Checked State: Clicking on a todo item should toggle the “checked” state.
test('toggling todo item changes its checked state', () => {
    render (<App />);
    let todoItem = screen.getByLabelText(/Buy groceries/i);

    // Initially unchecked
    expect(todoItem).not.toBeChecked();

    // Toggle checkbox
    fireEvent.click(todoItem);
    todoItem = screen.getByLabelText(/Buy groceries/i);
    // Expect it to be checked
    expect(todoItem).toBeChecked();
  });

  // Toggle Unchecked State: Clicking on a todo item should toggle the “unchecked” state.
  test('toggling todo item changes its checked state', () => {
    render(<App />);
    const todoItem = screen.getByLabelText(/Ace CoderPad interview/i);

    // Initially unchecked
    expect(todoItem).toBeChecked();

    // Toggle checkbox
    fireEvent.click(todoItem);

    // Expect it to be checked
    expect(todoItem).not.toBeChecked();
  });

  // Persist State: The todo list state should be saved to and loaded from local storage.
  test('saves and loads todos from localStorage', () => {
    const todos = [
      { id: '1', label: 'Test 1', checked: false },
      { id: '2', label: 'Test 2', checked: true },
      { id: '3', label: 'Test 3', checked: true },
    ];

    // Mock localStorage
    window.localStorage.setItem('todos', JSON.stringify(todos));

    const { getByText } = render(<App />);

    // Check if todos are loaded from localStorage
    const todoItem = getByText(/Test 3/i);
    expect(todoItem).toBeInTheDocument();
  });

  // 👉🏻 Saving State: The todo list state should be saved to local storage when modified.
 test('saves todos to localStorage when modified', async () => {
  window.localStorage.clear();
  render(<App />);

  const input = screen.getByPlaceholderText('Add a new todo item here');
  fireEvent.change(input, { target: { value: 'New Todo Item' } });
  fireEvent.submit(input.closest('form')!);

  const newTodoItem = await screen.findByText(/New Todo Item/i);
  expect(newTodoItem).toBeInTheDocument();

  const savedTodos = JSON.parse(window.localStorage.getItem('todos') || '[]');
  const addedTodo = savedTodos.find((todo: Todo) => todo.label === 'New Todo Item');

  expect(addedTodo).toBeDefined();
  expect(addedTodo.checked).toBe(false);
});


// 👉🏻 Checked items should sink to the bottom of the list automatically.
test('checked items sink to the bottom of the list automatically', () => {

  const todos = [
      { id: '1', label: 'Test 1', checked: false },
      { id: '2', label: 'Test 2', checked: false },
      { id: '3', label: 'Test 3', checked: false },
    ];

    // Mock localStorage
    window.localStorage.setItem('todos', JSON.stringify(todos));

  // Render the App component
  render(<App />);

  // Get all list items before any interaction
  let listItems = screen.getAllByRole('listitem');

  // console.log('listItems: ', listItems)

  // Verify initial order of items
    expect(listItems[0]).toHaveTextContent('Test 1');
    expect(listItems[1]).toHaveTextContent('Test 2');
    expect(listItems[2]).toHaveTextContent('Test 3');


    // Simulate checking the second item ("Reboot computer")
    const item1Checkbox = screen.getByLabelText('Test 1');
    fireEvent.click(item1Checkbox);
    // console.log('listItems - after click: ', listItems)
    // Get all list items after checking the item
    listItems = screen.getAllByRole('listitem');

    // Check the count again after interaction
    expect(listItems).toHaveLength(3);

    // Verify that "Reboot computer" has moved to the bottom
    expect(listItems[0]).toHaveTextContent('Test 2');
    expect(listItems[1]).toHaveTextContent('Test 3');
    expect(listItems[2]).toHaveTextContent('Test 1');
  });

    // Title is correct: Check the text in the title.
    test('test check title is correct', () => {
      const { getByText } = render(<App />);
      const title = getByText(/Todo List/i);
      expect(title).toBeInTheDocument();
    })
