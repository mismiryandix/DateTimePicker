# DateTimePicker Component

This project showcases a versatile **DateTimePicker** React component with multiple configurations for date, time, and year selection.

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Getting Started](#getting-started)
4. [Live Demo](#live-demo)
5. [Component Props](#component-props)
6. [Usage Examples](#usage-examples)
7. [Customization](#customization)

---

## Overview

![DateTimePicker UI](./screenshots/datetimepicker-preview.png)

The **DateTimePicker** component provides an easy-to-use interface for selecting dates, times, or years, with options for error handling, range restrictions, and format customization. It is designed to support various use cases, such as:

- Simple date pickers
- Time pickers
- Combined date and time pickers
- Year selectors

The project demonstrates how to implement and customize this component using React.

---

## Features

- **Multiple Picker Types**: Supports `date`, `time`, `datetime`, and `year` selection.
- **Customizable Format**: Flexible date/time formats via `moment.js`.
- **Range Validation**: Restrict selections using `minDate` and `maxDate`.
- **Icons**: Built-in or custom icons for better UI.
- **Error Handling**: Display error messages for invalid inputs.
- **Clear Button**: Reset selected values easily.

---

## Getting Started

### Prerequisites

- **Node.js** and **npm** installed on your machine.
- Familiarity with **React**.

### Installation

1. Clone this repository:
   ```bash
   git clone git@github.com:mismiryandix/DateTimePicker.git
   cd DateTimePicker
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm start
   ```
   Access the app at `http://localhost:3000`.

---

## Live Demo

### Online Demo
You can view the live demo of the DateTimePicker component at: 
**https://mismiryandix.github.io/DateTimePicker/**

---

## Component Props

| Prop Name      | Type                      | Default           | Description                                                                                      |
|----------------|---------------------------|-------------------|--------------------------------------------------------------------------------------------------|
| `type`         | `'date' | 'time' | 'datetime' | 'year'` | `'date'`     | Defines the picker type (date, time, datetime, or year).                                         |
| `dateFormat`   | `string`                  | `'dd-MM-yyyy'`    | Format of the displayed value (e.g., `HH:mm`, `yyyy-MM-dd HH:mm`).                              |
| `placeholder`  | `string`                  | `'Select date'` | Placeholder text for the input field.                                                           |
| `defaultValue` | `Date`                    | `null`            | Sets the initial date value.                                                                    |
| `isShowIcon`     | `boolean`                | `false`           | Toggles visibility of the picker icon.                                                          |
| `icon`         | `React.ComponentType`     | `null`            | Custom icon component.                                                                           |
| `minDate`      | `Date`                    | `null`            | Minimum selectable date.                                                                        |
| `maxDate`      | `Date`                    | `null`            | Maximum selectable date.                                                                        |
| `isError`      | `boolean`                | `false`           | Displays error message when set to `true`.                                                      |
| `errorMessage` | `string`                  | `''`              | Error message text.                                                                              |
| `onChange`     | `(date: Date or null) => void` | `undefined`      | Callback triggered when the selected value changes.                                             |

---

## Usage Examples

### Basic Date Picker

```jsx
<DatePicker type="date" showIcon format="yyyy-MM-DD" />
```

### Time Picker

```jsx
<DatePicker type="time" format="HH:mm" placeholder="Select Time" />
```

### DateTime Picker with Range

```jsx
<DatePicker 
  type="datetime" 
  format="yyyy-MM-DD HH:mm" 
  minDate={new Date(2024, 0, 1)} 
  maxDate={new Date(2024, 11, 31)} 
/>
```

### Year Picker

```jsx
<DatePicker type="year" format="YYYY" placeholder="Select Year" />
```

---

## Customization

The component supports custom icons by passing an icon component through the `icon` prop. For example:

```jsx
import { CustomIcon } from './icons';

<DatePicker type="date" icon={CustomIcon} />
```

Additionally, styles can be customized by overriding the default CSS classes in the `styles/App.scss`.

---