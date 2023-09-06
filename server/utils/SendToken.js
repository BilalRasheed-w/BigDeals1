const sendToken = (user, status, res) => {
  const token = user.getJwtToken();
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
  };
  res.cookie("token", token, cookieOptions);
  res.status(status).json({ success: true });
};

export { sendToken };
