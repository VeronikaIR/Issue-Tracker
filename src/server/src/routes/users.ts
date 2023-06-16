import {Request, Response, Router} from 'express';
import {UsersController} from '../controllers/users-controller';

//Define tickets controller
const usersController: UsersController = new UsersController();
const getUsersController = async (request: Request, response: Response, next: () => void) => {
    try {

        console.log('User controller initialization...');
        await usersController.init();
        console.log('Initialized controller');
        next();
    } catch (error) {
        console.error(error);
        response.status(500).json({error: 'Internal server error'});
    }
};

// //Define router for the users request
const usersRouter: Router = Router();
usersRouter.use(getUsersController);


const validateUser = (request, response, next) => {
    const userData = request.body;

    const isUserDataValid = usersController.validateUserData(userData);

    if (isUserDataValid.valid) {
        next();
    } else {
        response.status(400).json(isUserDataValid.message);
    }
}

usersRouter.post('/register', validateUser, async (request, response) => {
    const userData = request.body;

    try {
        const user = await usersController.createNewUser(userData);

        if (user) {
            return response.status(200).json({"id": user.id, "email": user.email});
        } else {
            response.status(400).json('User was not created.');
        }
    } catch (error) {
        response.status(500).json('Internal server error');
    }
});

usersRouter.get('/login', async (request, response) => {
    const email = request.query.email.toString();
    const password = request.query.password.toString();
    try {
        const foundUser = await usersController.checkForValidUser(email, password);
        if (foundUser) {
            return response.status(200).json({"id": foundUser.id});
        } else {
            response.status(400).json("Invalid email or password");
        }
    } catch (error) {
        response.status(500).json('Internal server error');
    }
})

// module.exports = { usersRouter };

export default usersRouter;