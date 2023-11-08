import { Product } from "../products/products.model"
import { Cart } from "./cart.model";
import { Op } from "sequelize";
const Config = require("config");

// API for adding products to cart //
export const addToCart = async (req, res) => {
    const cartItems = req.body.cartItems;
    const sessionId = req.sessionID;
    const userID = sessionId;
    try {
        const promises = cartItems.map(async (cartItem) => {
            const { productID, quantity } = cartItem;
            const product: any = await Product.findOne({
                attributes: ["ID", "Name", "Price", "Quantity"],
                where: {
                    ID: productID
                }
            });
            if (!product) {
                return res.status(404).json({ error: `Product  not found` });
            }

            if (quantity > product.Quantity) {
                    throw new Error(`Requested quantity for product ${product.Name} exceeds available stock`)
            } else {
                let userCartItem: any = await Cart.findOne({
                    where: { ProductID: productID, UserID: userID },
                });

                if (!userCartItem) {
                    userCartItem = await Cart.create({
                        ProductID: productID,
                        UserID: userID,
                        Quantity: quantity,
                    });
                } else {
                    userCartItem.Quantity += quantity;
                    await userCartItem.save();
                }
                product.Quantity -= quantity;
                await product.save();
            }
        });
        await Promise.all(promises);
        res.status(200).json({ message: "Products added to the cart successfully" });
    } catch (error) {
        return res.status(200).json({
            success: false,
            message: error.message,
        });
    }
}

// API for viewing cart //

export const viewCart =async (req,res) => {
    try {
        let UserID = req.query.UserID ? req.query.UserID :"";
        let cartItems = [];
        await Cart.findAll({
            attributes: ["ID","ProductID","Quantity"],
            where:{
                UserID : UserID
            }
        }).then(async(items:any) =>{
            for (let item of items ) {
                let product:any = await Product.findOne({
                    attributes:["ID","Name","Price"],
                    where:{
                        ID : item.dataValues.ProductID
                    }
                })
              item.dataValues.ProductName = product.Name;
              item.dataValues.Price = item.dataValues.Quantity * product.Price;
              cartItems.push(item);
            }
        })
        return res.status(200).json({
            success: true,
            message: "Cart Listed Successfully",
            data :cartItems
        });
    } catch (error) {
        return res.status(200).json({
            success: false,
            message: error.message,
        });
    }

}

// API to remove an item from the cart //

export const removeItem = async (req,res) =>{
    try {
        let ID = req.query.ID ? req.query.ID : "";
        if(!ID) {
            throw new Error("Please select the item to remove");
        }
        let cartDetails:any = await Cart.findOne({
            attributes:["ID","ProductID","Quantity"],
            where:{
                ID :ID
            }
        })
        if(!cartDetails) {
            throw new Error("Cart item not found")
        }
        let product:any = await Product.findOne({
            attributes: ["ID", "Quantity"],
            where: {
              ID: cartDetails.ProductID,
            },
        });
        if(!product) {
            throw new Error("product not found");
        }
        product.Quantity += cartDetails.Quantity;
        await product.save();
        await Cart.destroy({
            where: {
              ID: ID,
            },
          });
          return res.status(200).json({
            success: true,
            message: "Item Removed Successfully"
        });
    } catch (error) {
        return res.status(200).json({
            success: false,
            message: error.message,
        });
    }
}

// API to calculate total price//

export const total = async (req, res) => {
    try {
      let UserID = req.query.UserID ? req.query.UserID : "";
      let cartItems = await Cart.findAll({
        attributes: ["ID", "ProductID", "Quantity"],
        where: {
          UserID: UserID,
        },
      });
  
      let total = 0;
  
      for (let item of cartItems) {
        let product:any = await Product.findOne({
          attributes: ["ID", "Name", "Price"],
          where: {
            ID: item.dataValues.ProductID,
          },
        });
  
        if (!product) {
          throw new Error(`Product with ID ${item.dataValues.ProductID} not found`);
        }
  
        item.dataValues.Price = item.dataValues.Quantity * product.Price;
        total += item.dataValues.Price;
      }
  
      return res.status(200).json({
        success: true,
        message: "Total calculated successfully",
        data: {
          total: total,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  