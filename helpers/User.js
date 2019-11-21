'use strict';
module.exports=function(){
    return{
        SignUpValidation:(req,res,next)=>{
            req.checkbody('username','username is Required').notEmpty();
            req.checkbody('username','username must not be less than 5').isLength({min:5});
            req.checkbody('email','email is required').notEmpty();
            req.checkbody('email','email is invalad').isEmail();
            req.checkbody('password','password must not be less than 5').isLength({min:5});

            req.getValidationResult()

            .then((result)=>{
                const errors=result.array();
                const messages=[];
                errors.forEach((errors)=>{
                    messages.push(errors.msg);

                });
                req.flash('error',messages);
                res.redirect('/signup');
            })
            .catch((err)=>{
                return next()
            })
        }
    }
}