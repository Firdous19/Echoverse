import conf from "../configurations/Config";
import { Client, Databases, Query } from "appwrite";

class AppwritePost {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
  }

  async createPost(slug, { title, content, featuredImage, status, userId }) {
    try {
      const post = await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
      return post;
    } catch (error) {
      console.error("Appwrite :: Post Creation Failed", error);
    }
  }

  async getPost(slug) {
    try {
      const post = await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );

      return post;
    } catch (error) {
      console.error("Appwrite :: Post Fetch Failed", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status, userId }) {
    try {
      const post = await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug, //document id
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
      return post;
    } catch (error) {
      console.error("Appwrite :: Post Update Failed", error);
    }
  }

  async deletePost(slug) {
    try {
      const response = await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return response;
    } catch (error) {
      console.error("Appwrite :: Post Deletion Failed", error);
    }
  }

  async getPosts(userId) {
    try {
      const posts = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        // queries
        // [Query.equal("userId", userId)]
      );

      return posts;
    } catch (error) {
      console.log("Appwrite :: Post Fetch Failed", error);
    }
  }
}

const appwritePost = new AppwritePost();

export default appwritePost;
