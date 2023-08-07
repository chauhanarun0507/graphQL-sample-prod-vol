const queries = {
    apiQuries: {
        products: 'Select * from products',
        product: 'Select * from products where id=?',
        categories: 'Select * from categories',
        category: 'Select * from categories where id=?',
        categoryByName: 'Select * from categories Where name =?',
        addCategory: 'INSERT INTO categories (name) VALUES(?)',
        productByName: 'Select * from products Where name =?',
        addProduct: 'INSERT INTO products (name, description, quantity, price, onSale, categoryId) VALUES(?, ?,?,?,?,?)',
        deleteCategoryById: 'Delete from categories where id = ?',
        deleteProductsByCategoryById: 'Delete from products where categoryId = ?',
        deleteProductById: 'Delete from products where id = ?',
        updateCategoryById: 'Update categories SET name= ? where id = ?',
        updateProductById: 'Update products SET name = ?, description = ?, onSale = ?, price = ?, quantity = ? where id = ?',

        prodVolByPlantAndDateFilter: 'Select id, plant, unit, event_id, event_desc, date, plant_load, mdr, production_volume from production_volume_data Where plant = ? and (date BETWEEN ? AND ?)',
        prodVolByPlantFilter: 'Select id, plant, unit, event_id, event_desc, date, plant_load, mdr, production_volume from production_volume_data Where plant = ?',
        prodVolByDateFilter: 'Select id, plant, unit, event_id, event_desc, date, plant_load, mdr, production_volume from production_volume_data Where (date BETWEEN ? AND ?)',
        prodVolume: 'Select id, plant, unit, event_id, event_desc, date, plant_load, mdr, production_volume from production_volume_data',
        prodVolByPlantUnitAndDateUsingGroupByUnit: 'Select plant, unit, count(unit) As unitCount ,SUM(mdr) As mdrCount, SUM(production_volume) As prodVolCount from production_volume_data Where plant= ? and unit= ? and (date BETWEEN ? AND ?) Group By plant, unit',
        prodVolByPlantUnitUsingGroupByUnit: 'Select plant, unit, count(unit) As unitCount ,SUM(mdr) As mdrCount, SUM(production_volume) As prodVolCount from production_volume_data Where plant= ? and unit= ? Group By plant, unit',
        prodVolByPlantUsingGroupByUnit: 'Select plant, unit, count(unit) As unitCount ,SUM(mdr) As mdrCount, SUM(production_volume) As prodVolCount from production_volume_data Where plant= ? Group By plant, unit',
        prodVolByUnitUsingGroupByUnit: 'Select plant, unit, count(unit) As unitCount ,SUM(mdr) As mdrCount, SUM(production_volume) As prodVolCount from production_volume_data Where unit= ? Group By plant, unit',
        prodVolByDateUsingGroupByUnit: 'Select plant, unit, count(unit) As unitCount ,SUM(mdr) As mdrCount, SUM(production_volume) As prodVolCount from production_volume_data Where (date BETWEEN ? AND ?) Group By plant, unit',
        prodVolUsingGroupByUnit: 'Select plant, unit, count(unit) As unitCount ,SUM(mdr) As mdrCount, SUM(production_volume) As prodVolCount from production_volume_data Group By plant, unit',
    }
}

module.exports = queries;