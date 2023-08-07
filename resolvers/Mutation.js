const queries = require('../helpers/query');

exports.Mutation = {
    async addCategory(parent, args, { pool }) {
        try {
            let categoryName = args.input.name.toLowerCase();
            let checkCategory = await pool.query(queries.apiQuries.categoryByName, [categoryName]);
            if (checkCategory.length > 0) {
                throw new Error('Category name already exist!');
            }
            let addCategory = await pool.query(queries.apiQuries.addCategory, [categoryName]);
            return {
                id: addCategory.insertId,
                name: categoryName
            }
        } catch (err) {
            console.log(err)
            return err
        }
    },

    async addProduct(parent, args, { pool }) {
        try {
            let productName = args.input.name.toLowerCase();
            let productExist = await pool.query(queries.apiQuries.productByName, [productName]);
           if (productExist.length > 0) {
                throw new Error('product name already exist!')
            }
            let addProduct = await pool.query(queries.apiQuries.addProduct, [productName, args.input.description, args.input.quantity, args.input.price, args.input.onSale, args.input.categoryId]);
            return {
                id: addProduct.insertId,
                name: args.input.name,
                description: args.input.description,
                image: args.input.image,
                quantity: args.input.quantity,
                price: args.input.price,
                onSale: args.input.onSale,
                categoryId: args.input.categoryId
            }
        } catch (err) {
            console.log(err)
            return err
        }
    },

    async deleteCategory(parent, args, { pool }){
        try{
            let categoryID = args.id;
            let checkCategory = await pool.query(queries.apiQuries.category, [categoryID]);
            if(checkCategory.length === 0){
                throw new Error('Category id not exist!')
            }
            await pool.query(queries.apiQuries.deleteCategoryById, [categoryID]);
            await pool.query(queries.apiQuries.deleteProductsByCategoryById, [categoryID]);
            return true;
        } catch (err){
            console.log(err)
            return err
        }
    },

    async deleteProduct(parent, args, { pool }) {
        try{
            let productID = args.id;
            let checkProduct = await pool.query(queries.apiQuries.products, [productID]);
            if(checkProduct.length === 0){
                throw new Error('Product id not exist!')
            }
            await pool.query(queries.apiQuries.deleteProductById, [productID]);
            return true
        } catch (err){
            console.log(err)
            return err
        }
    },


    async updateCategory(parent, args, { pool }) {
        try {
            let categoryID = args.id;
            let categoryName = args.input.name.toLowerCase();
            let checkCategory = await pool.query(queries.apiQuries.category, [categoryID]);
            if (checkCategory.length === 0) {
                throw new Error('Category id not exist!')
            }
            await pool.query(queries.apiQuries.updateCategoryById, [categoryName, categoryID]);
            return {
                id: categoryID,
                name: categoryName
            }
        } catch (err) {
            console.log(err)
            return err
        }
    },

    async updateProduct(parent, args, { pool }) {
        try {
            let productID = args.id;
            let checkProduct = await pool.query(queries.apiQuries.products, [productID]);
            if (checkProduct.length === 0) {
                throw new Error('Product id not exist!')
            }
            let productData = {
                id: productID,
                name: args.input.name ? args.input.name.toLowerCase() : checkProduct[0].name,
                description: args.input.description ? args.input.description : checkProduct[0].description,
                onSale: args.input.onSale ? args.input.onSale : checkProduct[0].onSale,
                price: args.input.price ? args.input.price : checkProduct[0].price,
                quantity: args.input.quantity ? args.input.quantity : checkProduct[0].quantity,
            }

            await pool.query(queries.apiQuries.updateProductById, [productData.name, productData.description, productData.onSale, productData.price, productData.quantity, productID]);
            return productData;
        } catch (err) {
            console.log(err)
            return err
        }
    }

}