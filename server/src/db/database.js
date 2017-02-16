import config from "../../../knexfile";
import Knex from "knex";
import Bookshelf from "bookshelf";

const knex = Knex(process.env.NODE_ENV ? config[process.env.NODE_ENV] : config.development);
const bookshelf = Bookshelf(knex);

export default bookshelf;