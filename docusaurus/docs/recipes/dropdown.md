---
id: dropdown
title: Implementing a Dropdown
sidebar_label: Dropdown
---

Implementing a Dropdown/Select component from scratch is always a big challenge with a lot of things to consider such as accessibility, autocomplete feature, multi-selection feature, native support (for touch devices mainly).

There are open-source libraries like [react-select](https://github.com/JedWatson/react-select) that help us out on this task but usually their API is not that friendly. This happens because these libraries will render the input and the menu for themselves. For some of them, we are allowed to change what we want to render but it will render on a specific location. Others provide a list of `classNames` that can be used to change the style of the rendered component the way it fits best for us.

The main problem of these libraries is the lack of flexibility while using them to build our custom dropdown. That's where [downshift](https://github.com/downshift-js/downshift) comes into play.

### What is Downshift 🏎?

> Primitives to build simple, flexible, WAI-ARIA compliant React autocomplete, combobox or select dropdown components.

This is how [Kent C. Dodds](https://kentcdodds.com/) describes his library.

Downshift mainly takes care of three things: **managing state**, **user interactions** and **accessibility**. The rendering task is all up to the developer. This is possible because it uses both the [render prop pattern](https://reactjs.org/docs/render-props.html) and the [prop getters concept](https://kentcdodds.com/blog/how-to-give-rendering-control-to-users-with-prop-getters) at its core.

You can see its documentation [here](https://github.com/downshift-js/downshift#readme) and read [this blog post](https://kentcdodds.com/blog/introducing-downshift-for-react) for further details.

### How it works?

Downshift provides a [`<Downshift>` component](https://github.com/downshift-js/downshift#downshift-component) responsible for providing select and autocomplete/combobox logic as a render prop. It also provides a [set of hooks](https://github.com/downshift-js/downshift#the-react-hooks-api) holding dedicated logic to each behavior.

## Walk-through

### 1. Install `downshift`

```sh
npm i downshift --save
```

### 2. Example

Let's say we need to develop a Dropdown component and we have the following data:

```js
const items = [
    {
        label: "January",
        value: "january"
    },
    {
        label: "February",
        value: "february"
    },
    {
        label: "March",
        value: "march"
    },
];
```

We already have our data. What about now? The following code block is a complete example of how to develop a Dropdown component. Check the example first and then follow the explanation to better understand it.

#### 1. Component

ℹ️ We are using [`useSelect` hook](https://github.com/downshift-js/downshift/tree/master/src/hooks/useSelect) to build our example. You can use the [`<Downshift>` component](https://github.com/downshift-js/downshift#downshift-component) as well to achieve the same result. Check an example [here](https://github.com/downshift-js/downshift#usage).

```js
// Dropdown.js file

import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelect } from 'downshift';
import classNames from 'classnames';
import DropdownItem from 'path-to-dropdown-item';

import styles from './Dropdown.module.css';

const itemToString = (item) => item?.value ?? '';
const placeholderLabel = 'Choose your option';

const Dropdown = ({
    id,
    items,
    className,
    onStateChange,
    placeholderLabel,
    defaultSelectedItem,
    ...rest,
}) => {
    const {
        isOpen,
        selectedItem,
        highlightedIndex,
        getMenuProps,
        getItemProps,
        getToggleButtonProps,
    } = useSelect({ id, itemToString, items, onStateChange, defaultSelectedItem });

    const renderDropdownItems = useCallback(() => items.map((item, index) => (
        <DropdownItem
            item={ item }
            key={ `dropdown-item-${index}` }
            selected={ selectedItem === item }
            highlighted={ highlightedIndex === index }
            { ...getItemProps({ item, index }) } />
    )), [highlightedIndex, getItemProps, selectedItem, items]);

    return (
        <div { ...rest } className={ classNames(styles.container, className) }>
            <button
                className={ classNames(styles.trigger, { [styles.isOpen]: isOpen }) }
                { ...getToggleButtonProps() }>
                { selectedItem?.label ?? placeholderLabel }
            </button>
            <ul className={ styles.menu } { ...getMenuProps() }>
                { isOpen && renderDropdownItems() }
            </ul>
        </div>
    );
};

Dropdown.propTypes = {
    className: PropTypes.string,
    onStateChange: PropTypes.func,
    id: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    defaultSelectedItem: PropTypes.any,
    placeholderLabel: PropTypes.string,
};

export default Dropdown;
```

```js
// DropdownItem.js file

import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './DropdownItem.module.css';

const DropdownItem = forwardRef(({
    item,
    highlighted,
    selected,
    className,
    ...rest
}, ref) => {
    const itemClasses = classNames(
    styles.item,
    {
        [styles.highlighted]: highlighted,
        [styles.selected]: selected,
    },
    className);

    return (
        <li { ...rest } ref={ ref } className={ itemClasses }>
            { item.label }
        </li>
    );
})

DropdownItem.propTypes = {
    selected: PropTypes.bool,
    highlighted: PropTypes.bool,
    className: PropTypes.string,
    item: PropTypes.object.isRequired,
};

DropdownItem.defaultProps = {
    selected: false,
    highlighted: false,
};

export default DropdownItem;
```

#### 2. Explanation

**Structure**

Before diving into how the `useSelect` hook works, let's check our `Dropdown.js` file and let's analyze the structure of our `Dropdown` element:

- container `<div className={ styles.container }>...</div>` - it is the shell of our Dropdown and wraps both the trigger element and the menu element (`Dropdown.js` file)
- button `<button className={ ... }>...</button>` - this element is responsible for toggling the dropdown menu (`Dropdown.js` file)
- menu `<ul className={ styles.menu }>...</ul>` - this element represents the menu and it contains the list of items (`Dropdown.js` file)
- item `<li className={ ... }>...</li>` - this element represents each menu item (`DropdownItem.js` file)

⚠️ These elements are the ones we think that better represents our dropdown semantically. However, you can change the elements as long as you pass them the right props. E.g.: you can replace the `<button { ...getToggleButtonProps() }>` for a `<div { ...getToggleButtonProps() }>`. If you make changes like this, please check if accessibility is still working as expected. In this specific case, you would need to add `tabIndex="0"` prop to your `<div>` so that it becomes focusable in sequential keyboard navigation. Furthermore, you would also need to add `role="button"` so that your element appears as a button control to the screen reader.

**`useSelect` hook**

_Props_

It's important to know that while using Downshift we are dealing with a lot of props. Some of them are considered [basic](https://github.com/downshift-js/downshift/tree/master/src/hooks/useSelect#basic-props), other ones are considered [advanced](https://github.com/downshift-js/downshift/tree/master/src/hooks/useSelect#advanced-props). We need to pass some of them to `useSelect`, in order to get other ones. Long story short: some props are returned by this hook, other ones need to be passed to it.

Looking at our example in `Dropdown.js` file, we are passing `items`, `itemToString` and `onStateChange` callback. `useSelect` is returning `isOpen`, `selectedItem`, `highlightedIndex`, `getMenuProps`, `getItemProps` and `getToggleButtonProps` props.

- `id` - we are passing an id prop to avoid props mismatch between client-side rendering and server-side rendering. Read this [downshift/issues/602](https://github.com/downshift-js/downshift/issues/602) for further details.
- `items` - we are passing our array of items.
- `itemToString` - our array of items contains objects. Downshift needs a string representation for each item to keep accessibility working properly. Read more about it [here](https://github.com/downshift-js/downshift/tree/master/src/hooks/useSelect#itemtostring).
- `onStateChange` - we don't really need this prop for our example to work, but it was added for demonstration purposes. Every time the internal state changes (item is selected, menu is open, menu is closed, etc), the callback will be fired with the new state. If you just want a callback to run when a different item is selected, you can use [`onSelectedItemChange`](https://github.com/downshift-js/downshift/tree/master/src/hooks/useSelect#onselecteditemchange) instead.

_State_

Downshift has its own [internal state](https://github.com/downshift-js/downshift/tree/master/src/hooks/useSelect#state) which is managed internally. We are using the following pieces of it:
- `isOpen` - representing the menu open state. We are using it to toggle our menu and to apply some css to the toggle button.
- `selectedItem` - the currently selected item. We are using it to check whether an item is selected or not and pass the `selected` prop (bool) to `DropdownItem` so that we can apply some styling to our item.
- `highlightedIndex` - the index of the currently highlighted element. We are using it to check whether an item is highlighted or not and pass the `highlighted` prop to `DropdownItem` so that we can apply some styling to our item. Please note this prop is updated even with keyboard navigation.

⚠️ If you want to control some of these state pieces yourself, you can pass them as prop. E.g.: `useSelect({ items, isOpen: true })`. This example would force the menu to always be open.

_Prop Getters_

One of the core concepts of this library is _prop getters_ such as `getToggleButtonProps()` and `getMenuProps()`. These functions must be applied to the proper element and then Downshift will take care of wiring things up and make them work properly. Thus, `useSelect` provides us the following [_prop getters_](https://github.com/downshift-js/downshift/tree/master/src/hooks/useSelect#prop-getters):
- `getToggleButtonProps` - a props returning function. These returned props must be applied to the menu toggle button element. We are applying it to our `button` element. Further details on their [documentation](https://github.com/downshift-js/downshift/tree/master/src/hooks/useSelect#gettogglebuttonprops).
- `getItemProps` - a props returning function. These returned props must be applied to any menu item element. We are applying it to our `item` element. Further details on their [documentation](https://github.com/downshift-js/downshift/tree/master/src/hooks/useSelect#getitemprops).
- `getLabelProps` - a props returning function. These returned props must be applied to the label element. Further details [here](https://github.com/downshift-js/downshift/tree/master/src/hooks/useSelect#getlabelprops).
- `getMenuProps` - a props returning function. These returned props must be applied to the menu's root element. Further details [here](https://github.com/downshift-js/downshift/tree/master/src/hooks/useSelect#getmenuprops).

_Actions_

Although they're not used in this example, there is a set of props, called _actions_, returned by this hook that can be very useful to change its state imperatively. Here are some examples:

- `toggleMenu` - toggles the menu open state
- `closeMenu` - closes the menu
- `reset` - resets downshift's state

ℹ️ You can see the full list of _actions_ [here](https://github.com/downshift-js/downshift/tree/master/src/hooks/useSelect#actions).

#### 2. Component Usage

Here is an example of how to use the `<Dropdown>` component we've built so far:

```js
import React, { useCallback } from 'react';
import items from './items';
import Dropdown from './Dropdown';

export default function App() {
  const handleStateChange = useCallback((state) => console.log(state), []);

  return (
    <div>
      <h2>Dropdown with Downshift 🏎</h2>
      <Dropdown
        items={ items }
        id="month-switcher"
        onStateChange={ handleStateChange } />
    </div>
  );
}
```

#### 3. Native _select_ behavior support

On mobile/touch devices, the use of native _select_ behavior is highly recommended due to UX reasons. To implement that, our `<Dropdown>` component is going to need some enhancements. Our approach will place a native select element on top of our trigger button, with the same items that we are passing to our `<Dropdown>` component, but it will be invisible.

Whenever an option is selected, we need to update the internal state of `Downshift` so that those changes are reflected on the custom `<Dropdown>`.

Take a look at the following steps:

**1. Create a `<NativeSelect>` component**

```js
// NativeSelect.js

import React, { useCallback, forwardRef } from 'react';
import PropTypes from 'prop-types';

const NativeSelect = forwardRef(({
    items,
    onChange,
    placeholderLabel,
    ...rest,
}, ref) => {
    const renderOptions = useCallback(() => {
        const selectableOptions = items.map((item, index) => (
            <option
                value={ item.value }
                key={ `native-option-${index}` }>
                { item.label }
            </option>
        ));

        if (placeholderLabel) {
            const placeholderOption = (
                <option
                    disabled
                    value={ placeholderLabel }
                    key="native-option-disabled">
                    { placeholderLabel }
                </option>
            );

            return [placeholderOption, ...selectableOptions];
        }

        return selectableOptions;
    }, [items, placeholderLabel]);

    const handleChange = useCallback((event) => {
        const selectedItem = items.find((elem) => elem.value === event.target.value);

        onChange && onChange(selectedItem);
    }, [items, onChange]);

    return (
        <select
            { ...rest }
            ref={ ref }
            onBlur={ onBlur }
            className={ className }
            onChange={ handleChange }
            value={ selected?.value ?? placeholderLabel }>
            { renderOptions() }
        </select>
    );
});

NativeSelect.propTypes = {
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    selected: PropTypes.object,
    className: PropTypes.string,
    items: PropTypes.array.isRequired,
    placeholderLabel: PropTypes.string,
};

export default NativeSelect;
```

⚠️ Please note we are passing a `placeholderLabel` so that the native select is similar to the custom dropdown. You might not need it. You must be critical about what makes sense to your case scenario.

**2. Import `<NativeSelect>` component on `<Dropdown>` component**

```js
// Dropdown.js file

// ...
import NativeSelect from 'path-to-your-native-select';
```

**3. Add `<NativeSelect>` component**

```js
// Dropdown.js file

// ...

const {
    // ...
    closeMenu,
    toggleMenu,
} = useSelect({ ... });

const Dropdown = ({ items, onStateChange, className, ...rest }) => {
    // ...
    return (
        <div { ...rest } className={ classNames(styles.container, className) }>
            <button
                className={ classNames(styles.trigger, { [styles.isOpen]: isOpen }) }
                { ...getToggleButtonProps() }>
                { selectedItem?.label ?? placeholderLabel }
            </button>
            <NativeSelect
                items={ items }
                onBlur={ closeMenu }
                onClick={ toggleMenu }
                selected={ selectedItem }
                placeholderLabel={ placeholderLabel } />
            <ul className={ styles.menu } { ...getMenuProps() }>
                { isOpen && renderDropdownItems() }
            </ul>
        </div>
    );
};

// ...
```

⚠️ Note we are passing the prop onClick with the `toggleMenu` action to toggle the internal `Downshift` menu state. We are passing the `closeMenu` action to make sure the menu will be closed whenever the `onBlur` events fires.

**4. Add a new className to `NativeSelect` so that it gets positioned on top of the custom `Dropdown`**

```js
// Dropdown.js file

// ...

const Dropdown = ({ items, onStateChange, className, ...rest }) => {
    // ...
    return (
        <div ... className={ classNames(styles.container, className) }>
            // ...
            <NativeSelect
                items={ items }
                onBlur={ closeMenu }
                onClick={ toggleMenu }
                selected={ selectedItem }
                className={ styles.nativeSelect }
                placeholderLabel={ placeholderLabel } />
            // ...
        </div>
    );
};

// ...
```

```css
/* Dropdown.css file */

.container {
    /* ... */
    position: relative;
}

.nativeSelect {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
}
```

**5. Pass a `onChange` callback to `<NativeSelect>`**

```js
// Dropdown.js file

// ...

const Dropdown = ({ items, onStateChange, className, ...rest }) => {
    // ...

    const handleNativeSelectChange = useCallback((selectedItem) => {
        selectItem(selectedItem);
        toggleMenu();
    }, [toggleMenu, selectItem]);

    return (
        <div ... className={ classNames(styles.container, className) }>
            // ...
            <NativeSelect
                items={ items }
                onBlur={ closeMenu }
                onClick={ toggleMenu }
                selected={ selectedItem }
                className={ styles.nativeSelect }
                onChange={ handleNativeSelectChange }
                placeholderLabel={ placeholderLabel } />
            // ...
        </div>
    );
};

// ...
```

⚠️ `selectedItem` property of the internal state needs to be updated. For that, we need to pass an `onChange` callback to `<NativeSelect>`. Note that we are using the `selectItem(...)` action to achieve that.

**6. Add `display: none` to our `<Dropdown>` menu**

Now, by clicking on the native select, we are toggling the menu state of `Donwshift`. We need to hide our custom menu, because we just want the native menu to appear. For that, we need to add `display: none` to our `menu` element.

```css
/* Dropdown.css file */

.menu {
    /* ... */
    display: none;
}
```

 ⚠️ All these changes must only be done when we want to use the native behavior. Let's say we would like to use the native behavior on mobile resolutions only: we must use media queries and apply these changes on that specific resolutions. You might also need to add `display: none` to `NativeSelect` className for the resolutions where you want to use the custom menu.
