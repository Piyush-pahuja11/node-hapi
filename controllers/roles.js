const db = require("../models");
class Roles{

    // Write your functions here 
    
    createRole = async(req,res) =>{
        try{
          
          console.log(req.payload.name); 
          
                const role = await db.roles.create({
                   name:req.payload.name,  
                })
                
                // delete seeder.dataValues.password;
                return role;
            
            
             
            
        }catch(e){
            console.log(error,"error");
            return e;
        }
    }

    getRoles = async() =>{
        try{
            // put your get Users Logic here 
            const roles =  await db.roles.findAll()
          
            return roles;
        }catch(e){
            console.log(e,"error");
            return e;
        }
    }

    deleteRoles = async() =>{
        try{
            // put your delete Users Logic here 
        }catch(e){
            return e;
        }
    }

    updateRoles = async() =>{
        try{
            // put your update Users Logic here 
        }catch(e){
            return e;
        }
    }


}

module.exports = new Roles()