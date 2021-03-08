const db = require("../models")
const Constants = require('../config/constant');
const lib = require('../universalFunctions/lib');
class Users{

    // Write your functions here 

   async findUserByContact(countryCode,contactNumber){
        var user =  await db.users.findOne({
            where:{
                countryCode:countryCode,
                contactNumber:contactNumber,
            }
        })
        return user
    }
      async findUserByParentId(parentId){
        var user =  await db.users.findOne({
            where:{
                parentId:parentId
            }
        })
        return user
    }
    async findUserById(id){
        var user =  await db.users.findOne({
            where:{
                id:id
            }
        })
        return user
    }
    async findUserByEmail(email){
        var user =  await db.users.findOne({
            where:{
                email:email
            }
        })
        return user
    }
    
    createSeeder = async(req,h) =>{
        try{
            // put your create Blog Logic here
            const user =  await db.users.findOne({
                where:{
                    email:"admin@admin.com",
                }
            })
           
            if (user==null){
                const seeder = await db.users.create({
                   // email:req.payload.email
                   firstName:"admin",
                   lastName:"admin",
                   email:"admin@admin.com",
                   status:1,
                   password:"admin",
                   roleId:1,
                   
                })
                //
                delete seeder.dataValues.password;
                
                return h.response({
                    data:seeder,
                  
                })
            }
            else
            return "user already exist";
             
            
        }catch(e){
            console.log(e);
            return e;
        }
    }
   



    
    checkUser = async(req,h) =>{
        try{
          
            console.log(req.payload.contactNumber); 
                
            var user =  await db.users.findOne({
                where:{
                    countryCode:req.payload.countryCode,
                    contactNumber:req.payload.contactNumber,
                }
            })
            
                 console.log(user);
                 if(user==null){
                    
                            var data = {};
                            data.contactNumber = req.payload.contactNumber;
                            data.countryCode = req.payload.countryCode;
                     return h.response({
                        data:data,
                        isExist:'false'
                    })
                    }
                 
                 else{
                   
                     return h.response({
                         data:{},
                         isExist:'true'
                     })
                    }
                  // delete seeder.dataValues.password;
                  
              
              
               
              
          }catch(e){
              console.log(e,"error");
              return e;
          }
    }
        
    verifyOtp = async(req,h) =>{
        try{
           if(req.payload.type == 1){

           
            var user = await this.findUserByContact(req.payload.countryCode,req.payload.contactNumber);
         
      if(user != null && user.dataValues.status == 1)
      {
         if(user.dataValues.status == 1) {
           if(req.payload.otp == Constants.otp)
           {
           var token = await lib.signToken(user);
            return h.response({
                data:user,
                 token:token,
                 isExist:true,
                 status:1,

                
            })
           }
             
            else {
                var err={
                    msg:"incorrect otp"
                }
                return h.response({
                    err:err,
                })
            }
           
        }
        if(user.dataValues.status == 0)
        {
             if(req.payload.otp == Constants.otp)
             {
            //  var token = await lib.signToken(user);
              return h.response({
                  data:user,
                //    token:token,
                   isExist:true,
                   status:0,
  
                  
              })
             }
               
              else {
                  var err={
                      msg:"incorrect otp"
                  }
                  return h.response({
                      err:err,
                  })
              }
             
          }
        }
        else {
            if(req.payload.otp == Constants.otp)
            {
                const user = await db.users.create({
                    countryCode:req.payload.countryCode,  
                    contactNumber:req.payload.contactNumber,
                    roleId:3,
					wallet:0,
                    status:0,  
                  })   
            
         
          
         
             return h.response({
                 data:user,
                 isExist:true,
                 status:0
                 
                 
             })
            }
              
            else {
                var err={
                    msg:"incorrect otp"
                }
                return h.response({
                    err:err,
                })
            }
        }
               
    }
    else if(req.payload.type == 2){
        if(req.payload.otp == Constants.otp)
        {
            var user = await this.findUserByParentId(req.payload.id);
            console.log(user,"duplicate user user user user")
            const data= await db.users.update({
                countryCode:user.countryCode,
                contactNumber:user.contactNumber, 
                
            },{
                where:{
                    id:user.parentId
                }
            })
            const deleteduplicate = await db.users.destroy({
                where : {
                    parentId :user.parentId
                }
            })
            return h.response({
                data:data,
            })
        }
          
         else {
             var err={
                 msg:"incorrect otp"
             }
             return h.response({
                 err:err,
             })
         }
    }   
          }
          catch(e){
              console.log(e,"error");
              return e;
          }
    }

