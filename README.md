# YASTM

## Overview

This is a yet another Firefox add-on that try to play URLs with mpv player.

This extension creates an address bar button and a context menu item.

### Permissions
- storage - store settings
- activeTab - get current tab URL when browser action (URL bar icon) is used / load content script to pause videos in the page
- contextMenus - create context menu items
- nativeMessaging - communication between the host application and extension
##### Optional
- tabs - handle Auto play
- bookmarks - Get bookmark item details (URL)

## Install

### Add-on

Get the add-on from Mozilla [AMO Page](https://addons.mozilla.org/en-US/firefox/addon/yastm/)

### Host application

(I need help to Windows support)

#### Linux, MacOS, BSD

##### Dependencies
- `curl` (only for the install script)
- `python3`

Download and run `/host/install-host.sh`.

```
curl -sSL https://raw.githubusercontent.com/fazekmar/yastm/master/host/install-host.sh | sh -s
```

## Build

### Prerequisites

You need a sh compatible shell and npm.

### Installing and Build

Install the required npm packages

```
$ npm i
```

Start a developer server

```
$ npm run start
```

or build production code

```
$ npm run build
```

### Check coding style

```
$ npm run lint
```

Fix errors

```
$ npm run lint-fix
```

## Deployment

Create zip

```
$ npm run zip
```
