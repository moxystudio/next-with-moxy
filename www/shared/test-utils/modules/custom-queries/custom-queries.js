import { queryHelpers, buildQueries } from '@testing-library/react';

// The queryAllByAttribute is a shortcut for attribute-based matchers
// You can also use document.querySelector or a combination of existing
// testing library utilities to find matching nodes for your query
const queryAllByDataWaitForReactElement = (...args) =>
    queryHelpers.queryAllByAttribute('data-wait-for-react-element', ...args);

const getMultipleError = (c, dataWaitForReactElement) =>
  `Found multiple elements with the data-wait-for-react-element attribute of: ${dataWaitForReactElement}`;
const getMissingError = (c, dataWaitForReactElement) =>
  `Unable to find an element with the data-wait-for-react-element attribute of: ${dataWaitForReactElement}`;

const [
    queryByDataWaitForReactElement,
    getAllByDataWaitForReactElement,
    getByDataWaitForReactElement,
    findAllByDataWaitForReactElement,
    findByDataWaitForReactElement,
] = buildQueries(queryAllByDataWaitForReactElement, getMultipleError, getMissingError);

export {
    queryByDataWaitForReactElement,
    queryAllByDataWaitForReactElement,
    getByDataWaitForReactElement,
    getAllByDataWaitForReactElement,
    findByDataWaitForReactElement,
    findAllByDataWaitForReactElement,
};
