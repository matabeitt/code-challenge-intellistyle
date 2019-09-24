# Intellistyle Challenge

This is a single page application as a technical assessment for a Junior Software Developer role with Intellistyle.

## About the Repo

This is a simple react project expanded from the `create-react-app` boilerplate.

## Functionality

### Search

The application opens on a page with a simple search form prompting the user to enter some sort of clothing article keywords.

### HTTP Request

After a valid search is requested, the app will conditionally render the item list view which will be populated asynchronously by data from a remote resource.

```
Due to this, searches may take several seconds to propogate data, as the remote file is not stored on the development environment.
```
### Pagination

In the event that a search returns multiple results `(e.g. 100 - 6000)`, the application will paginate on the client side in increments of twenty (20) items per page. The user can then navigate to other pages for more results.

### Item Detail

A brief item detail is provided in a card format - courtesy of Bootstrap. Including `title, categories, title, image, url` for user consumption and forward linkage.

# React Project

The application is not made for production use.

## Starting the development server

The development server can be started from the project directory by issuing the following command:
```
npm start
```
or
```
yarn start
```

