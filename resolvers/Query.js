const moment = require('moment');
const queries = require('../helpers/query');

exports.Query = {
    hello: () => 'world',

    prodVolGroupByUnit: async(parent, args, { pool }) => {
        let data;
        if(args.filter){
            if(args.filter.plant && args.filter.unit && args.filter.startDate && args.filter.endDate){
                let startDate = moment(args.filter.startDate).utc().format('YYYY-MM-DD');
                let endDate = moment(args.filter.endDate).utc().format('YYYY-MM-DD')
                data = await pool.query(queries.apiQuries.prodVolByPlantUnitAndDateUsingGroupByUnit, [args.filter.plant, args.filter.unit, startDate, endDate]);
            } else if(args.filter.plant && args.filter.unit) {
                data = await pool.query(queries.apiQuries.prodVolByPlantUnitUsingGroupByUnit, [args.filter.plant, args.filter.unit]);
            } else if(args.filter.plant) {
                data = await pool.query(queries.apiQuries.prodVolByPlantUsingGroupByUnit, [args.filter.plant]);
            } else if(args.filter.unit) {
                data = await pool.query(queries.apiQuries.prodVolByUnitUsingGroupByUnit, [args.filter.unit]);
            } else if(args.filter.startDate && args.filter.endDate) {
                let startDate = moment(args.filter.startDate).utc().format('YYYY-MM-DD');
                let endDate = moment(args.filter.endDate).utc().format('YYYY-MM-DD')
                data = await pool.query(queries.apiQuries.prodVolByDateUsingGroupByUnit, [startDate, endDate]);
            } else {
                data = await pool.query(queries.apiQuries.prodVolUsingGroupByUnit);
            }
        } else {
            data = await pool.query(queries.apiQuries.prodVolUsingGroupByUnit);
        }
        return data;
    },

    productionVolumeList: async(parent, args, { pool }) => {
        let data;
        if(args.filter){
            if(args.filter.plant && args.filter.startDate && args.filter.endDate){
                let startDate = moment(args.filter.startDate).utc().format('YYYY-MM-DD');
                let endDate = moment(args.filter.endDate).utc().format('YYYY-MM-DD')
                data = await pool.query(queries.apiQuries.prodVolByPlantAndDateFilter, [args.filter.plant, startDate, endDate]);
            }else if(args.filter.plant){
                data = await pool.query(queries.apiQuries.prodVolByPlantFilter, [args.filter.plant]);
            }else if(args.filter.startDate && args.filter.endDate){
                let startDate = moment(args.filter.startDate).utc().format('YYYY-MM-DD');
                let endDate = moment(args.filter.endDate).utc().format('YYYY-MM-DD')
                data = await pool.query(queries.apiQuries.prodVolByDateFilter, [startDate, endDate]);
            } else {
                data = await pool.query(queries.apiQuries.prodVolume);
            }
        } else {
            data = await pool.query(queries.apiQuries.prodVolume);
        }

        let mdrUniqueArray = [...new Set(data.map(item => item.mdr))];

        let calculatedData = {
            uniqueMdr: args.filter.plant ? mdrUniqueArray : [mdrUniqueArray.reduce((a, b) => a + b, 0)],
            plantCount: data.length,
            productionVolCount: parseFloat(data.reduce((n, {production_volume}) => n + production_volume, 0)).toFixed(2),
            mdrCount: parseInt(data.reduce((n, {mdr}) => n + mdr, 0)).toFixed(2),
            plantLoadCount: parseFloat(data.reduce((n, {plant_load}) => n + plant_load, 0)).toFixed(2)
        }
        return {
            calculatedDataVal: [calculatedData],
            productionVolumeData: data
        }
    },

    products: async(parent, args, { pool }) => {
        const data = await pool.query(queries.apiQuries.products);
        return data;    
    },

    product: async(parent, args, { pool }) => {
        const productID = args.id;
        let product = await pool.query(queries.apiQuries.product, [productID]);
        return product[0];
    },

    categories: async(parent, args, { pool }) => {
        const categoriesData = await pool.query(queries.apiQuries.categories);
        return categoriesData;
    },

    category: async(parent, args, { pool }) => {
        const categoryID = args.id;
        let category = await pool.query(queries.apiQuries.category, [categoryID]);
        return category[0];
    }
}