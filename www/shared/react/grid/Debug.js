import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import Container from './Container';
import Row from './Row';
import Col from './Col';

import styles from './Debug.module.css';

const Debug = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        window.__TOGGLE_GRID_DEBUG__ = () => {
            setVisible(!visible);
        };

        return () => {
            delete window.__TOGGLE_GRID_DEBUG__;
        };
    }, [visible]);

    return (
        <div className={ classNames(styles.debug, visible && styles.visible) }>
            <div className={ styles.currentBreakpoint } />
            <Container className={ styles.container }>
                <Row className={ styles.row }>
                    <Col className={ styles.col } columns={ 1 }>
                        <div className={ styles.colContent }>1</div>
                    </Col>
                    <Col className={ styles.col } columns={ 1 }>
                        <div className={ styles.colContent }>2</div>
                    </Col>
                    <Col className={ styles.col } columns={ 1 }>
                        <div className={ styles.colContent }>3</div>
                    </Col>
                    <Col className={ styles.col } columns={ 1 }>
                        <div className={ styles.colContent }>4</div>
                    </Col>
                    <Col className={ styles.col } columns={ 1 }>
                        <div className={ styles.colContent }>5</div>
                    </Col>
                    <Col className={ styles.col } columns={ 1 }>
                        <div className={ styles.colContent }>6</div>
                    </Col>
                    <Col className={ styles.col } columns={ 1 }>
                        <div className={ styles.colContent }>7</div>
                    </Col>
                    <Col className={ styles.col } columns={ 1 }>
                        <div className={ styles.colContent }>8</div>
                    </Col>
                    <Col className={ styles.col } columns={ 1 }>
                        <div className={ styles.colContent }>9</div>
                    </Col>
                    <Col className={ styles.col } columns={ 1 }>
                        <div className={ styles.colContent }>10</div>
                    </Col>
                    <Col className={ styles.col } columns={ 1 }>
                        <div className={ styles.colContent }>11</div>
                    </Col>
                    <Col className={ styles.col } columns={ 1 }>
                        <div className={ styles.colContent }>12</div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

Debug.defaultProps = {
    component: 'div',
};

// Export a mock component in production.
const FinalDebug = process.env.NODE_ENV === 'production' ? () => null : Debug;

export default FinalDebug;
