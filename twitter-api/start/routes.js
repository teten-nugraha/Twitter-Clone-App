'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route
  .group(() => {
      
      Route.post('/signup','UserController.signup')
      Route.post('/login','UserController.login')
      
  })
  .prefix('api/v1')

Route
  .group(() => {
    Route.get('/me','UserController.me')
    Route.put('/update_profile','UserController.updateprofile')
    Route.put('/change-password','UserController.changePassword')
    Route.get(':username','UserController.showProfile')
  })
  .prefix('api/v1/account')
  .middleware(['auth:jwt'])

Route
  .group(() => {
    Route.get('/users_to_follow','UserController.usersToFollow')
    Route.post('/follow/:id', 'UserController.follow')
    Route.delete('/unfollow/:id', 'UserController.unfollow')
    Route.get('/timeline', 'UserController.timeline')

  })
  .prefix('api/v1/users')
  .middleware(['auth:jwt'])

Route
  .group(() => {
    
    Route.post('/tweet', 'TweetController.tweet')
    Route.get('/tweets/:id', 'TweetController.show')
    Route.get('/tweets/reply/:id', 'TweetController.reply')
    Route.delete('/tweets/destroy/:id', 'TweetController.destroy')

  })
  .prefix('api/v1')
  .middleware(['auth:jwt'])

Route
  .group(() => {
    
    Route.post('/create', 'FavoriteController.favorite')
    Route.delete('/destroy/:id', 'FavoriteController.unFavorite')

  })
  .prefix('api/v1/favorites')
  .middleware(['auth:jwt'])

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route
  .get('/api/v1/sample','SampleController.profile')
  .middleware(['auth:jwt'])
