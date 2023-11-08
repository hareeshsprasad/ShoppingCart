import * as Sequelize from "sequelize";
import sequelize from "../../orm";

export const Cart = sequelize.define(
  "Cart",
  {
    ID: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    UserID: Sequelize.STRING,
    ProductID: Sequelize.INTEGER,
    Quantity:Sequelize.INTEGER
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);