import { Client, Storage, ID } from "appwrite";
import conf from "../configurations/Config";

class AppwriteFileUpload {
  client = new Client();
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.storage = new Storage(this.client);
  }

  async uploadFile(file) {
    try {
      console.log("file", file);
      const response = await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
      return response;
    } catch (error) {
      console.error("File Upload error :: Appwrite ::", error);
    }
  }

  async deleteFile(fileId) {
    try {
      const response = await this.storage.deleteFile(
        conf,
        appwriteBucketId,
        fileId
      );
      return response;
    } catch (error) {
      console.error("File Delete error :: Appwrite ::", error);
    }
  }

  getFile(fileId) {
    try {
      const response = this.storage.getFileView(conf.appwriteBucketId, fileId);
      return response;
    } catch (error) {
      console.error("File View error :: Appwrite ::", error);
    }
  }

  getFilePreview(fileId) {
    try {
      console.log("fileId Appwrite ::", fileId);
      const response = this.storage.getFilePreview(
        conf.appwriteBucketId,
        fileId
      );
      return response;
    } catch (error) {
      console.error("File Preview error :: Appwrite ::", error);
    }
  }
}

const appwriteFileUpload = new AppwriteFileUpload();

export default appwriteFileUpload;
