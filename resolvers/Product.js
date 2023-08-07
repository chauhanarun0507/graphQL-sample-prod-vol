exports.Product = {
    category: async(parent, args, { pool }) => {
      const {categoryId} = parent;
      let category = await pool.query(`Select * from categories where id=${categoryId}`);
      return {
        id: category[0].id,
        name: category[0].name,
      };
    }
}