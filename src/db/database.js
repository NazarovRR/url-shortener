import config from "../../knexfile";
import Knex from "knex";
import Bookshelf from "bookshelf";

const knex = Knex(process.env.NODE_ENV === "production" ? config.production : config.development);
const bookshelf = Bookshelf(knex);

export default bookshelf;