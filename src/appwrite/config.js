import { Client, Databases, Storage, Query, ID } from "appwrite";
import conf from "../conf/conf";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  //Airdrop services
  async createAirdrop({
    title,
    slug,
    description,
    applyLink,
    endDate,
    startDate,
    status,
    logo,
    banner,
    airdropId,
    isBanner,
    category,
  }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          description,
          applyLink,
          endDate,
          startDate,
          status,
          logo,
          banner,
          airdropId,
          isBanner,
          category,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async updateAirdropStatus(slug, { status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          status,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async updateAirdrop(
    slug,
    {
      title,
      description,
      applyLink,
      endDate,
      startDate,
      status,
      logo,
      banner,
      isBanner,
      category,
    }
  ) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          description,
          applyLink,
          endDate,
          startDate,
          status,
          logo,
          banner,
          isBanner,
          category,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAirdrop(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getAirdrop(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getAirdropByCategory(offset, category) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [
          Query.equal("category", category),
          Query.equal("status", "active"),
          Query.limit(9),
          Query.offset(offset),
        ]
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getBanners() {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [Query.equal("isBanner", "Yes"), Query.equal("status", "active")]
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getAirdrops(offset, status) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [Query.equal("status", status), Query.limit(9), Query.offset(offset)]
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  //category services
  async createCategory({ name, categorySlug }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCategoryCollectionId,
        categorySlug,
        {
          name,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async updateCategory(categorySlug, { name }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCategoryCollectionId,
        categorySlug,
        {
          name,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCategory(categorySlug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCategoryCollectionId,
        categorySlug
      );

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getCategory(categorySlug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCategoryCollectionId,
        categorySlug
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getCategories(queries = [Query.limit(50)]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCategoryCollectionId,
        queries
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);

      return true;
    } catch (error) {
      console.log(error);
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const service = new Service();
export default service;
