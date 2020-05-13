---
id: video-player
title: Adding a video player
sidebar_label: Video player
---

Having videos in your website is a common need. In this recipe we will show you how to use [`react-player`](https://github.com/CookPete/react-player), a package that helps adding video content to your website, along with some common use cases.

## Walk-through

### 1. Install `react-player`

```sh
npm i react-player
```

### 2. Use `ReactPlayer` in your project

You just need to import `ReactPlayer` and start using it.

```js
// ...
import ReactPlayer from 'react-player';

const Home = () => (
    <div className={ styles.home }>
        <ReactPlayer url="https://www.video-url.com" />
    </div>
);
```

### 3. Common use cases

Now let's go through some common use cases that might be helpful.

> ⚠️ By default [`react-player`](https://github.com/CookPete/react-player) sets a width of 640px and a height of 360px to the video player. You should change it using [`width` and `height` props](https://github.com/CookPete/react-player#props) in order to make it [responsive](https://github.com/CookPete/react-player#responsive-player) according to your needs.

#### 1. Autoplay

To enable autoplay you need to use the [`playing` prop](https://github.com/CookPete/react-player#props), that lets you control the playing of the video. It can be particularly useful when you have a loading state and you only want the video to play after the loading is over.

```js
const [isPlaying, setIsPlaying] = useState(true);

// ...

<ReactPlayer url="https://www.video-url.com" playing={ isPlaying } />
```

ℹ️ Be sure to check the different browser policies for [autoplaying videos](https://github.com/CookPete/react-player#autoplay) as they are different and you might need additional configuration. For example, on Chrome you might need to mute the video in order to autoplay it, or in Safari you might need additional work to make it autoplay on low power mode devices which is a common problem.

#### 2. Enable/disable default controls

To enable or disable the video controls you need to use the [`controls` prop](https://github.com/CookPete/react-player#props).

```js
<ReactPlayer url="https://www.video-url.com" controls />
```

#### 3. Disable download

The download of videos is enabled by default. To disable it you need to change the [`controlsList` property](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/controlsList) using the [`config` prop](https://github.com/CookPete/react-player#props).

```js
<ReactPlayer
    url="https://www.video-url.com"
    config={ {
        file: {
            attributes: {
                controlsList: "nodownload"
            }
        }
    } } />
```

#### 4. Disable context menu

The context menu is enabled by default. To disable it you need to change the [`onContextMenu` event](https://developer.mozilla.org/en-US/docs/Web/API/Element/contextmenu_event) and prevent the default behavior.

```js
const handleContextMenu = useCallback((event) => {
    event.preventDefault();
}, []);

// ...

<ReactPlayer url="https://www.video-url.com" onContextMenu={ handleContextMenu } />
```

#### 5. Change the play icon

When using the player in [`light` mode](https://github.com/CookPete/react-player#light-player) you can change the `playIcon` to whatever you need.

```js
<ReactPlayer
    url="https://www.video-url.com"
    light
    playIcon={ <div>Icon</div> } />
```

You can also pass an image URL to the `light` prop so it shows the image instead of the video thumbnail.

> There is a lot more that you can do with [`react-player`](https://github.com/CookPete/react-player), so please take a look at [their documentation](https://github.com/CookPete/react-player#props) to find more information.
