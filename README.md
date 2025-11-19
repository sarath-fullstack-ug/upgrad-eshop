# upGrad Eshop (Frontend)

A React-based frontend for the upGrad Eshop project.
This boilerplate provides the UI for product listing, authentication, cart management, checkout, and integrates cleanly with the backend APIs.

## About
This repository contains the frontend built with Create React App.
It includes:

- Complete project skeleton
- Axios API setup
- Token-based authentication flow
- Example tests (Navbar + Login)
- Environment variable documentation

This serves as the starter code for the upGrad Eshop frontend assignment.

## Tech stack
- React
- React Router
- Redux
- fetch
- Node.js (development + build)

## Setup / Install
1. Clone the repo
  - git clone https://github.com/<owner>/upgrad-eshop.git
  - cd upgrad-eshop

Quick start:
  - Copy files into a `create-react-app` generated project or run `npx create-react-app .` in this folder.
  - Add `.env.local` with `REACT_APP_API_BASE` 
  - API Base URL: `REACT_APP_API_BASE=https://dev-project-ecommerce.upgrad.dev/api`
  - Restart the dev server.
  - Run `npm install` to install dependencies.
  - Start the app using `npm start`.

## Tests
- **test: add basic unit tests for Navbar and Login**
  - Added Jest + React Testing Library basics for login render and navbar link presence.

## Notes
- Token storage key: `uc_eshop_token`
- API Base URL: `REACT_APP_API_BASE=https://dev-project-ecommerce.upgrad.dev/api`

## Authentication:
- The server returns the authentication token either in the 
- `x-auth-token` response header **or** 
- `token` (JSON response body).
- The token is stored in `localStorage` under the key: upgrad_eshop_token

## Auth flow notes
- On `signin`, extract token from:
- `response.headers['x-auth-token']`, or  
- `response.data.token`
- The axios instance in `src/common/api.js` automatically attaches the token to outgoing requests using:
