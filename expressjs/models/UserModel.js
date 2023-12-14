import dbConfig from "../config/dbConfig.js"
import { Model } from "objection"
import moment from 'moment';
Model.knex(dbConfig)

export default class UserModel extends Model {
    static get tableName() {
      return 'user';
    }
    static get idColumn() {
        return 'id_user';
    }
    $beforeInsert(context) {
      this.created_at = moment().format( "YYYY-MM-DD HH:mm:ss");
      this.updated_at = moment().format( "YYYY-MM-DD HH:mm:ss");
      
    }
    $beforeUpdate() {
        this.updated_at = moment().format( "YYYY-MM-DD HH:mm:ss");
    }
  }
  export const userModelId = "user"
  export const userModelTable = "user"
