module.exports = (db) => {

  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

  // let indexControllerCallback = (request, response) => {
  //     db.pokemon.getAll((error, allPokemon) => {
  //       response.render('pokemon/index', { allPokemon });
  //     });
  // };

  let landingPage = (request, response) => {

    if(request.cookies.loggedin === "true") {
        response.redirect('/home')
    } else {
      response.render('landingPage');
    }

  };

  let allTweetsController = (request, response) => {

    if(request.cookies.loggedin === "true") {
        db.pokemon.getAllTweets(request.cookies.userID, (error, allTweets) => {

        response.render('home', { allTweets });
      });

    } else {
      response.render('landingPage');
    }

  };

  let registerForm = (request, response) => {
      response.render('forms/register');
  };

  let createUserController = (request, response) => {

      db.pokemon.createUser(request.body, (error, userCreated) => {

        response.cookie('userID', userCreated[0].id)
        response.cookie('username', userCreated[0].username)
        response.cookie('loggedin', true);
        response.redirect('/home');
      });
  };

  let loginForm = (request, response) => {

    response.render('forms/login');

  };

  let loginController = (request, response) => {

      db.pokemon.checkUser(request.body, (error, checkResult) => {

        if(request.body.password === checkResult[0].password){

            response.cookie('userID', checkResult[0].id)
            response.cookie('username', checkResult[0].username)
            response.cookie('loggedin', true);
            response.redirect('/home');

        } else{
            console.log("Wrong password!")
            response.status(403);
        }

      });
  };

  let logoutController = (request, response) => {

      response.cookie('userID', null)
      response.cookie('username', null)
      response.cookie('loggedin', false);
      response.redirect('/');
  };

  let tweetController = (request, response) => {

    db.pokemon.createNewTweet(request.cookies.userID, request.body.tweets, (error, allTweets) => {
        // response.render('home', { allTweets });
        // response.render('home');
        response.redirect('/home')
    });


  };

  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    // index: indexControllerCallback,
    landingPage,
    allTweets: allTweetsController,
    registerForm,
    createUser: createUserController,
    loginForm,
    login : loginController,
    logout : logoutController,
    createTweet : tweetController
  };

}