class CreateUserDto {
    constructor(name, email, hashedPassword) {
        this.name = name;
        this.email = email;
        this.hashedPassword = hashedPassword;
    }
}

module.exports = CreateUserDto;