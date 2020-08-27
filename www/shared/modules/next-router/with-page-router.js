import React, { forwardRef } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import usePageRouter from './use-page-router';

const withPageRouter = (WrappedComponent) => {
    const WithPageRouter = forwardRef((props, ref) => {
        const router = usePageRouter();

        return (
            <WrappedComponent ref={ ref } pageRouter={ router } { ...props } />
        );
    });

    WithPageRouter.displayName = `withPageRouter(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
    hoistNonReactStatics(WithPageRouter, WrappedComponent);

    return WithPageRouter;
};

export default withPageRouter;
