import mongoose from "mongoose";

// defining the schema
const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "subscription name is required"],
      trim: true,
      minLength: 2,
      maxLength: 20,
    },
    price: {
      type: Number,
      required: [true, "subscription price is required"],
      min: [5, "subscription price must be >= 5"],
      max: [10, "subsciption price must be <= 10"],
    },
    currency: {
      type: String,
      enum: ["INR", "USD", "EUR"],
      default: "INR",
    },
    frequency: {
      type: String,
      enum: ["weekly", "monthly", "yearly"],
      required: [true, "subscription frequency is required"],
    },
    category: {
      type: String,
      enum: ["ott", "food ordering", "ecommerce", "parlour", "mall"],
      required: [true, "subscription category is required"],
    },
    paymentMethod: {
      type: String,
      enum: ["UPI", "Credit card", "Debit card", "Net Banking"],
      required: [true, "subscription payment method is required"],
    },
    status: {
      type: String,
      enum: ["Active", "Expired", "Cancelled"],
      default: "Active",
    },
    startDate: {
      type: Date,
      validate: {
        validator: (date) => date <= new Date(),
        message: "start date must be in the past",
      },
    },
    renewDate: {
      type: Date,
      validate: {
        validator: function (date) {
          return date > this.startDate;
        },
        message: "renewDate must be greater than start date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// called before document gets created
subscriptionSchema.pre("save", function (next) {
  // if renewal date is not provided
  if (!this.renewDate) {
    const renewalPeriods = {
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    this.renewDate = new Date(this.startDate);
    this.renewDate.setDate(
      this.renewDate.getDate() + renewalPeriods[this.frequency]
    );
  }

  //   if renewal date is passed
  if (this.renewDate < new Date()) {
    this.status = "Expired";
  }

  next();
});

// creating the model(table)
const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
