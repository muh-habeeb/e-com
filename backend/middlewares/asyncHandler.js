const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    res
      .status(500)
      .json({
        msg: "from handler something with the req not good",
        message: error.message,
      });
  });
};

export default asyncHandler;
