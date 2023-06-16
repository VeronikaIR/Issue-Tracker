import {IUser} from "../interfaces/users";
import {UserDto} from '../database/dtos/UserDto';
import {parseUserDtoToIUser} from "../utils/users-utils";

const bcrypt = require('bcrypt');
const CreateUserDto = require('../database/dtos/create/CreateUserDto')
const UserRepository = require('../database/repositories/UserRepository');

export class UsersController {
    private usersCollection: IUser[];

    constructor() {
    }

    public async init() {
        try {
            const users: UserDto[] = await UserRepository.findAllUsers();
            console.log(users);
            this.usersCollection = users.map((user) => {
                console.log("Before: ");
                console.log(user);
                const parsedUser = parseUserDtoToIUser(user);
                console.log("Parsed:");
                console.log(parsedUser);
                return parsedUser;
            });
        } catch (error) {
            console.error(error);
        }
    };

    public async createNewUser(user: IUser): Promise<IUser | undefined> {
        console.log(user);
        const existingUser = this.usersCollection.find((currUser) => user.email === currUser.email);

        if (existingUser) {
            throw new Error("Already existing user!");
        }

        user.password = await bcrypt.hash(user.password, 10);
        const newUser = new CreateUserDto(user.username, user.email, user.password);
        console.log(newUser);
        const createTicket: UserDto = await UserRepository.createUser(newUser);
        console.log("Successfully created user" + createTicket);
        return parseUserDtoToIUser(createTicket);
    };


    public async checkForValidUser(email: string, password: string): Promise<IUser | undefined> {
        const foundUser = this.usersCollection.find((currUser) => email === currUser.email);

        console.log(foundUser);
        console.log(password);
        console.log(foundUser.password);
        if (foundUser) {
            const validPassword = await bcrypt.compare(password, foundUser.password);

            if (validPassword) {
                return foundUser;
            }
        }

        return undefined;
    }

    public validateUserData(userData: IUser) {
        if (userData.username === '' || userData.username.length < 3) {
            return {
                valid: false,
                message: 'Username must be at least 3 characters'
            };
        }

        if (userData.password === '' || userData.password.length < 9) {
            return {
                valid: false,
                message: 'Password must be at least 9 characters'
            };
        }

        // if (userData.password !== userData.confirmPassword) {
        //     return {
        //         valid: false,
        //         message: 'Confirm password must match passsword'
        //     };
        // }

        return {
            valid: true,
            message: 'Correct credentials.'
        };
    }

}
