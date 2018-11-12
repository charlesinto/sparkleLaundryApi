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

})
