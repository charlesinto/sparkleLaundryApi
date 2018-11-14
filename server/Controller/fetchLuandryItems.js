import Helper from '../Helper';
import bcrypt from 'bcrypt';

export const fetchLuandryItems = (req,res) => {
    let menWear = [], womenWears = [], childrenWear = [], others = [];
    Helper.executeQuery('SELECT * FROM BASE_ITEM WHERE category = $1', ['men'])
    .then((result) => {
        menWear = result.rows
        Helper.executeQuery('SELECT * FROM BASE_ITEM WHERE category = $1', ['women'])
        .then((result) => {
            womenWears = result.rows;
            Helper.executeQuery('SELECT * FROM BASE_ITEM WHERE category = $1', ['children'])
            .then((result) => {
                childrenWear = result.rows;
                Helper.executeQuery('SELECT * FROM BASE_ITEM WHERE category = $1', ['other'])
                .then((result) => {
                    others = result.rows;
                    res.statusCode = 200;
                    res.setHeader('content-type', 'application/json');
                    return res.json({
                        menCategory: menWear,
                        womenCategory: womenWears,
                        childrenCategory: childrenWear,
                        otherCategory: others
                    }) 
                })
                .catch(err => {
                    res.statusCode = 403;
                    res.setHeader('content-type', 'application/json')
                    res.json({
                        message: 'could not load data',
                        err
                    })
                })
            })
            .catch(err => {
                res.statusCode = 402;
                res.setHeader('content-type', 'application/json')
                res.json({
                    message: 'could not load data',
                    err
                })
            })
        })
        .catch(err => {
            res.statusCode = 402;
            res.setHeader('content-type', 'application/json')
            res.json({
                message: 'could not load data',
                err
            })
        })
    })
    .catch(err => {
        res.statusCode = 404;
        res.setHeader('content-type', 'application/json')
        res.json({
            message: 'could not load data',
            err
        })
    }) 
}