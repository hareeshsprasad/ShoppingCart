import { Product } from "./products.model";
import { Op } from "sequelize";
const Config = require("config");

// API for adding the products //
export const save = async (req, res) => {
  try {
    const { ID, Name, Price,Quantity } = req.body;
    const product: any = await Product.findOne({
      attributes: ["ID", "Name"],
      where: {
        Name: Name,
      },
    });
    if (product) {
      if (!ID || product.ID != ID) {
        throw new Error("This product already exists");
      }
    }
    if (!ID) {
      await Product.create({
        Name: Name,
        Price: Price,
        Quantity: Quantity
      });
      return res.status(200).json({
        success: true,
        message: "Product Added Successfully",
      });
    } else {
      await Product.update(
        {
          Name: Name,
          Price: Price,
        Quantity: Quantity
        },
        {
          where: {
            ID: ID,
          },
        }
      );
      return res.status(200).json({
        success: true,
        message: "Product Updated Successfully",
      });
    }
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};



// API for listing all the availabe products //

export const listProducts =async (req,res) => {
    try {
    const SearchTerm = req.query.SearchTerm ? req.query.SearchTerm : "";
    let page = req.query.page ? parseInt(req.query.page) : 1;
    let row = req.query.row ? parseInt(req.query.row) : 100;
    let offset = (page - 1) * row;
    let productList: any = await Product.findAndCountAll({
      attributes: ["ID", "Name", "Price","Quantity"],
      where: {
        Name: { [Op.like]: `%${SearchTerm}%` },
        Quantity:{ [Op.ne] : 0}
      },
      order: [["Name", "ASC"]],
      limit: row,
      offset: offset,
    });
    return res.status(200).json({
        success: true,
        message: "Product listed successfully",
        data: productList,
    });
    } catch (error) {
        return res.status(200).json({
            success: false,
            message: error.message,
        });
    }
}