import bcrypt from 'bcrypt' ;

//  hashpassword
export const hashpassword = async (password)=>{
    const saltRounds = 10;
    const hashedpassword = await bcrypt.hash(password, saltRounds);
    return hashedpassword
}

// comparePassword
export const comparePassword = async (password, hashedpassword)=>{
  const match = await bcrypt.compare(password, hashedpassword);
  return match 
}