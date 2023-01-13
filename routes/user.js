const express = require("express");
const router = express.Router();
const {
    registerUser,
    loginUser,
    logout,
    getUser,
    loginStatus,
    updateUser,
    changePassword,
} = require("../controllers/user");
const{createtodo,selectodo,updatetodo,deletetodo}=require("../controllers/todo");
const protect = require("../middleWares/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/getuser", protect, getUser);
router.get("/loggedin", loginStatus);
router.patch("/updateuser", protect, updateUser);
router.patch("/changepassword", protect, changePassword);
router.post("/createtodo",protect,createtodo);
router.post("/selectodo",protect,selectodo);
router.post("/updatetodo",updatetodo);
router.post("/deletetodo",deletetodo);

module.exports = router;