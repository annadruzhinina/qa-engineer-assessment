import React from 'react';
import { render, fireEvent, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';  // Provides additional matchers like toBeInTheDocument
import App from './App';  // Adjust the path if needed

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
    const { getByLabelText } = render(<App />);
    const todoItem = getByLabelText(/Buy groceries/i);

    // Initially unchecked
    expect(todoItem).not.toBeChecked();

    // Toggle checkbox
    fireEvent.click(todoItem);

    // Expect it to be checked
    expect(todoItem).toBeChecked();
  });

  // Toggle Unchecked State: Clicking on a todo item should toggle the “unchecked” state.
  test('toggling todo item changes its checked state', () => {
    const { getByLabelText } = render(<App />);
    const todoItem = getByLabelText(/Ace CoderPad interview/i);

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
