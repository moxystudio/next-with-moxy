/* eslint-disable no-restricted-imports */

import { render, queries } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AppTree from './app-tree';
import * as customQueries from './custom-queries';

const customRender = (ui, options) =>
    render(ui, {
        wrapper: AppTree,
        queries: { ...queries, ...customQueries },
        ...options,
    });

// Export everything from RTL.
export * from '@testing-library/react';

// Override render method.
export { customRender as render };

// Export userEvent to events, such as click.
export { userEvent };