    signup = async(req,h)=>{
            try{
                //var user = await this.findUser(req.payload.countryCode,req.payload.contactNumber);
                const data= await db.users.update({
                    firstName:req.payload.firstName, 
                    lastName:req.payload.lastName, 
                    email:req.payload.email, 
                    status:1,
                },{
                    where:{
                        id:req.payload.id
                    }
                })
                var user = await this.findUserById(req.payload.id)
             console.log(user);
             
            
            var token = await lib.signToken(user);
                return h.response({
                    data:user,
                    token:token,
                     isExist:true,
                     status:1
                    
                })  
            
         
            }
            catch(e){
                console.log(e);    
                return e
            }
    }
    updateProfile = async(req,h)=>{

        try{
          // console.log(req.headers.token,"headers")
            // const authToken = req.auth.credentials
            console.log('Sssss',req.auth.credentials)
          //  console.log(user,"useruseruser");
          var user = req.auth.credentials.userData
          console.log("user",user.id);
          if(user!=null){
            const data= await db.users.update({
                firstName:req.payload.firstName, 
                lastName:req.payload.lastName, 
                email:req.payload.email, 
              
            },{
                where:{
                    id:user.id
                }
            })
            // var userData = await this.findUserById(req.payload.id)
            return h.response({
                data:data,
               
                
            })  
          }
            
        }
        catch(e){
                console.log(e,"error")
        }
    }
    updateContactNumber = async(req,h)=>{

        try{
          
            // const authToken = req.auth.credentials
            console.log('Sssss',req.auth.credentials)
        
          var user = req.auth.credentials.userData
          var checkExist = await this.findUserByParentId(user.id);
          console.log(checkExist,"checkexist");
          if(checkExist == null){
            const duplicateUser = await db.users.create({
                countryCode:req.payload.countryCode,
                contactNumber:req.payload.contactNumber,
                parentId:user.id,
               status:0,
                roleId:3
             })
            
             return h.response({
                        data:duplicateUser,
                       
                        
                    })  
          }
         
         else{
            const data= await db.users.update({
                contactNumber:req.payload.contactNumber,
              countryCode:req.payload.countryCode
            },{
                where:{
                    parentId:user.id
                }
            })
            // var userData = await this.findUserById(req.payload.id)
            return h.response({
                data:data,
               
                
            }) 
         }
       
            
        }
        catch(e){
                console.log(e,"error")
        }
    }
    
    deleteUsers = async() =>{
        try{
            // put your delete Users Logic here 
        }catch(e){
            return e;
        }
    }

    updateUsers = async() =>{
        try{
            // put your update Users Logic here 
        }catch(e){
            return e;
        }
    }






// Admin functions
loginAdmin = async(req,h)=>{
    try{
        var user = await this.findUserByEmail(req.payload.email)
        console.log(user.dataValues.password);
        
        if(user!= null){
            if(req.payload.password ==user.dataValues.password){
                delete user.dataValues.password
                var token = await lib.signToken(user);
                return  h.response({
                    data:user, 
                    token:token
                })
            }
            else{
                return  h.response({
                    msg:"invalid password", 
                    //token:token
                })
            }
        }
    }
    catch(e){
            console.log(e);
            return e;
    }
}
getUsersbyAdmin = async(req,h)=>{
    try{
        console.log('Sssss',req.auth.credentials)
        var user =  req.auth.credentials
        console.log(user.userData.roleId)
    if(user.userData.roleId == 1){
        const user =  await db.users.findAll({
            where:{
                roleId:3
            }
        })
        return h.response({
            data:user,
    })
 
    }
    else{
        return h.response({
            err:"only allowed by admin",
    })
 
    }
    }
    catch(e){
return e
    }

}
createUserbyAdmin = async(req,h)=>{
    try{
        console.log('Sssss',req.auth.credentials)
        var user =  req.auth.credentials
        console.log(user.userData.roleId)
    if(user.userData.roleId == 1){
        var data = await this.findUserByContact(req.payload.countryCode,req.payload.contactNumber)
        if(data == null){

        
        const user = await db.users.create({
            firstName:req.payload.firstName,
            lastName:req.payload.lastName,
            email:req.payload.email,
            countryCode:req.payload.countryCode,  
            contactNumber:req.payload.contactNumber,
            roleId:3,
            wallet:0,
            status:1,  
          })   
    
 
  
 delete user.password
     return h.response({
         data:user,
        
         
         
     })
    }
    else{
        return h.response({
            err:"contact already exist",
    })
    }
    } 
    else {
        return h.response({
            err:"only allowed by admin",
    })
 
    }
}
    catch(e){
        console.log(e);    
        return e
    }
}
}
module.exports = new Users()