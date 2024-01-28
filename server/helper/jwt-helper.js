import jwt from 'jsonwebtoken';
import { AppError } from '../errors/AppError';

const privateKey = process.env.JWT_PRIVATE_KEY;
const publicKey = process.env.JWT_PUBLIC_KEY;

export const  createToken = (payload)=>{
    /*
   sOptions = {
    issuer: "Authorization/Resource/This server",
    subject: "iam@user.me", 
    audience: "Client_Identity" // this should be provided by client
   }
  */
  // Token signing options
//   const signOptions = {
//     issuer:  $Options.issuer,
//     subject:  $Options.subject,
//     audience:  $Options.audience,
//     expiresIn:  "30d",    // 30 days validity
//     algorithm:  "RS256"    
// };

    return jwt.sign(payload, privateKey);
}

export const verifyToken = (token) =>{
    /*
   vOption = {
    issuer: "Authorization/Resource/This server",
    subject: "iam@user.me", 
    audience: "Client_Identity" // this should be provided by client
   }  
  */
//   var verifyOptions = {
//     issuer:  $Option.issuer,
//     subject:  $Option.subject,
//     audience:  $Option.audience,
//     expiresIn:  "30d",
//     algorithm:  ["RS256"]
// };

   const verify  =  jwt.verify(token, publicKey);

   if(!verify){
    throw new AppError(500, true, 'Invalid token');
   }

   return true;

}

export const decodeToken = (token)=>{
    return jwt.decode(token, {complete: true});
}