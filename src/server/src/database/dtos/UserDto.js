class UserDto {
    constructor(id, name, email, hashedPassword) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.hashedPassword = hashedPassword;
    }
}

module.exports = UserDto;