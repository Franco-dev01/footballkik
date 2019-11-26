'use strict';
module.exports=function(){
    return{
        SignUpValidation:(req, res, next)=>{
            
            req.checkBody('username','username is Required').notEmpty();
            req.checkBody('username','username must not be less than 5').isLength({min:5});
            req.checkBody('email','email is required').notEmpty();
            req.checkBody('email','email is invalad').isEmail();
            req.checkBody('password','password must not be less than 5').isLength({min:5});


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
            },

            LoginValidation:(req, res, next)=>{
            
              
                req.checkBody('email','email is required').notEmpty();
                req.checkBody('email','email is invalad').isEmail();
                req.checkBody('password','password must not be less than 5').isLength({min:5});
    
    
                req.getValidationResult()
                    .then((result)=>{
                        const errors=result.array();
                        const messages=[];
                        errors.forEach((errors)=>{
                            messages.push(errors.msg);
    
                        });
                        req.flash('error',messages);
                        res.redirect('/');
                    })
                    .catch((err)=>{
                        return next()
                    })
                }
    }
}