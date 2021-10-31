var db=require('../config/connection')
var collection=require('../config/collection')
var objectId=require('mongodb').ObjectId
module.exports={


    addproduct:(product,callback)=>{
        
         
        db.get().collection('product').insertOne(product).then((data)=>{
            
            callback(data.ops[0]._id)

        })
    },
    
    getAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let products=await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
    },
    deleteproduct:(proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).removeOne({_id:objectId(proId)}).then((response)=>{
               // console.log(response);
                resolve(response)
            })
        })
    },
    getProductDetails:(proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:objectId(proId)}).then((product)=>{
                resolve(product)
            })
        })
    },updateProduct:(proId,proDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION)
            .updateOne({_id:objectId(proId)},{
               $set:{
                   name:proDetails.name,
                   Description:proDetails.Description,
                   price:proDetails.price,
                   Category:proDetails.Category
               } 
            }).then((response)=>{
                resolve()
            })
        })
    }

}   