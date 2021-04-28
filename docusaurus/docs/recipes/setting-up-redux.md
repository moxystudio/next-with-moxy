---
id: setting-up-redux
title: Setting Up Redux
sidebar_label: Redux
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img
src={ useBaseUrl('recipes-assets/setting-up-redux/redux-logo.svg') }
alt="Redux"
width="300" />

In this recipe, you will be guided through the process of setting up [redux](https://redux.js.org/) for your Next.js web app. This includes setting up the store and learning how to access it in your components.

## Walk-through

### 1. Installing

Install `redux`, `react-redux`, `redux-devtools-extension`, `redux-thunk` and `next-redux-wrapper` packages:

```shell
npm i redux react-redux next-redux-wrapper redux-devtools-extension redux-thunk
```

### 2. Building the store

In a new `state` directory inside your `redux` folder, create the `buildStore.js` file.

```
├───www
│   ├───shared
│   │   ├───redux
│   │   │   ├── buildStore.js
│   │   │   └── ...
│   │   └── ...
│   └── ...
└── ...
```

Content:

```js
// buildStore.js

import { applyMiddleware, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import thunkMiddleware from 'redux-thunk';

const buildStore = (initialState) => {
    const reducer = combineReducers({
    });

    const middlewares = [thunkMiddleware];
    const middlewareEnhancer = applyMiddleware(...middlewares);
    const enhancers = [middlewareEnhancer];
    const composedEnhancers = composeWithDevTools(...enhancers);

    const store = createStore(reducer, initialState, composedEnhancers);

    return store;
};

export default buildStore;
```

We will come back to this file when adding new `reducers`.
For an easier import, use an `index.js` in the `state` directory.

```js
export { default as buildStore } from './buildStore';
```

### 3. Adding store to App

In your `App.js`, import the newly created store, along with `withRedux` from `next-redux-wrapper` and `Provider` from `react-redux`.

```js
// App.js
import withRedux from 'next-redux-wrapper';
import { Provider as ReduxProvider } from 'react-redux';
import { compose } from 'redux'; // Only import this if you are already using other nested function transformations
import { buildStore } from '../shared/redux';

// ...

const enhance = compose(
    withIntlApp(loadLocale),
    withRedux(buildStore),
);

export default enhance(App);
```

Finally, add `store` to the received props for the `App` component (add it to `propTypes` too) and, on the render method, wrap your root body component in the `ReduxProvider`, passing the `store` prop:

```js
// App.js

// ...

export const App = ({ Component, pageProps, router, store }) => {
    // ...

    return (
      { /* ... */ }
            <ReduxProvider store={ store }>
                <KeyboardOnlyOutlines>
                        <LayoutTree
                            Component={ Component }
                            pageProps={ pageProps }
                            defaultLayout={ <MainLayout /> } />
                </KeyboardOnlyOutlines>
            </ReduxProvider>
      { /* ... */ }
    );
};

App.propTypes = {
    // ...
    store: PropTypes.object,
};

// ...
```

Now you have a store 🥳, but without any reducers it doesn't have anything to offer 😔.

<img
src={ useBaseUrl('recipes-assets/setting-up-redux/redux-no-reducers-devtools.png') }
alt="Store with empty state"
width="100%" />

### 4. Creating reducers

Now we will add a reducer to your store, let's call it `tickets` 😁.
In your `state` directory, create a `tickets` folder.
This folder should have `index.js`, `state.js`, `actionTypes.js`, `actions.js`, `reducer.js` and `selectors.js` files.

```
state
├───index.js
├───buildStore.js
├───tickets
│   ├───index.js
│   ├───actionTypes.js
│   ├───reducer.js
│   ├───selectors.js
```

1. Your `index.js` should just export everything in the reducer:

    ```js
    import reducer from './reducer';
    import * as actionTypes from './actionTypes';
    import * as actions from './actions';
    import * as selectors from './selectors';

    export {
        actionTypes,
        actions,
        reducer,
        selectors,
    };
    ```

2. First, let's write the `actionTypes`, with the list of types to be dispatched from the `actions` to the `reducer`:

    ```js
    // actionTypes.js

    export const SCOPE = 'TICKETS';

    export const ADD_TICKET = `${SCOPE}/ADD_TICKET`;
    export const REMOVE_TICKET = `${SCOPE}/REMOVE_TICKET`;
    export const GET_TICKET_HOLDER_START = `${SCOPE}/GET_TICKET_HOLDER_START`;
    export const GET_TICKET_HOLDER_FAIL = `${SCOPE}/GET_TICKET_HOLDER_FAIL`;
    export const GET_TICKET_HOLDER_SUCCESS = `${SCOPE}/GET_TICKET_HOLDER_SUCCESS`;
    ```

3. The `reducer` should instantiate the initial state and have the mutations associated with each dispatched action type.

   For each key in the state we'll have a different method (these methods are combined as reducers in the default export):

    ```js
    // reducer.js

    import { combineReducers } from 'redux';
    import * as actionTypes from './actionTypes';

    const initialState = {
        ticketHolder: {
            name: null,
            isLoading: false,
            error: null,
        },
        quantity: 0,
    };

    export const quantity = (state = initialState.quantity, action = {}) => {
        switch (action.type) {
        case actionTypes.ADD_TICKET:
            return state + 1;
        case actionTypes.REMOVE_TICKET:
            return state > 0 ? state - 1 : state;
        default:
            return state;
        }
    };

    export const ticketHolder = (
        state = initialState.ticketHolder,
        action = {},
    ) => {
        switch (action.type) {
        case actionTypes.GET_TICKET_HOLDER_START:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.GET_TICKET_HOLDER_FAIL:
            return {
                name: null,
                isLoading: false,
                error: action.payload.error,
            };
        case actionTypes.GET_TICKET_HOLDER_SUCCESS:
            return {
                name: action.payload.name,
                isLoading: false,
                error: null,
            };
        default:
            return state;
        }
    };

    export default combineReducers({
        quantity,
        ticketHolder,
    });
    ```

4. The `actions.js` file holds the methods used to request dispatches to be made to the reducer:

    ```js
    // actions.js

    import * as actionTypes from './actionTypes';

    export const addTicket = () => (dispatch) => {
        dispatch({ type: actionTypes.ADD_TICKET });
    };

    export const removeTicket = () => (dispatch) => {
        dispatch({ type: actionTypes.REMOVE_TICKET });
    };

    export const loadTicketHolder = () => async (dispatch) => {
        dispatch({ type: actionTypes.GET_TICKET_HOLDER_START });

        try {
            const response = await fetch('https://uinames.com/api/');
            const ticketHolder = await response.json();

            dispatch({
                type: actionTypes.GET_TICKET_HOLDER_SUCCESS,
                payload: { name: ticketHolder.name },
            });
        } catch (error) {
            dispatch({ type: actionTypes.GET_TICKET_HOLDER_FAIL, payload: { error } });
        }
    };
    ```

5. The `selectors` file exports methods used to get values from the reducer:

    ```js
    // selectors.js

    export const getNumberOfTickets = (state) => state.tickets.quantity;
    export const loadTicketHolder = (state) => state.tickets.ticketHolder.name;
    ```

    Now you have your reducer ready to be added to the store:

    ```js
    // buildStore.js

    import { applyMiddleware, createStore, combineReducers } from 'redux';
    import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
    import thunkMiddleware from 'redux-thunk';

    import ticketsReducer from './tickets';

    export default function buildStore(initialState) {
        const reducer = combineReducers({
            tickets: ticketsReducer,
        });

        const middlewares = [thunkMiddleware];
        const middlewareEnhancer = applyMiddleware(...middlewares);
        const enhancers = [middlewareEnhancer];
        const composedEnhancers = composeWithDevTools(...enhancers);

        const store = createStore(reducer, initialState, composedEnhancers);

        return store;
    };
    ```

Now your reducer can be seen in the store.

<img
src={ useBaseUrl('recipes-assets/setting-up-redux/redux-store-with-tickets-reducer.png') }
alt="Store with empty state"
width="100%" />

### 5. Accessing state from components

Now that your `tickets` reducer is in the store, it's time to access it in a component.
Let's use `Home.js` as an example.

1. We will first get the number of tickets and the ticket holder.

   For this you will need to import the `selector`, use a `mapStateToProps` function to call it's methods, and `connect` that function to your export (you might need to compose it with other transformer functions the future).

    ```js
    // Home.js

    // ...

    import { connect } from 'react-redux';
    import { selectors as ticketSelectors } from '../../shared/redux/tickets';

    // ...

    const mapStateToProps = (state) => ({
        numberOfTickets: ticketSelectors.getNumberOfTickets(state),
        ticketHolder: ticketSelectors.loadTicketHolder(state),
    });

    export default connect(mapStateToProps)(Home);

> ℹ️ Instead of using `connect`, you can use the new [hooks api](https://react-redux.js.org/api/hooks) to export your component/page.

2. Now that you have access to the number of tickets and the ticket holder in your component, add those values to the props and start using them (don't forget to add the new props to `propTypes`).
   Also, the `ticketHolder` value will be null at first, as we haven't `fetched` it yet, so let's wait until we have it to render the data.

    ```js
    // Home.js

    // ...

    const Home = ({ numberOfTickets, ticketHolder }) => (
        <div className={ styles.home }>
            <h1><FormattedMessage id="home.title" /></h1>
            {ticketHolder && (
                <span>My name is {ticketHolder} and I have {numberOfTickets}{' '} tickets</span>
            )}
        </div>
    );

    Home.propTypes = {
        numberOfTickets: PropTypes.number,
        ticketHolder: PropTypes.string,
    };

    // ...
    ```

### 6. Calling actions from components

Now that we can access the state from a component, it's time to change it.

1. First, we need to import the `actions` from the reducer and map them to the props using `mapDispatchToProps`, which is connected along with `mapStateToProps`.

    ```js
    // Home.js

    // ...

    import {
        selectors as ticketSelectors,
        actions as ticketActions,
    } from '../../shared/redux/tickets';

    // ...

    const mapDispatchToProps = {
        addTicket: ticketActions.addTicket,
        removeTicket: ticketActions.removeTicket,
        loadTicketHolder: ticketActions.loadTicketHolder,
    };

    export default connect(mapStateToProps, mapDispatchToProps)(Home);
    ```

2. Now that the actions are accessible, add them as props and call them to apply changes on the state 😉.

    ```js
    // Home.js

    // ...

    const Home = ({
        numberOfTickets,
        ticketHolder,
        addTicket,
        removeTicket,
        loadTicketHolder,
    }) => {

        useEffect(() => {
            !ticketHolder && loadTicketHolder();
        }, [ticketHolder, loadTicketHolder]);

        return (
            <div className={ styles.home }>
                <h1><FormattedMessage id="home.title" /></h1>
                {ticketHolder && (
                    <span>My name is {ticketHolder} and I have {numberOfTickets}{' '} tickets</span>
                )}
                <button onClick={ addTicket }>Add Ticket</button>
                <button onClick={ removeTicket }>Remove Ticket</button>
            </div>
        );
    };

    Home.propTypes = {
        numberOfTickets: PropTypes.number,
        ticketHolder: PropTypes.string,
        addTicket: PropTypes.func,
        removeTicket: PropTypes.func,
        loadTicketHolder: PropTypes.func,
    };

    // ...
    ```

    Your home will now show the state data (after fetching the `ticketHolder` 😌) and you can click the buttons to dispatch the `addTicket` and `removeTicket` actions:

    <img
    src={ useBaseUrl('recipes-assets/setting-up-redux/redux-home-with-state.png') }
    alt="Store with empty state"
    width="100%" />

### 7. Testing

1. First, install `redux-mock-store` and `jest-fetch-mock` packages.

    ```shell
    npm i --save-dev redux-mock-store jest-fetch-mock
    ```

2. Next, create a mock for `buildStore`, we will place it in a `mocks` directory inside `shared/redux`.

    ```js
    // buildStore.mock.js

    /* global jest */

    import configureStore from 'redux-mock-store';

    const thunk = ({ dispatch, getState }) => (next) => (action) => {
        if (typeof action === 'function') {
            return action(dispatch, getState);
        }

        return next(action);
    };

    export const mockStore = () => {
        const middlewares = [thunk];
        const mockStore = configureStore(middlewares);

        const store = mockStore();

        return store;
    };
    ```

3. For `buildStore.js` you can just confirm the returned objects have the right content:

    ```js
    // buildStore.test.js

    import buildStore from './buildStore';

    const store = buildStore({}, {});

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return a store', () => {
        expect(store).toStrictEqual(expect.objectContaining({
            dispatch: expect.any(Function),
            getState: expect.any(Function),
            replaceReducer: expect.any(Function),
            subscribe: expect.any(Function),
        }));
    });
    ```

4. Now, setup a provider with a mock store.

    ```js
    // shared/react/testing-library/app-tree/AppTree.js

    import React from 'react';
    import PropTypes from 'prop-types';
    import { Provider } from 'react-redux';
    import { mockStore } from '../shared/redux/mocks/buildStore.mock';

    export const AppTree = ({ children }) => {
        // ...

        return (
            <Provider store={ mockStore() }>
                { /* ... */ }
            </Provider>
        );
    };

    // ....
    ```

5. To test `reducer.js`, you can just call the inner reducer functions and pass a mock state as the first argument.

    ```js
    // reducer.test.js

    import * as reducer from './reducer';
    import * as actionTypes from './actionTypes';

    describe('quantity reducer', () => {
        it('should do nothing if action has no relevant type', () => {
            const newState = reducer.quantity(1);

            expect(newState).toEqual(1);
        });

        it('should add ticket on ADD_TICKET', () => {
            const newState = reducer.quantity(1, { type: actionTypes.ADD_TICKET });

            expect(newState).toEqual(2);
        });

        it('should not remove ticket if quantity is 0', () => {
            const newState = reducer.quantity(0, {
                type: actionTypes.REMOVE_TICKET,
            });

            expect(newState).toEqual(0);
        });

        it('should remove ticket on REMOVE_TICKET', () => {
            const newState = reducer.quantity(1, {
                type: actionTypes.REMOVE_TICKET,
            });

            expect(newState).toEqual(0);
        });
    });

    describe('ticketHolder reducer', () => {
        it('should do nothing if action has no relevant type', () => {
            const newState = reducer.ticketHolder(1);

            expect(newState).toEqual(1);
        });

        it('should set isLoading if starting', () => {
            const newState = reducer.ticketHolder(
                { isLoading: false },
                { type: actionTypes.GET_TICKET_HOLDER_START },
            );

            expect(newState.isLoading).toEqual(true);
        });

        it('should set error on fail', () => {
            const newState = reducer.ticketHolder({ error: null }, {
                type: actionTypes.GET_TICKET_HOLDER_FAIL,
                payload: { error: 'error' },
            });

            expect(newState.error).toEqual('error');
        });

        it('should set new ticket holder on success', () => {
            const newState = reducer.ticketHolder({ error: null, isLoading: true, name: null }, {
                type: actionTypes.GET_TICKET_HOLDER_SUCCESS,
                payload: { name: 'holder' },
            });

            expect(newState).toStrictEqual({ name: 'holder', isLoading: false, error: null });
        });
    });
    ```

6. To test `actions.js`, in this case you just need to check that the correct dispatches are being made.

   Here we will need to mock an error response for our fetch to assert that the `FAIL` action type is being correctly dispatched.
   Also, tests that involve these async methods should also be async, so we can await for all the store dispatches to be executed:

    ```js
    // actions.test.js

    import { enableFetchMocks } from 'jest-fetch-mock';
    import * as actionTypes from './actionTypes';
    import { mockStore } from '../mocks/buildStore.mock';
    import { actions as ticketsActions } from '.';


    enableFetchMocks();
    fetch.mockResponse('{ "name": "holder" }');

    it('should create the correct actions for addTicket', () => {
        const store = mockStore();

        store.dispatch(ticketsActions.addTicket());

        const actions = store.getActions();

        expect(actions[0]).toMatchObject({ type: actionTypes.ADD_TICKET });
    });

    it('should create the correct actions for removeTicket', () => {
        const store = mockStore();

        store.dispatch(ticketsActions.removeTicket());

        const actions = store.getActions();

        expect(actions[0]).toMatchObject({ type: actionTypes.REMOVE_TICKET });
    });

    it('should create the correct actions for loadTicketHolder', async () => {
        const store = mockStore();

        await store.dispatch(ticketsActions.loadTicketHolder());

        const actions = store.getActions();

        expect(actions).toStrictEqual([
            { type: actionTypes.GET_TICKET_HOLDER_START },
            { type: actionTypes.GET_TICKET_HOLDER_SUCCESS, payload: { name: 'holder' } },
        ]);
    });

    it('should dispatch error for loadTicketHolder when fetch fails', async () => {
        const store = mockStore();
        const error = new Error('fake error message');

        fetch.mockReject(error);

        await store.dispatch(ticketsActions.loadTicketHolder());

        const actions = store.getActions();

        expect(actions).toStrictEqual([
            { type: actionTypes.GET_TICKET_HOLDER_START },
            { type: actionTypes.GET_TICKET_HOLDER_FAIL, payload: { error } },
        ]);
    });
    ```

    Packages like [redux-mock-store-await-actions](https://github.com/moxystudio/redux-mock-store-await-actions) or [redux-actions-assertions](https://github.com/redux-things/redux-actions-assertions) may also be helpful in tests like these.

7. `selectors.js`, like `reducer.js`, can be tested by passing a mocked state as the first argument and checking the correct retrieval of the values:

    ```js
    // selectors.test.js

    import { selectors as ticketsSelectors } from '.';

    describe('getNumberOfTickets', () => {
        it('should return correct value', () => {
            expect(ticketsSelectors.getNumberOfTickets({ tickets: { quantity: 3 } })).toEqual(3);
        });
    });

    describe('loadTicketHolder', () => {
        it('should return correct value', () => {
            expect(ticketsSelectors.loadTicketHolder({ tickets: { ticketHolder: { name: 'holder' } } })).toEqual('holder');
        });
    });
    ```

And you're done, you have created a store, accessed it from a component and tested it.
