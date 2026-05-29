# Lendsqr Frontend Engineer Assessment

This is a React, TypeScript, and SCSS implementation of the Lendsqr frontend assessment. The app builds the login page, dashboard/users page, user table, filter UI, action dropdown, and user details page using mock API data with 500 users.

## Tech Stack

- React
- TypeScript
- SCSS
- React Router
- Vite
- Vitest
- React Testing Library

## Main Features

- Login page based on the Lendsqr design
- Dashboard and users page layout with sidebar and top navbar
- Mock API data with 500 user records
- Summary cards for users, active users, users with loans, and users with savings
- Users table with pagination, status badges, filters, and action menu
- User details page with profile summary and general details sections
- localStorage usage for selected user details
- Responsive layout for desktop, tablet, and mobile
- Unit tests for login, user loading, filter behavior, and localStorage

## Project Structure

src/
assets/ # Logo and static assets
components/ # Shared UI components
data/ # Mock 500-user JSON data
pages/ # Login, Dashboard, Users, UserDetails pages
services/ # Mock API service layer
styles/ # Global SCSS and variables
test/ # Test setup
types/ # TypeScript types
utils/ # Formatting and localStorage helpers

## How to Run Locally

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal.

## Deployment

This project can be deployed on Vercel, Netlify, or any free hosting platform.

## Assessment Notes

I used a mock JSON dataset with 500 records and wrapped access to it in a service layer so the app behaves like it is calling an API. When the user clicks **View Details**, the selected user is saved to localStorage and then loaded on the details page. This follows the assessment requirement to store and retrieve user details locally.

The code is split into pages, components, services, types, and utility files to keep the structure easy to follow. SCSS is used for styling and responsive rules.
