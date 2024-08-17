const request = require('supertest');
var chai = require('chai');
chai.use(require('chai-json-schema'));
const fs = require('fs')


const assert = chai.assert
const should = chai.should
const expect = chai.expect

describe('API Test for "reqres.in"', () => {
    const BASE_URL = "https://reqres.in/api/";

    it('Test - GET Single User', async () => {
        const response = await request(BASE_URL)
            .get("users/2");
      
    console.log('Status Code:', response.statusCode);
    
        // assertion
        assert.equal(response.body.data.first_name, "Janet")
        assert.equal(response.body.data.last_name, "Weaver")

        should(response.statusCode === 200)

        const schemaPath = "resources/jsonSchema/get-user.json"
        const jsonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))
        assert.jsonSchema(response.body, jsonSchema);
    });

    it('Test - POST Create', async () => {
        const body = {
            "name": "morpheus",
            "job": "leader"
        }
        
        const response = await request(BASE_URL)
        .post("users")
        .send(body)


        console.log(response.statusCode);
        console.log(response.body)

        // assertion
        should(response.statusCode === 201)

        const schemaPath = "resources/jsonSchema/post-user.json"
        const jsonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))
        assert.jsonSchema(response.body, jsonSchema)
        
    });


    it('Test - PUT Update ', async () => {
        const body = {
            "name": "morpheus",
            "job": "zion resident"
        }
         const response = await request(BASE_URL)
         .put("users/2")
         .send(body)

         console.log(response.statusCode);
         console.log(response.body)
 
         // assertion
         should(response.statusCode === 200)
 
         const schemaPath = "resources/jsonSchema/put-user.json"
         const jsonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))
         assert.jsonSchema(response.body, jsonSchema)
    });

    it('Test - DELETE User', async () => {
        const response = await request(BASE_URL)
        .delete("users/1") 
    
        console.log(response.statusCode);
           
        // assertion
        should(response.statusCode === 204)
    
        const schemaPath = "resources/jsonSchema/delete-user.json"
        const jsonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))
        assert.jsonSchema(response.body, jsonSchema)
    });
    
});