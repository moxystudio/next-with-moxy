---
id: grid-system
title: Grid system
sidebar_label: Grid system
---

The boilerplate comes with a standardized Grid system to help you position elements on the screen, based on CSS flex box. It has the following specs:

| Breakpoint | Columns | Gutters | Width | Max Width |
| ---------- | ------- | ------- | ----- | --------- |
| xxs (≥0) | 4 | 16px | 100% - 20px * 2 | none |
| xs (≥480) | 4 | 16px | 100% - 20px * 2 | 660px |
| sm (≥768) | 8 | 24px | 85% | none |
| md (≥1024) | 12 | 24px | 85% | 1024px |
| lg (≥1280) | 12 | 32px | 85% | none |
| xl (≥1440) | 12 | 32px | 1200px | none |
| xxl (≥1920) | 12 | 32px | 1200px | none |

> ℹ️ Please note that the Grid has no outside gutters.

## Using the Grid

To use the grid, import `Container`, `Row` and `Col` components and use them like so:

```js
import { Container, Row, Col } from '../../shared/react/grid';

const MyPage = () => (
    <main>
        <Container>
            <Row>
                <Col columns={ { xxs: 2, sm: 4, md: 6 } }>50%</Col>
                <Col columns={ { xxs: 2, sm: 4, md: 6 } }>50%</Col>
            </Row>
            <Row>
                <Col
                    offset={ 1 }
                    columns={ { xxs: 2, sm: 6, md: 10 } }>
                    1 column spacing on each side
                </Col>
            </Row>
        </Container>
    </main>
);

export default MyPage;
```

Check out each of these component's prop-types to know what you are able to customize.

## Debug mode

You can visualize the Grid by toggling its debug mode. Simply run `__TOGGLE_GRID_DEBUG__()` in the console to enable debug mode. Running it again, disables it.

## Removing this feature

If your project is not using a Grid system for some reason, you'll want to remove all the unnecessary code associated with it. Be sure to follow these steps in order to clean your project properly:

1. Remove `www/shared/react/grid`.
4. Search globally for `/grid` and remove the corresponding code across the project.
5. Update your unit tests if necessary so that they all pass!
