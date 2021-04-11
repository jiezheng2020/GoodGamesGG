# <img src="public/favicon.ico" width="25" height="25"> Welcome to GoodGamesGG!

[GoodGamesGG](https://goodgamesgg.herokuapp.com/), a [Goodreads](https://www.goodreads.com/) inspired project, is a social cataloging website that allows users to search its database of videogames. Users can signup/login to create lists of videogames to help keep track of and organize their videogame history. Users will also receive suggestions based off of their preferences.

### **Live Link: [GoodGamesGG](https://goodgamesgg.herokuapp.com/)**

## Starting Development
- Check out our [Wiki](https://github.com/jiezheng2020/GoodGamesGG/wiki) Documentation for more details on features and API documentation!

## Technologies 
#### Front-End
- Javascript
- HTML
- Renders with PUG
- CSS
- Heroku Server

#### Back-End
- PostgreSQL: Database
- ExpressJs: Express session
- Bcrypt: User Authentication
- Faker: Populate data into database
- Sequelize: Manage Database

## Features
 - User session authentication/authorization handled using bcryptjs for hashing and Express session for cookie generation
 - Authorized users granted access to creating and editting ratings/reviews.
 - Authorized users are able to create custom libraries and add games to it.
 - Uses AJAX to filter games in game page asynchronously

## Challenges
 - We initially had alot of issues with unseeding our database, running into foreign key constraints. The issue stemmed from us manipulating our database via dotenv instead of just sequelize locally, and there were certain practices we had to do differently.
 - We initially had alot of CSS issues, making sure our pages didn't inherit any styles we didn't want it to. We also needed to make our website responsive to different screen sizes.

## Code Highlights

## Future Implementations
 - Search bar to search across all models
 - Having genres on each game to give users more preference options
 - Displaying an accounts page with user information
