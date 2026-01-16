// import jwt from "jsonwebtoken";

// export function signToken(userId) {
//   return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
//     expiresIn: "7d",
//   });
// }

// export function verifyToken(token) {
//   return jwt.verify(token, process.env.JWT_SECRET);
// }
import jwt from "jsonwebtoken";

export function signToken(user) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email, // ⭐ REQUIRED
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

export function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
