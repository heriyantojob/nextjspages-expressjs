import dbConfig from "../config/dbConfig.js"
import { Model } from "objection"
import moment from 'moment';
Model.knex(dbConfig)

export default class PostFileModel extends Model {
    static get tableName() {
      return 'post_file';
    }
    static get idColumn() {
        return 'id_post_file';
    }
    $beforeInsert(context) {
      this.created_at = moment().format( "YYYY-MM-DD HH:mm:ss");
      this.updated_at = moment().format( "YYYY-MM-DD HH:mm:ss");
      
    }
    $beforeUpdate() {
        this.updated_at = moment().format( "YYYY-MM-DD HH:mm:ss");
    }
  }

