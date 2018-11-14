// import Helper from '../Helper';
// import bcrypt from 'bcrypt';
// import fs from 'fs';
// import { TEST_ENV } from '../Controller'

// //SELECT * FROM BASE_ITEM WHERE category = $1
// export const fetchImage = (req,res) => {
//     console.log('id', req.params.id)
//     const imageid = parseInt(req.params.id);
//     Helper.executeQuery('SELECT * FROM BASE_ITEM WHERE itemid = $1', [imageid])
//     .then(result => {
        
//         if(result.rowCount > 0){
            
//             const imagepath = result.rows[0].imagepath;
//             console.log('image path', imagepath);
//         }else{
//             res.statusCode = 404;
//             res.setHeader('content-type', 'application/json');
//             res.json({
//                 message: `file not found`
//             })
//         }
//     })
//     .catch(err => {
//         res.statusCode = 500;
//         res.setHeader('content-type', 'application/json');
//         res.json({
//             message: `server error`,
//             err
//         })
//     })
// }