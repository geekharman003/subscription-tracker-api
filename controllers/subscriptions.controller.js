import Subscription from "../models/subscription.models.js";

export const getAllSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find();

    res.status(200).json({
      success: true,
      data: subscriptions,
    });
  } catch (error) {
    next(error);
  }
};

export const getSubscription = async (req, res, next) => {
  try {
    const { id } = req.params;

    const subscription = await Subscription.findById(id);

    if (!subscription) {
      const error = new Error("subscription not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: {
        subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createSubscription = async (req, res, next) => {
  try {
    const {
      name,
      price,
      currency,
      frequency,
      category,
      paymentMethod,
      status,
      startDate,
      renewDate,
    } = req.body;

    if (
      !name ||
      !price ||
      !frequency ||
      !category ||
      !paymentMethod ||
      !startDate
    ) {
      const error = new Error(
        "name,price,frequency,category,paymentMethod and startDate fields are required"
      );
      error.statusCode = 400;
      throw error;
    }

    const subscription = await Subscription.create({
      name,
      price,
      currency,
      frequency,
      category,
      paymentMethod,
      status,
      startDate,
      renewDate,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Subscription created successfully",
      data: {
        subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateSubscription = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      price,
      currency,
      frequency,
      category,
      paymentMethod,
      status,
      startDate,
      renewDate,
    } = req.body;

    if (
      !name ||
      !price ||
      !frequency ||
      !category ||
      !paymentMethod ||
      !startDate
    ) {
      const error = new Error(
        "name,price,frequency,category,paymentMethod and startDate fields are required"
      );
      error.statusCode = 400;
      throw error;
    }

    const filter = { _id: id };
    const update = {
      $set: {
        name,
        price,
        currency,
        frequency,
        category,
        paymentMethod,
        status,
        startDate,
        renewDate,
        user: req.user._id,
      },
    };

    const subsciption = await Subscription.updateOne(filter, update);

    if (!subsciption.modifiedCount) {
      const error = new Error("Subscription not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Subscription updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSubscription = async (req, res, next) => {
  try {
    const { id } = req.params;
    const filter = { _id: id };

    const subscription = await Subscription.deleteOne(filter);

    if (!subscription.deletedCount) {
      const error = new Error("Subscription not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Subscription deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getUserSubscriptions = async (req, res, next) => {
  try {
    if (req.params.id !== req.user._id.toString()) {
      const error = new Error(
        "you are trying to view subscriptions of other user"
      );
      error.statusCode = 400;
      throw error;
    }
    const filter = { user: req.user._id };

    const subscriptions = await Subscription.find(filter);
    console.log(subscriptions);

    if (!subscriptions.length) {
      return res.status(404).json({
        success: false,
        message: "no subscription found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        subscriptions,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const cancelSubscription = async (req, res, next) => {
  try {
    const { id } = req.params;
    const filter = { _id: id };

    const subscription = await Subscription.findOne(filter);

    if (!subscription) {
      const error = new Error("Subscription not found");
      error.statusCode = 404;
      throw error;
    }

    subscription.status = "Cancelled";
    await subscription.save();

    res.status(200).json({
      success: true,
      message: "Subscription cancelled successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getRenewalsSubscriptions = async (req, res, next) => {
  try {
    console.log("hello")
    const filter = { status: "Expired" };
    const expiredSubscriptions = await Subscription.find(filter);

    console.log(expiredSubscriptions);

    if (!expiredSubscriptions.length) {
      return res.status(404).json({
        success: false,
        message: "no subscription is available for renew",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        expiredSubscriptions,
      },
    });
  } catch (error) {
    next(error);
  }
};
