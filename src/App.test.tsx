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
