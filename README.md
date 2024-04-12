# Nursery-Nav

<p align="center">
    <img width="300" height="300" src="./img/promo.jpg">
</p>

[![Frontend build](https://github.com/kubawajs/nursery-nav/actions/workflows/frontend.yml/badge.svg?branch=main)](https://github.com/kubawajs/nursery-nav/actions/workflows/frontend.yml)

NurseryNav simplifies the search for nearby nursery schools by providing an easy-to-use map interface to help you find the perfect childcare option for your little ones.

**Live URL:** [https://nursery-nav.vercel.app/](https://nursery-nav.vercel.app/)
**Backend API DEMO:** [TBD]

---
This project is part of [100 commitow challenge](https://100commitow.pl/). It helps me learn front-end technologies like React, Typescript and NestJS.

## Stack

### Frontend

* [React](https://react.dev/)
* [Typescript](https://www.typescriptlang.org/)
* [React Leaflet](https://react-leaflet.js.org/)
* [MUI](https://mui.com/material-ui/getting-started/)

### Backend

* [NestJS](https://nestjs.com/)

## Getting Started

### Prerequisites

* Node v21.6.2

### Frontend

Go to `./src/nursery-nav` and run `npm start`.

### Backend

A static JSON file is provided as the backend API for the MVP version.
Check `./data/RZ-instytucje-enriched.json`
Soon will be connected to the API.

#### Running backend
Go to `./src/nursery-nav-api` and run `npm run start`.

## Features

### MVP ✅

#### Map view

![Map view](./img/map-view.png)

#### Details view

![Details view](./img/details-view.png)

#### Frontend

* [x] Static data source
* [x] Map
* [x] Pins on map
* [x] Institution details view
* [x] Search
* [x] Display institution details on pin click
* [x] Basic component styling
* [x] Group pins on the map
* [x] SEO
* [x] Sorting
* [x] Filtering
* [x] Direct URLs to each institution
* [x] CICD
* [x] Live URL

### Phase 2

#### Frontend

* [ ] Connection to the API
* [ ] Infinite scroll

#### API

* [x] API project
* [x] Swagger `/api`
* [x] GET all institutions
* [x] GET institution details
* [x] Sorting
* [ ] Autocomplete endpoint
* [ ] Filtering
* [x] Pagination
* [ ] CICD
* [ ] Live URL
* [ ] DB data source

### Phase 3

#### Frontend

* [ ] Institution profile
* [ ] Institution rating

#### API

* [ ] CSV import

## Data source

Static file `/data/RZ-instytucje.csv`.

Original data source - [Rejestr Żłobków - lista instytucji - dane.gov.pl](https://dane.gov.pl/pl/dataset/2106/resource/55499/table).

License: [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/legalcode.pl)