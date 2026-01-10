import aj from "../config/archjet.js";

const archjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 1 }); // Deduct 1 token from the bucket

    console.log("Arcjet decision", decision);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit())
        return res.status(429).json({ error: "Too Many Requests" });
      else if (decision.reason.isBot())
        return res.status(403).json({ error: "No bots allowed" });
      else return res.status(403).json({ error: "Forbidden" });
    }

    next();
  } catch (error) {
    next(error);
  }
};


export default archjetMiddleware;;