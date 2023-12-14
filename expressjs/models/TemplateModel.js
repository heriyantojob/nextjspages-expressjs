import dbConfig from "../config/dbConfig.js"
import { Model } from "objection"
Model.knex(dbConfig)
import moment from 'moment';
Model.knex(dbConfig)
export default class PostModel extends Model {
    static get tableName() {
      return 'template';
    }
    static get idColumn() {
        return 'id_template';
    }

    $beforeInsert(context) {
      this.created_at = moment().format( "YYYY-MM-DD HH:mm:ss");
      this.updated_at = moment().format( "YYYY-MM-DD HH:mm:ss");
      
    }
    $beforeUpdate() {
        this.updated_at = moment().format( "YYYY-MM-DD HH:mm:ss");
    }
  }

