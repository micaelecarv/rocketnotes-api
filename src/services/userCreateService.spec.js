const UserCreateService = require("./userCreateService");
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const AppError = require('../utils/AppError')

describe("UserCreateService", () => {
    let userRepositoryInMemory = null;
    let userCreateService = null;

    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        userCreateService = new UserCreateService(userRepositoryInMemory);
    });

    it("user should be create", async () => {
        const user = {
            name: "John Doe",
            email: "user@teste.com",
            password: "123456"
        }

        const userCreated = await userCreateService.execute(user);

        console.log(userCreated);

        expect(userCreated).toHaveProperty("id");
    });

    it("should not be able to create a new user with an email already registered", async () => {
        const user1 = {
            name: "John Doe",
            email: "user@teste.com",
            password: "123456"
        }

        const user2 = {
            name: "Teste 01",
            email: "user@teste.com",
            password: "456"
        }

        await userCreateService.execute(user1);

        console.log(user1);
        console.log(user2);

        expect(async () => {
            await userCreateService.execute(user2);
        }).rejects.toEqual(new AppError('Este email ja esta em uso'));
    });
});