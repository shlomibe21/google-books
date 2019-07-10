## SBS Books - Google Books API project

## Description
SBS Books is a mobile and desktop fully-responsive web application that allows users to search for books. The app is working with the google books api to find books according to the specified query inserted by the user into the search box.
The application displays up to 16 books on the page and the user can use the Next button to display the next 16 books if they are available or the Prev button to go back.

## Live Demo
-[To go to the live demo of SBS Books click here](https://google-books-sbs.herokuapp.com/)

## Installation and Setup Instructions for Development Environment
- **Node NPM and  GIT should be installed globaly on the machine.**

- **Installing the Application**
  - git clone https://github.com/shlomibe21/google-books.git
  - cd google-books
  - npm install

- **Run the Application**
  - npm start

- **Run tests**
  - npm test

- **To visit the Application**
  - http://localhost:3000/

- **Build for production**
  - npm run build

- **Deploy the Application**
  * We use TravisCI and Heroku for continuous integration and deployment. When a branch is pushed to GitHub it is automatically triggers a build in TravisCI which as part of the process will also run all the tests. 
  * Deployment: If the branch is master and the build is successful the application will be deployed to Heroku.

### App Screeshots
![Dashboard - empty page](https://github.com/shlomibe21/google-books/blob/master/public/screenshots/SBSBooksEmptyPage.png)
![Dashboard - with search results](https://github.com/shlomibe21/google-books/blob/master/public/screenshots/SBSBooksDashboard.png)

## Technologies
  - JavaScript
  - ReactJS
  - JSX
  - HTML5
  - CSS3
  
- **API**
  - google books API

- **Testing**
  - Enzyme

- **PaaS**
  - Travis CI
  - Heroku

 - **Dev Environment**
   - npm
   - Git

- **Responsive**
   - The app is responsive and optimized for both desktop and mobile viewing and use.
   
## Author
Shlomi Benshlomo
