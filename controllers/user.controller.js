import User from "../models/user.models.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      data: {
        users,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    // if user not exist
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    if (req.params.id !== req.user._id.toString()) {
      const error = new Error("you can't update other user");
      error.statusCode = 401;
      throw error;
    }

    const { name, email, password } = req.body;

    const filter = { _id: req.user._id };
    const update = { $set: { name, email, password } };

    await User.updateOne(filter, update);

    res.status(200).json({
      success: true,
      message: "user updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    if (req.params.id !== req.user._id.toString()) {
      const error = new Error("you can't delete other user");
      error.statusCode = 401;
      throw error;
    }

    const filter = { _id: req.user._id };

    const deletedUser = await User.deleteOne( filter );

    if (!deletedUser.deletedCount) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
