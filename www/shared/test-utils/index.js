import { render, queries } from '@testing-library/react';
import AppTree from './modules/react-app-tree';
import * as customQueries from './modules/custom-queries';

const customRender = (ui, options) =>
    render(ui, {
        wrapper: AppTree,
        queries: { ...queries, ...customQueries },
        ...options,
    });

// re-export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render };
