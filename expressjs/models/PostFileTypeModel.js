import dbConfig from "../config/dbConfig.js"
import { Model } from "objection"
Model.knex(dbConfig)

export default class PostFileTypeModel extends Model {
    static get tableName() {
      return 'post_file_type';
    }
    static get idColumn() {
        return 'id_post_file_type';
    }
  }

