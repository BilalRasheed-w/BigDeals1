const sendToken = (user, status, res) => {
  const token = user.getJwtToken();
  const cookieOptions = {
    httpOnly: true,
    secure:true,
     sameSite: 'None',
     expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
  };
  // res.cookie("token", token, cookieOptions);
  const userData = {
    name: user.name,
    email: user.email,
    id: user._id,
    image: user.image,
    role:user.role
  };
  res.status(status).cookie("token", token, cookieOptions).json({ userData, success: true,token });
};

export { sendToken };
