import dbConfig from "../config/dbConfig.js"
import { Model } from "objection"
import UserModel from "./UserModel.js"

export const userSessionModelTable = "user_sessions"

export const userSessionModelId = "idUserSession"
Model.knex(dbConfig)
import moment from 'moment';
export default class UserSessionsModel extends Model {
    static get tableName() {
      return 'user_sessions';
    }
    static get idColumn() {
        return 'id_user_session';
    }
    $beforeInsert(context) {
        this.created_at = moment().format( "YYYY-MM-DD HH:mm:ss");
        this.updated_at = moment().format( "YYYY-MM-DD HH:mm:ss");
        
    }
    $beforeUpdate() {
        this.updated_at = moment().format( "YYYY-MM-DD HH:mm:ss");
    }

    static relationMappings = {
        user: {
          relation: Model.HasOneRelation,
          modelClass: UserModel,
          join: {
            from: 'user_sessions.id_user',
            to: 'user.id_user'
          }
        }
    }
  }