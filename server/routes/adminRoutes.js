const router = require('express').Router();
const AdminSchema = require("../models/admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { asyncParse,  UploadMultipleFiles} = require("../controllers/FileUpload")

router.post("/register", async(req,res) =>{
    try {
        
        let parseData = await asyncParse(req)
        let ImageInformation = parseData.files.image
        let data = JSON.parse(parseData.fields.data)
        try {
            //   uploading Images
            await UploadMultipleFiles(ImageInformation,'products').then((response) => { data.imagePath = response })
          }
           catch (error) {
          return res.status(400).json({ success: false, error: `Image not uploaded : ${error}` });
        }
        // Hash the password
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(data.password, salt);
        // Create a new product object
    const newadmin = new AdminSchema({
        admin_name: data.admin_name,
        email: data.email,
        password:encryptedPassword,
        path: data.imagePath,
      });
  
      // Save the product to the database
      await newadmin.save();
  
      return res.status(201).json({
        success: true,
        data: newadmin,
        message: "Ministry added successfully",
      });
    } catch (error) {
    return res.status(500).json({ success: false, error: `Error Adding ministry ${error}` });

    }


});


router.post("/login",async (req, res, next) => {
  // take a value from user end
  const { email, password } = req.body;

  // Validate user input
  if (!(email && password)) {
    res.status(400).send("All input is required");
    return;
  }

  const userExist = await AdminSchema.findOne({ email: email });

  if (userExist && (await bcrypt.compare(password, userExist.password))) {
    // generate jwt token
    const token = jwt.sign(
      {
        user_id: userExist._id,
        email,
      },
      process.env.TOKEN_KEY,
      { expiresIn: 60 }
    );

    // save user token
    userExist.token = token;

    // save user token in data base but there is no need to save it
    await userExist.save();

    return res.status(200).json({
      user: userExist,
      success: true,
      message: "login Successfull",
    });
  } else {
    return res.status(202).json({
      success: false,
      message: "Login failed",
    });
  }
});

module.exports=router;
