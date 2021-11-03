# AR.JS

- <https://github.com/AR-js-org/AR.js>
- <https://gitee.com/mirrors/AR.js>
- <https://ar-js-org.github.io/AR.js-Docs/>
- image recognition based on Artoolkit

## Types

- [Image Tracking](#image-tracking)
- [Location based AR](#location-based-ar)
- [Marker tracking](#marker-tracking)

## Key points

- Web-based : It is a pure web solution, so no installation required. Full javascript based on three.js + A-Frame + jsartoolkit5
- Open Source
- Standards : It works on any phone with webgl and webrtc

## Features

- uses jsartoolkit5 for tracking
- display augmented content with either three.js or A-Frame

## Import the library

- AR.js with Image Tracking + Location Based AR

  ```html
  <!-- Import AFRAME version -->
  <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js">
  <!-- Import three.js version -->
  <script src="https://raw.githack.com/AR-js-org/AR.js/master/three.js/build/ar-nft.js">
  ```

- AR.js with Marker Tracking + Location Based AR

  ```html
  <!-- Import AFRAME version -->
  <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js">
  <!-- Import three.js version -->
  <script src="https://raw.githack.com/AR-js-org/AR.js/master/three.js/build/ar.js">
  ```

  - To import a specific version, can do that easily replacing master with the version tag, e.g.:

  ```html
  <script src="https://raw.githack.com/AR-js-org/AR.js/3.0.0/aframe/build/aframe-ar-nft.js">
  ```

## Requirements

- It works on every phone with webgl and webrtc.
- Marker based is very lightweight, while Image Tracking is more CPU consuming
- On device with multi-cameras, Chrome may have problems on detecting the right one. Please use Firefox if you find that AR.js opens on the wrong camera. There is an open issue for this.
- To work with Location Based feature, your phone needs to have GPS sensors
- Please, read carefully any suggestions that AR.js pops-up -as alerts- for Location Based on iOS, as iOS requires user actions to activate geoposition
- Location Based feature is only available on A-Frame

- Always deploy under https

## Issues

- [StackOverflow](https://stackoverflow.com/search?q=ar.js)
- [Gitter chatroom](https://gitter.im/AR-js/Lobby)

## Examples

- <https://github.com/stemkoski/AR-Examples>

## Image Tracking

- Keyword: `Natural Feature Tracking`

### Choose good images

<https://github.com/Carnaux/NFT-Marker-Creator/wiki/Creating-good-markers>

- Good dpi
- More infomation included by image

### Create Image Descriptors

- Web - <https://carnaux.github.io/NFT-Marker-Creator/#/>
- node version - `node app.js -i <path-to-the-img/image-name.jpg/png>`

### Examples - NFT

- <https://github.com/AR-js-org/AR.js/blob/master/aframe/examples/image-tracking/nft/index.html>
- <https://github.com/AR-js-org/AR.js/blob/master/three.js/examples/nft.html>

## Location based AR

Location Based has been implemented only for A-Frame framework

## Marker tracking

Markers can be of three, different types:

- Hiro: default, not very useful
- Barcode: auto-generated markers, from matrix computations
- Pattern: custom ones

### Create Pattern Markers

<https://ar-js-org.github.io/AR.js/three.js/examples/marker-training/examples/generator.html>
