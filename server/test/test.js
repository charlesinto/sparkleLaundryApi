import app from '../index'
import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import path from 'path';
import Helper from '../Helper';
const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

const createuser = {
	"firstname": "charles",
	"lastname": "onuorah",
	"phonenumber": "08163113450",
	"password": "july3450",
	"email": "charles.onuorah@yahoo.com"
}

const dummyUser = {
    password: "$2b$10$UMlCXXsfIhCfyedFpZqk8uXbH2anwFPVqVmGeIqnXQauirv9dnGa2",
    email: "charles.onuorah@yahoo.com",
    phonenumber: "08163113450",
    firstname:"charles",
    lastname: "onuorah"
}

const user = {
    password: "july3450",
    email: "charles.onuorah@yahoo.com",
}

describe('Test all api end points', function(){
    
    describe('it should sign up a user',() => {
        beforeEach(done => {
            let sql = 'CREATE TABLE IF NOT EXISTS BASE_USER(userid SERIAL, firstname varchar(50), lastname varchar(50),email varchar(100),password varchar(100), phonenumber varchar(50), roleid int, rolename varchar(50), datecreated timestamp);'
            Helper.executeQuery(sql)
            .then((result)=> done())
            .catch((err) => done());
        })
        afterEach( done => {
            let sql = 'DROP TABLE IF EXISTS BASE_USER CASCADE;'
            Helper.executeQuery(sql)
            .then((result)=> done())
            .catch((err) => done());
        })
        this.timeout(40000);
        it('response should be an object', function(done){
            chai.request(app).post('/api/v1/auth/signup').type('form').send(createuser).end(function(err,res){
                expect(res).to.be.an('object');
                done();
            })
        })
        it('response to have property fullname', function(done){
            chai.request(app).post('/api/v1/auth/signup').type('form').send(createuser).end(function(err,res){
                expect(res.body).to.have.property('fullname');
                done();
            })
        })
        
        it('response should have a status of 201',(done)=>{
            chai.request(app).post('/api/v1/auth/signup').type('form').send(createuser).end(function(err,res){
                expect(res).to.have.status(201);
                done();
            })
        })
        it('response to have property token', function(done){
            chai.request(app).post('/api/v1/auth/signup').type('form').send(createuser).end(function(err,res){
                expect(res.body).to.have.property('token');
                done();
            })
        })
        it('response to have property roleid', function(done){
            chai.request(app).post('/api/v1/auth/signup').type('form').send(createuser).end(function(err,res){
                expect(res.body).to.have.property('roleid');
                done();
            })
        })
        it('response to have property rolename', function(done){
            chai.request(app).post('/api/v1/auth/signup').type('form').send(createuser).end(function(err,res){
                expect(res.body).to.have.property('rolename');
                done();
            })
        })
        it('response to have property useremail', function(done){
            chai.request(app).post('/api/v1/auth/signup').type('form').send(createuser).end(function(err,res){
                expect(res.body).to.have.property('useremail');
                done();
            })
        })
    })
    describe('It should login a new user', function(){
        beforeEach( done => {
            let sql = 'CREATE TABLE IF NOT EXISTS BASE_USER(userid SERIAL, firstname varchar(50), lastname varchar(50),email varchar(100),password varchar(100), phonenumber varchar(50), roleid int, rolename varchar(50), datecreated timestamp);'
            Helper.executeQuery(sql)
            .then((result)=> {
                let sql = 'INSERT INTO BASE_USER(firstname,lastname,email,phonenumber,password,roleid,DATECREATED,rolename) values($1,$2,$3,$4,$5,$6,$7,$8)'
                Helper.executeQuery(sql,[dummyUser.firstname,dummyUser.lastname,dummyUser.email,dummyUser.phonenumber,dummyUser.password,2,'NOW()','USER'])
                .then(() => done())
                .catch(() => done());
            })
            .catch((err) => done());
            
        })
        afterEach(done => {
            let sql = 'DROP TABLE IF EXISTS BASE_USER CASCADE;'
            Helper.executeQuery(sql)
            .then((result)=> done())
            .catch((err) => done());
        })
        this.timeout(20000);
        it('response should have a status of 200',(done)=>{
            chai.request(app).post('/api/v1/auth/login').type('form').send(user).end(function(err,res){
                expect(res).to.have.status(200);
                done();
            })
        })
        it('response should be an object', function(done){
            chai.request(app).post('/api/v1/auth/login').type('form').send(user).end(function(err,res){
                expect(res).to.be.an('object');
                done();
            })
        })
        it('response.text to be a string', function(done){
            chai.request(app).post('/api/v1/auth/login').type('form').send(user).end(function(err,res){
                expect(res.text).to.be.string
                done();
            })
        })
        it('response to have property email', function(done){
            chai.request(app).post('/api/v1/auth/login').type('form').send(user).end(function(err,res){
                expect(res.body).to.have.property('email');
                done();
            })
        })
        it('response message to be string', function(done){
            chai.request(app).post('/api/v1/auth/login').type('form').send(user).end(function(err,res){
                expect(res.body.message).to.be.string;
                done();
            })
        })
        it('response to have property token', function(done){
            chai.request(app).post('/api/v1/auth/login').type('form').send(user).end(function(err,res){
                expect(res.body).to.have.property('token');
                done();
            })
        })
        it('response to have property roleid', function(done){
            chai.request(app).post('/api/v1/auth/login').type('form').send(user).end(function(err,res){
                expect(res.body).to.have.property('roleid');
                done();
            })
        })
        it('response to have property fullname', function(done){
            chai.request(app).post('/api/v1/auth/login').type('form').send(user).end(function(err,res){
                expect(res.body).to.have.property('fullname');
                done();
            })
        })
        it('response user to be a string', function(done){
            chai.request(app).post('/api/v1/auth/login').type('form').send(user).end(function(err,res){
                expect(res.body.user).to.be.string;
                done();
            })
        })
        it('response to have property message', function(done){
            chai.request(app).post('/api/v1/auth/login').type('form').send(user).end(function(err,res){
                expect(res.body).to.have.property('rolename');
                done();
            })
        })
    })
    describe('it should get laundry items',() => {
        this.timeout(40000);
        it('res should be an object', function(done){
            chai.request(app).get('/api/v1/getLuandryItems').type('form').end(function(err,res){
                expect(res).to.be.an('object');
                done();
            })
        })
        it('response.body to have property men category', function(done){
            chai.request(app).get('/api/v1/getLuandryItems').type('form').end(function(err,res){
                expect(res.body).to.have.property('menCategory');
                done();
            })
        })
        it('response.body to have property women cildren', function(done){
            chai.request(app).get('/api/v1/getLuandryItems').type('form').end(function(err,res){
                expect(res.body).to.have.property('womenCategory');
                done();
            })
        })
        it('response.body to have property children category', function(done){
            chai.request(app).get('/api/v1/getLuandryItems').type('form').end(function(err,res){
                expect(res.body).to.have.property('childrenCategory');
                done();
            })
        })
        it('response.body to have property otherCategory', function(done){
            chai.request(app).get('/api/v1/getLuandryItems').type('form').end(function(err,res){
                expect(res.body).to.have.property('otherCategory');
                done();
            })
        })
        it('response should have  status of 200',(done)=>{
            chai.request(app).get('/api/v1/getLuandryItems').type('form').end(function(err,res){
                
                expect(res).to.have.status(200);
                done();
            })
        })
        it('menu should be an array', function(done){
            chai.request(app).get('/api/v1/getLuandryItems').type('form').end(function(err,res){
                expect(res.body.menCategory).to.be.an('array');
                done();
            })
        })
    })
})
