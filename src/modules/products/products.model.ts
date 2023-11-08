import * as Sequelize from "sequelize";
import sequelize from "../../orm";

export const Product = sequelize.define(
  "Product",
  {
    ID: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    Name: Sequelize.STRING,
    Price: Sequelize.STRING,
    Quantity: Sequelize.INTEGER
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);