import React, { forwardRef } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import useRouter from './use-router';

const withRouter = (WrappedComponent) => {
    const withRouter = forwardRef((props, ref) => {
        const router = useRouter();

        return (
            <WrappedComponent ref={ ref } router={ router } { ...props } />
        );
    });

    withRouter.displayName = `withRouter(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
    hoistNonReactStatics(withRouter, WrappedComponent);

    return withRouter;
};

export default withRouter;
