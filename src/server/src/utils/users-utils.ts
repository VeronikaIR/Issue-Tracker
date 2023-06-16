import {IUser} from "../interfaces/users";

export function parseUserDtoToIUser(foundUser): IUser {
    return {
        id: foundUser.id,
        username: foundUser.name,
        email: foundUser.email,
        password: foundUser.hashedPassword
    };
}
