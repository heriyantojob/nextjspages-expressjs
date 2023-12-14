import dbConfig from "../config/dbConfig.js"
import { Model } from "objection"
Model.knex(dbConfig)

export default class PostModel extends Model {
    static get tableName() {
      return 'post';
    }
    static get idColumn() {
        return 'post_id';
    }
  }

