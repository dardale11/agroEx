# Product Viewer - AgroExchange – Home Assignment

## Introduction

This project is a product viewer react native application built using the react native cli. It provides view of diffrent attributes that can be selected in order to choose proper product.

## Design

I have used `FlatList` to dislay the sliding options - a component called `SliderOptions` which contains `SliderItem` is responsible for the options displaing.
Another component is `SelectedItemView` which is responsible for displaing the selcted item.

All of the diffrent components are using `Redux` state mangment to comunicate - i have used the latest recomnded version which is `redux-toolkit`

The `mock-api` is palced in helpers folder.
Other helper functions are place in `transformes` inside helpers folder. function there helps to get cognitive load of the `itemsSlice` which is the oly reducer.

In attemp to make thigs as 'genric as possible' with though of maybe needing to add more sliders in the futre - the filtering and approching of data int the reducer became a bit complex.
With this in mind - building it for only 3 static sliders would be much more easy and readble, but much less scalble.

in the `Hooks` folder was defind a typed dispatch hook.

all the compnents are strtured together in the `MainView` in views

## Installation

To install and run the project, follow these steps:

1. Clone the repository: `git clone https://github.com/dardale11/FileTree.git`
2. Change to the client directory: `cd client/file-viewer`
3. Install dependencies: `npm install`
4. Start the client: `ng serve`
5. Change to the server directory: `cd ../../server`
6. Install dependencies: `npm install`
7. Start the server: `node server.js`
8. View the app at `http://localhost:4200`
