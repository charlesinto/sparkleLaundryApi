import Helper from '../Helper';
import bcrypt from 'bcrypt';
import { TEST_ENV } from '../Controller'
export const loginUser = (req,res) => {
    logUserIn(req,res)
}

const logUserIn = (req,res) => {
    let request = Helper.trimWhiteSpace(req.body); 
    if(!Helper.validateKey(request, ['email','password'])){
        return Helper.displayMessage(res,400,'Bad Request,one or more keys is missing')
    }
    if(Helper.validateInput(res,request)){
        let sql = 'SELECT * FROM BASE_USER WHERE email = $1';
        Helper.executeQuery(sql,[request.email])
        .then((result)=>{
            if(result.rowCount > 0){
                if(bcrypt.compareSync(request.password,result.rows[0].password)){
                    Helper.assignToken({userid:result.rows[0].userid,firstname:result.rows[0].firstname,lastname:result.rows[0].lastname,roleid:result.rows[0].roleid,rolename:result.rolename,email:result.rows[0].email})
                    .then((token)=>{
                            outputMessage(res,result,token) 
                    })
                    .catch((err)=>{
                        Helper.displayMessage(res,403,'couldnt perform authentication',err)
                        
                    })
                }else{
                    Helper.displayMessage(res,404,'Wrong email or password')
                }
            }else{
                Helper.displayMessage(res,404,'Wrong email or password')
            }
        })
        .catch((err)=>{
            Helper.displayMessage(res,503,'Server error or service unavailabe',err)
        });
    }
}


const outputMessage = (res,result,token) => {
    res.statusCode = 200;
    res.setHeader('content-type', 'application/json');
    return res.json({
        email:`${result.rows[0].email}`,
        token,
        roleid: `${result.rows[0].roleid}`,
        rolename: `${result.rows[0].rolename}`,
        userid: `${result.rows[0].userid}`,
        fullname:`${result.rows[0].firstname} ${result.rows[0].lastname}`
    }) 
}