import conf from "../configurations/Config";
import { Client, Account, ID } from "appwrite";

class Auth {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async signUp({ userName, email, password }) {
    try {
      const user = await this.account.create(
        ID.unique(),
        email,
        password,
        userName
      );
      return user;
    } catch (error) {
      console.log("Appwrite :: Create Account Error", error);
      return error;
    }
  }

  async login({ email, password }) {
    try {
      const session = await this.account.createEmailPasswordSession(
        email,
        password
      );
      return session;
    } catch (error) {
      console.log("Appwrite :: Login Error", error);
    }
    return null;
  }

  async logout() {
    try {
      const deletedSession = await this.account.deleteSession("current");
      return deletedSession;
    } catch (error) {
      console.log("Appwrite :: Logout Error", error);
    }
  }

  async getAccount() {
    try {
      const account = await this.account.get();
      return account;
    } catch (error) {
      console.log("Appwrite :: Get Account Error", error);
    }
  }

  async createEmailVerification(email) {
    try {
      const response = await this.account.createVerification(email);
      return response;
    } catch (error) {
      console.log("Appwrite :: Create Email Verification Error", error);
    }
  }
}

const appwriteAuth = new Auth();

export default appwriteAuth;
