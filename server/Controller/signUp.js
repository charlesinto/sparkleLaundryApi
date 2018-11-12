import Helper from '../Helper';
import bcrypt from 'bcrypt';
import fs from 'fs';
import { TEST_ENV } from '../Controller';

export const signUp = (req,res) => {
        signUserUp(req,res);
}

const signUserUp = (req,res) => {
    let request = Helper.trimWhiteSpace(req.body); 
    if(!Helper.validateKey(request, ['firstname','lastname','email','password','phonenumber'])){
      return  Helper.displayMessage(res,400, 'Bad Request,one or more keys is missing');
    }
    if(Helper.validateInput(res,request)){
        let hashpassword = bcrypt.hashSync(request.password,10);
        let sql = 'SELECT * FROM BASE_USER WHERE email = $1';
        Helper.executeQuery(sql,[request.email])
        .then((result)=>{
            if(result.rowCount > 0){
                    Helper.displayMessage(res,406,'User already exists' )   
            }else{
                let sql = 'INSERT INTO BASE_USER(firstname,lastname,email,phonenumber,password,roleid,DATECREATED,rolename) values($1,$2,$3,$4,$5,$6,$7,$8)'
                Helper.executeQuery(sql,[request.firstname,request.lastname,request.email,request.phonenumber,hashpassword,2,'NOW()','USER'])
                .then((result)=>{
                    let sql = 'SELECT * FROM BASE_USER WHERE email = $1'
                        Helper.executeQuery(sql,[request.email])
                        .then((result)=>{
                             Helper.assignToken({userid:result.rows[0].userid,firstname:result.rows[0].firstname,lastname:result.rows[0].lastname,roleid:result.rows[0].roleid,rolename:result.rolename,email:result.rows[0].email})
                            .then((token)=>{
                                    res.statusCode = 201;
                                    res.setHeader('content-type', 'application/json');
                                    res.json({
                                        fullname:`${request.firstname} ${request.lastname}`,
                                        useremail: `${request.email}`,
                                        roleid: `${result.rows[0].roleid}`,
                                        rolename: `${result.rows[0].rolename}`,
                                        token
                                    })
                                
                            })
                            .catch((err)=>{
                                Helper.displayMessage(res, 403, 'couldnt perform authentication',err)
                            })
                        })
                        .catch((err)=>{
                            Helper.displayMessage(res, 501, 'Server errorssss or service unavailabe',err)
                        })
                })
                .catch((err)=>{
                    Helper.displayMessage(res, 503, 'Server error or service unavailabe',err)
                });
            }
        })
        .catch((err)=>{
            Helper.displayMessage(res, 506, 'Server error or service unavailabe',err)
    });
    }
}
