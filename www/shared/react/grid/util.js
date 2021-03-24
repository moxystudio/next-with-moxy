import styles from './grid.module.css';

const getResponsiveClasses = (name, value) => {
    if (!value) {
        return {};
    }

    if (typeof value === 'object') {
        return Object.entries(value).reduce((accumulator, [breakpoint, value]) => {
            const className = styles[`${name}-${breakpoint}-${value}`];

            if (!className) {
                console.warn(`Unknown grid responsive class: ${name}-${breakpoint}-${value}`);
            } else {
                accumulator[styles[`${name}-${breakpoint}-${value}`]] = true;
            }

            return accumulator;
        }, {});
    }

    return {
        [styles[`${name}-${value}`]]: true,
    };
};

export { getResponsiveClasses };
