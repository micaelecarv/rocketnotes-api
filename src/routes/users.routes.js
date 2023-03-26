const { Router } = require('express')

const UsersController = require('../controllers/UsersController')

const usersRoutes = Router ();

function MyMiddleware(request, response, next) {
  console.log('Middleware');
  console.log(request.body)

  if(!request.body.isAdmin) {
    return response.json({message: 'Unauthorized'});
  }
  next();
}

const usersController = new UsersController();

usersRoutes.post('/', MyMiddleware, usersController.create);

module.exports = usersRoutes;