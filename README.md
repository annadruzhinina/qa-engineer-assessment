
# 📋 Project Overview

This project was created as part of an interview assessment to demonstrate **unit testing skills** and **bug fixing** for a simple Todo list application.
## 🚀 Summary of Changes

| **Branch**    | **Description**                                                             |
|---------------|-----------------------------------------------------------------------------|
| `AutoTest`    | Created initial test cases, highlighted missing functionality.              |
| `BugFix`      | Implemented missing logic and passed all test cases from `AutoTest`.        |
| **Merge**     | Merged `AutoTest` into `BugFix` and verified all tests passed successfully. |

## 🌿 Branch Structure

I created **two branches** to separate testing and bug-fixing efforts:

### 1️⃣ `AutoTest` Branch
- **Purpose**: Contains the initial automated tests for the Todo list application.
- **Description**: No modifications were made to `App.tsx`. The focus was on writing unit tests to verify the expected functionality.
- **Outcome**: The tests were designed to fail, highlighting the missing or incorrect functionality in the application logic.
- **Tests created**:
   - Toggle Checked State: Clicking on a todo item should toggle the “checked” state.
      - Tested checked->unchecked
      - Tested uncecked->checked
   - Persist State: The todo list state should be saved to and loaded from local storage.
      - Tested loading from persistent storage
      - Tested storing new item to persistent storage
   - Auto-Sink Checked Items: Checked items should sink to the bottom of the list automatically.
      - Tested item go down after checked
   - Test title is correct - app is available

### 2️⃣ `BugFix` Branch
- **Purpose**: Implemented the required logic to fix the issues identified in the `AutoTest` branch.
- **Changes Made**:
  - **Toggle Checked State**: Clicking on a todo item toggles its “checked” state.
  - **Persist State**: The todo list state is saved to and loaded from local storage.
  - **Auto-Sink Checked Items**: Checked items automatically move to the bottom of the list.
- **Outcome**: This branch now contains the updated `App.tsx` file, ensuring all the test cases pass successfully.

## ✅ Results

After merging the `AutoTest` branch into the `BugFix` branch and running all tests, I confirmed that:

- **All test cases passed successfully**, indicating that the application now meets the expected functionality.

## 🛠️ Technologies Used

- **React** for building the UI components.
- **Jest** and **React Testing Library** for creating and running the tests.
- **Local Storage API** for state persistence.

# _______________________________________
# 🔽 Original Requirements 🔽
### QA Engineer Assessment - React Todo App

Welcome to the Gesture Tech QA Engineer take-home challenge!

In this repository, you will find the code for the **React Todo App**. Your task is to create comprehensive automated tests based on the specified requirements to ensure the application's functionality and reliability.

## 📋 Task Requirements

- **Toggle Checked State**: Clicking on a todo item should toggle the “checked” state.
- **Persist State**: The todo list state should be saved to and loaded from local storage.
- **Auto-Sink Checked Items**: Checked items should sink to the bottom of the list automatically.

## 🎯 Your Mission

As a QA Engineer, your mission is to create automated tests in `App.test.tsx` that validate the application's functionality based on the requirements listed above. Develop test cases that cover:

### 1. Toggling Todo Items
- **Verify** that clicking a todo item changes its checked state.

### 2. State Persistence
- **Ensure** that the todo list is correctly saved to local storage.
- **Confirm** that the todo list is accurately loaded from local storage upon application start.

### 3. Auto-Sinking Checked Items
- **Test** that checked items automatically move to the bottom of the list.

*Feel free to consider edge cases and additional scenarios that may affect these functionalities.*

## 🚀 Getting Started

Follow these instructions to set up and run the application locally for testing purposes.


### 🛠️ Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Gesture-Tech/qa-engineer-assessment.git
   cd qa-engineer-assessment
   ```

2. **Install Dependencies**

   Using **npm**:

   ```bash
   npm install
   ```

### 🚀 Running the Application

Start the development server:


```bash
npm run dev
```

### 🧪 Running Tests

Execute the test suite:


```bash
npm test
```

This command will run all tests in watch mode.

## 📄 Submission

1. **Develop Your Tests**

   Implement the required tests in `App.test.tsx` based on the provided requirements.

3. **Commit Your Changes**

   Use clear and descriptive commit messages.

4. **Push to GitHub**

   Push your commits to your forked repository.

5. **Share the GitHub Repo with Us**

   Share the link to your forked repository with us for evaluation.
