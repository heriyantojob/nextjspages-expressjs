import dbConfig from "../config/dbConfig.js"
import { Model } from "objection"
Model.knex(dbConfig)

export default class PostCategoriesModel extends Model {
    static get tableName() {
      return 'post';
    }
    static get idColumn() {
        return 'idPost';
    }
  }

