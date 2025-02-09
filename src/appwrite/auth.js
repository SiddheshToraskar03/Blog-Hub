import conf from "../conf/conf";
import { Client, Account, ID, Databases } from 'appwrite';

export class AuthService {
    client = new Client()
    account
    users

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        // this.client.setEndpoint("https://cloud.appwrite.io/v1").setProject('6606d80d2c53233a670c')
        this.account = new Account(this.client)
        this.users = new Databases(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            console.log({ email, password, name })
            const userAccount = await this.account.create(ID.unique(), email, password, name,);
            if (userAccount) return this.login({ email, password })
            else return userAccount
        } catch (error) {
            throw error
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite :: Get Current User :: Error::", error);
        }
        return null
    }

    async logout() {
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite :: Logout :: Error ::", error);
        }
    }
    async getUserId() {
        const user = await this.getCurrentUser();
        return user ? user.$id : null;
    }
    async getUserName(userId) {
        // console.log(userId);
        const user = await this.users.get('6');
        console.log(user);
        // console.log(user.name);
        return user ? user.name : null;
    }
}

const authService = new AuthService()

export default authService