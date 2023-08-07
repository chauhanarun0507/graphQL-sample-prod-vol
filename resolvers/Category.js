exports.Category = {
    products: async(parent, args, { pool }) => {
      const categoryId = parent.id;
      let productsData = await pool.query(`Select * from products where categoryId=${categoryId}`);
      return productsData
    }
}