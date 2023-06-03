import express from "express";
import Blogs from "../models/blogModel.js";
import HomepageData from "../models/homepageDataModel.js";
import Users from "../models/userModel.js";
import Employees from "../models/employeeModel.js";
import Categories from "../models/categoryModels.js";
import sgMail from "@sendgrid/mail";
import {
  getToken,
  getEmployeeToken,
  verifyEmployeeToken,
  verifyToken,
  getPasswordToken,
  verifyPasswordToken,
} from "../jwt.js";

const router = express.Router();

// Employee registration
router.post("/save/employee", async (req, res) => {
  try {
    const employee = await new Employees(req.body.details);
    const newUser = await employee.save();

    // res.json({ user: user, token: token });
    if (newUser._id) {
      res.json({ status: 200, msg: "Successfully Registered" });
    } else
      res.json({ status: 500, msg: "Something went wrong try again later." });
    // res.json(user);
  } catch (error) {
    if (error.code === 11000) {
      res.json({ status: 11000, msg: "Already Registered." });
    } else {
      res.send({ msg: error.message });
    }
  }
});

// user signup
router.post("/save/user", async (req, res) => {
  try {
    // console.log(req.body.detail);
    const user1 = await new Users(req.body.detail);
    const newUser = await user1.save();
    // let trending = resu.map((a) => a.title);
    // console.log(resu);
    const {
      _doc: { password, ...user },
    } = newUser;
    const token = getToken(user);
    res.json({ user: user, token: token });
    // res.json(user);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

// user login
router.post("/find/user", async (req, res) => {
  try {
    // console.log(req.body.email);
    const user1 = await Users.findOne(
      {
        email: req.body.email,
        password: req.body.password,
      },
      { password: 0 }
    );
    // let trending = resu.map((a) => a.title);
    // console.log(resu);
    if (user1) {
      const token = getToken(user1);
      res.json({ user: user1, token: token });
    } else res.send({ msg: "Incorrect Email or Password" });
  } catch (error) {
    // console.log(error);
    res.send({ msg: error.message });
  }
});

// authenticate user
router.post("/authenticate", verifyToken, async (req, res) => {
  try {
    // console.log(res.locals.id);
    const user = await Users.findOne(
      {
        _id: res.locals.id,
      },
      { password: 0 }
    );
    // console.log(user);
    if (user) {
      res.json({ status: 200, user: user });
    } else {
      res.json({ status: 500, msg: "Not authorised" });
    }
    // let trending = resu.map((a) => a.title);
    // console.log(resu);
  } catch (error) {
    res.send({ msg: error.message });
  }
});
// all blogs for particular user
router.post("/find/blog/all", verifyToken, async (req, res) => {
  try {
    // console.log(res.locals.id);
    const user = await Users.findOne(
      {
        _id: res.locals.id,
      },
      { password: 0 }
    );
    // console.log(user);
    if (user.isAdmin) {
      const resu = await Blogs.find({});
      res.json({ blogs: resu, user: user });
    } else {
      const resu = await Blogs.find({ _id: { $in: user.blog } });
      res.json({ blogs: resu, user: user });
    }
    // let trending = resu.map((a) => a.title);
    // console.log(resu);
  } catch (error) {
    res.send({ msg: error.message });
  }
});
// find all blogs for particular category
router.post("/find/blog/categories", async (req, res) => {
  try {
    const resu = await Blogs.find({
      category: req.body.category,
      status: "Active",
    });
    // let trending = resu.map((a) => a.title);
    res.json(resu);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

// data for homepage
router.post("/find/data/homepage", async (req, res) => {
  try {
    // const user1 = await new HomepageData({
    //   recent: [],
    //   categoryData: {},
    // });
    // const newUser = await user1.save();
    // console.log(newUser);
    const resu = await HomepageData.findOne({});
    // console.log(resu);
    res.json(resu);
  } catch (error) {
    console.log(error);
    res.send({ msg: error.message });
  }
});
// find blogs with status
router.post("/find/blog/status", async (req, res) => {
  try {
    const resu = await Blogs.find({ status: req.body.status });
    res.json(resu);
  } catch (error) {
    res.send({ msg: error.message });
  }
});
// update isActive
router.post("/update/blog/status", verifyToken, async (req, res) => {
  try {
    const resu = await Blogs.updateMany(
      { _id: { $in: req.body.id } },
      { status: req.body.status }
    );

    if (resu.modifiedCount && resu.modifiedCount) {
      if (req.body.status === "Active") {
        const st = await HomepageData.updateMany(
          {
            _id: "647a21933a89a8239f770931",
          },
          {
            $pull: {
              recent: {
                _id: { $in: req.body.id },
              },
            },
          }
        );
        const r = await HomepageData.updateOne(
          {
            _id: "647a21933a89a8239f770931",
            "recent._id": { $nin: req.body.id },
          },
          {
            $push: {
              recent: {
                $each: [req.body.blog],
                $position: 0,
                $slice: 6,
              },
            },
          }
        );
      }
      res.json({ status: 200, msg: "Activated Sucessfully" });
    } else {
      res.json({ status: 500, msg: "something went wrong" });
    }
  } catch (error) {
    console.log(error);
    res.send({ msg: error.message });
  }
});
// find categories
router.post("/find/categories", async (req, res) => {
  try {
    const resu = await Categories.findOne({ _id: "644779adaba2893aa8117eb4" });
    // let trending = resu.map((a) => a.title);
    // console.log(resu.categories);
    res.json(resu.categories);
  } catch (error) {
    res.send({ msg: error.message });
  }
});
// add new categories
router.post("/add/category", async (req, res) => {
  try {
    // console.log(req.body.category);
    const data = await Categories.updateOne(
      { _id: "644779adaba2893aa8117eb4" },
      { $push: { categories: req.body.category } }
    );
    // console.log(data);
    if (data.modifiedCount) {
      res.json({ status: 1, msg: "Category Added Successfully" });
    } else {
      res.json({ status: 0, msg: "Something went Wrong" });
    }
    // console.log(data);
  } catch (error) {
    res.send({ status: 0, msg: error.message });
  }
});
// create blog
router.post("/add/blog", async (req, res) => {
  try {
    const date =
      new Date().toLocaleString("en-US", { weekday: "long" }) +
      ", " +
      new Date().toLocaleString("en-US", { month: "long" }) +
      ", " +
      new Date().getDate() +
      ", " +
      new Date().getFullYear();
    const blog = new Blogs({
      title: req.body.title,
      mainImg: req.body.mainImg,
      keywords: req.body.keywords,
      category: req.body.category,
      blog: req.body.blog,
      views: 0,
      createdDate: date,
      user: req.body.user,
    });
    const status = await blog.save();
    // console.log(status._id);
    const response = await Users.updateOne(
      {
        _id: req.body.user,
      },
      { $addToSet: { blog: status._id } }
    );
    res.json({ status: 1, msg: "Blog saved successfully.", data: status });
  } catch (error) {
    // console.log(error);
    res.send({ status: 0, msg: error.message });
  }
});
// find trending blogs with most views
router.post("/blog/trending", async (req, res) => {
  try {
    const resu = await Blogs.find({ status: "Active" })
      .sort({ views: -1 })
      .limit(6);
    // let trending = resu.map((a) => a.title);
    // console.log(resu);
    res.json(resu);
  } catch (error) {
    res.send({ msg: error.message });
  }
});
// find titles
router.post("/blog/titles", async (req, res) => {
  try {
    const resu = await Blogs.find({}).select({ title: 1, _id: 0 });
    let titles = resu.map((a) => a.title);
    res.json(titles);
  } catch (error) {
    res.send({ msg: error.message });
  }
});
// 6 recent blogs
// db.collection.find().limit(5).sort({$natural:-1})
router.post("/recent/blogs", async (req, res) => {
  try {
    const resu = await Blogs.find({ status: "Active" })
      .limit(6)
      .sort({ $natural: -1 });
    res.json(resu);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

// find blogs by category max:6
router.post("/category/blogs", async (req, res) => {
  try {
    const resu = await Blogs.find({
      category: req.body.category,
      status: "Active",
    })
      .limit(6)
      .collation({
        locale: "en",
        strength: 2,
      });
    res.json(resu);
  } catch (error) {
    res.send({ msg: error.message });
  }
});
// find blog by title for search input
router.post("/find/blog", async (req, res) => {
  try {
    const blog = await Blogs.find({
      title: req.body.title,
      status: "Active",
    }).collation({
      locale: "en",
      strength: 2,
    });
    res.json(blog);
  } catch (error) {
    res.send({ msg: error.message });
  }
});
// find blog by id for blog page
router.post("/find/blog/id", async (req, res) => {
  try {
    const blog = await Blogs.findOneAndUpdate(
      { _id: req.body.id, status: "Active" },
      { $inc: { views: 1 } }
    );
    // console.log(blog);
    res.json(blog);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

// delete blog with id
router.post("/delete/blog", async (req, res) => {
  try {
    const stat = await Blogs.deleteOne({ _id: req.body.id });
    // console.log(stat);
    const address = await Users.updateOne(
      { _id: req.body.user },
      { $pull: { blog: req.body.id } }
    );

    if (stat.deletedCount) {
      const r = await HomepageData.updateOne(
        {
          _id: "647a21933a89a8239f770931",
        },
        {
          $pull: {
            recent: {
              _id: req.body.id,
            },
          },
        }
      );
      res.json({ status: 1, msg: "Blog Deleted Successfully" });
    } else {
      res.json({ status: 0, msg: "Something went Wrong" });
    }
  } catch (error) {
    // console.log(error);
    res.send({ status: 0, msg: error.message });
  }
});

//  Update blog
router.post("/update/blog", async (req, res) => {
  try {
    const date =
      new Date().toLocaleString("en-US", { weekday: "long" }) +
      ", " +
      new Date().toLocaleString("en-US", { month: "long" }) +
      ", " +
      new Date().getDate() +
      ", " +
      new Date().getFullYear();
    // console.log(date);
    const updated = await Blogs.findOneAndUpdate(
      { _id: req.body.id },
      {
        title: req.body.title,
        mainImg: req.body.mainImg,
        category: req.body.category,
        keywords: req.body.keywords,
        blog: req.body.blog,
        updatedDate: date,
        status: "Inactive",
      },
      {
        new: true,
      }
    );
    // console.log(updated);
    const st = await HomepageData.updateOne(
      {
        _id: "647a21933a89a8239f770931",
      },
      {
        $pull: {
          recent: {
            _id: req.body.id,
          },
        },
      }
    );
    if (updated) {
      // console.log("in");
      res.json({ status: 1, msg: "Blog sucessfully updated.", data: updated });
    } else {
      // console.log("in2");
      res.json({ status: 0, msg: "Something went Wrong" });
    }
  } catch (error) {
    res.send({ status: 0, msg: error.message });
  }
});

// verify change password token
router.post("/verifyPassword/token", verifyPasswordToken, async (req, res) => {
  try {
    // console.log(res.locals.email);
    if (res.locals.email) {
      res.json({ status: 200, msg: "Token verified" });
    } else {
      res.json({ status: 500, msg: "Invalid Token" });
    }
  } catch (error) {
    // console.log(error);
    res.send({ status: 500, msg: error.message });
  }
});
// verify change password token
router.post("/change/password", verifyPasswordToken, async (req, res) => {
  try {
    const email = res.locals.email;
    // console.log(email);
    if (email) {
      const update = await Users.updateOne(
        { email: email },
        { password: req.body.password }
      );
      // console.log(update);
      if (update.acknowledged && update.modifiedCount) {
        res.json({ status: 200, msg: "Password reset sucessfully" });
      }
    } else {
      res.json({ status: 500, msg: "Something went wrong, try again later" });
    }
  } catch (error) {
    // console.log(error);
    res.send({ status: 500, msg: error.message });
  }
});

// verify employee registration token
router.post(
  "/verify/employee/registration/token",
  verifyEmployeeToken,
  async (req, res) => {
    try {
      const data = res.locals.data;
      if (data.email) {
        res.json({ ...data, status: 200, msg: "Authorised" });
      } else {
        res.json({ status: 500, msg: "Authorisation failed" });
      }
      // if (email) {
      //   const update = await Users.updateOne(
      //     { email: email },
      //     { password: req.body.password }
      //   );
      //   // console.log(update);
      //   if (update.acknowledged && update.modifiedCount) {
      //     res.json({ status: 200, msg: "Password reset sucessfully" });
      //   }
      // } else {
      //   res.json({ status: 500, msg: "Something went wrong, try again later" });
      // }
    } catch (error) {
      console.log(error);
      res.send({ status: 500, msg: error.message });
    }
  }
);

// send registration email to employees
router.post("/add/employee/sendemail", async (req, res) => {
  const data = req.body.state;
  // console.log(data.email);
  const token = getEmployeeToken(data);
  // console.log(data);
  // const userId = req.body.userId;
  // contact us email
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: data.email, // Change to your recipient
    from: "mohd.shees102@gmail.com", // Change to your verified sender
    subject: "Register",
    html: `
    
    <!DOCTYPE html>

    <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
    <head>
    <title></title>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
    <style>
        * {
          box-sizing: border-box;
        }
    
        body {
          margin: 0;
          padding: 0;
        }
    
        a[x-apple-data-detectors] {
          color: inherit !important;
          text-decoration: inherit !important;
        }
    
        #MessageViewBody a {
          color: inherit;
          text-decoration: none;
        }
    
        p {
          line-height: inherit
        }
    
        .desktop_hide,
        .desktop_hide table {
          mso-hide: all;
          display: none;
          max-height: 0px;
          overflow: hidden;
        }
    
        .image_block img+div {
          display: none;
        }
    
        @media (max-width:660px) {
          .desktop_hide table.icons-inner {
            display: inline-block !important;
          }
    
          .icons-inner {
            text-align: center;
          }
    
          .icons-inner td {
            margin: 0 auto;
          }
    
          .row-content {
            width: 100% !important;
          }
    
          .mobile_hide {
            display: none;
          }
    
          .stack .column {
            width: 100%;
            display: block;
          }
    
          .mobile_hide {
            min-height: 0;
            max-height: 0;
            max-width: 0;
            overflow: hidden;
            font-size: 0px;
          }
    
          .desktop_hide,
          .desktop_hide table {
            display: table !important;
            max-height: none !important;
          }
        }
      </style>
    </head>
    <body style="background-color: #f8f8f9; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
    <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f8f8f9;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #1aa19c;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #1aa19c; color: #000000; width: 640px;" width="640">
    <tbody>
    <tr>
    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
    <table border="0" cellpadding="0" cellspacing="0" class="divider_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tr>
    <td class="pad">
    <div align="center" class="alignment">
    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tr>
    <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 4px solid #1AA19C;"><span> </span></td>
    </tr>
    </table>
    </div>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f9f8f8;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000000; border-radius: 0; width: 640px;" width="640">
    <tbody>
    <tr>
    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
    <table border="0" cellpadding="0" cellspacing="0" class="heading_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tr>
    <td class="pad" style="width:100%;text-align:center;padding-top:20px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
    <h1 style="margin: 0; color: #f32020; font-size: 31px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 120%; text-align: center; direction: ltr; font-weight: 700; letter-spacing: 2px; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">OFFTHEWEB</span></h1>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000000; width: 640px;" width="640">
    <tbody>
    <tr>
    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
    <table border="0" cellpadding="0" cellspacing="0" class="divider_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tr>
    <td class="pad" style="padding-bottom:10px;padding-left:15px;padding-right:15px;padding-top:15px;">
    <div align="center" class="alignment">
    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tr>
    <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 3px solid #E82626;"><span> </span></td>
    </tr>
    </table>
    </div>
    </td>
    </tr>
    </table>
    <table border="0" cellpadding="0" cellspacing="0" class="text_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
    <tr>
    <td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
    <div style="font-family: Arial, sans-serif">
    <div class="" style="font-size: 12px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2;">
    <p style="margin: 0; font-size: 16px; text-align: center; mso-line-height-alt: 19.2px;"><span style="font-size:22px;color:#2b303a;"><strong>Employee/Intern registration </strong></span></p>
    </div>
    </div>
    </td>
    </tr>
    </table>
    <table border="0" cellpadding="0" cellspacing="0" class="text_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
    <tr>
    <td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
    <div style="font-family: sans-serif">
    <div class="" style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 18px; color: #555555; line-height: 1.5;">
    <p style="margin: 0; mso-line-height-alt: 18px;">Dear ${data.email},</p>
    <p style="margin: 0; mso-line-height-alt: 18px;"> </p>
    <p style="margin: 0; mso-line-height-alt: 18px;">We hope this email finds you well. We are writing to congratulate you on successfully joining our company as a valued team member. We are thrilled to have you on board and look forward to your contributions.</p>
    <p style="margin: 0; mso-line-height-alt: 18px;"> </p>
    <p style="margin: 0; mso-line-height-alt: 18px;">To ensure a smooth onboarding process, it is important that you complete the registration process by clicking the register button:</p>
    </div>
    </div>
    </td>
    </tr>
    </table>
    <table border="0" cellpadding="0" cellspacing="0" class="button_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tr>
    <td class="pad" style="padding-left:10px;padding-right:10px;padding-top:15px;text-align:center;">
    <div align="center" class="alignment"><!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://www.offtheweb.in/employee/registration/${token}" style="height:62px;width:124px;v-text-anchor:middle;" arcsize="57%" stroke="false" fillcolor="#f7a50c"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:16px"><![endif]--><a href="https://www.offtheweb.in/employee/registration/${token}" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#f7a50c;border-radius:35px;width:auto;border-top:0px solid transparent;font-weight:undefined;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:15px;padding-bottom:15px;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;" target="_blank"><span style="padding-left:30px;padding-right:30px;font-size:16px;display:inline-block;letter-spacing:normal;"><span dir="ltr" style="margin: 0; word-break: break-word; line-height: 32px;"><strong>Register</strong></span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></div>
    </td>
    </tr>
    </table>
    <table border="0" cellpadding="0" cellspacing="0" class="text_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
    <tr>
    <td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:25px;">
    <div style="font-family: sans-serif">
    <div class="" style="font-size: 12px; mso-line-height-alt: 18px; color: #555555; line-height: 1.5; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;">
    <p style="margin: 0; font-size: 12px; mso-line-height-alt: 18px;">We are excited to have you as part of our team and believe that your contributions will greatly enhance our company's success. If there is anything we can do to assist you during this transition period, please feel free to let us know.</p>
    <p style="margin: 0; font-size: 12px; mso-line-height-alt: 18px;"> </p>
    <p style="margin: 0; mso-line-height-alt: 18px;">Best regards,</p>
    <p style="margin: 0; mso-line-height-alt: 18px;">OFFTHEWEB</p>
    <p style="margin: 0; mso-line-height-alt: 18px;"> </p>
    <p style="margin: 0; mso-line-height-alt: 18px;"><strong>Note</strong>: Your Data security is our priority. It will only be used to keep the record. We will not disclose or share you data with anyone.</p>
    <p style="margin: 0; mso-line-height-alt: 18px;">Link is valid for only one Employee/Intern and can not be used again. </p><br/><p style="margin: 0; mso-line-height-alt: 18px;">Contact us: <a href="https://www.offtheweb.in/contact">https://www.offtheweb.in/contact</p>
    <p style="margin: 0; mso-line-height-alt: 18px;"> </p>
    <p style="margin: 0; font-size: 12px; mso-line-height-alt: 18px;"> </p>
    </div>
    </div>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #410125; color: #000000; width: 640px;" width="640">
    <tbody>
    <tr>
    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
    <table border="0" cellpadding="0" cellspacing="0" class="text_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
    <tr>
    <td class="pad" style="padding-bottom:30px;padding-left:40px;padding-right:40px;padding-top:20px;">
    <div style="font-family: sans-serif">
    <div class="" style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2;">
    <p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 16.8px;"><span style="color:#95979c;font-size:12px;">OFFTHEWEB Copyright © 2023</span></p>
    <p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 16.8px;"><span style="color:#95979c;font-size:12px;">Want to stop receiving these emails?</span></p>
    <p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 16.8px;"><span style="color:#95979c;font-size:12px;"> <a href="" rel="noopener" style="text-decoration: underline; color: #ffffff;" target="_blank">Unsubscribe </a></span></p>
    </div>
    </div>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px;" width="640">
    <tbody>
    <tr>
    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
    <table border="0" cellpadding="0" cellspacing="0" class="icons_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tr>
    <td class="pad" style="vertical-align: middle; color: #9d9d9d; font-family: inherit; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
    <table cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tr>
    <td class="alignment" style="vertical-align: middle; text-align: center;"><!--[if vml]><table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
    
    </td>
    </tr>
    </table>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table><!-- End -->
    </body>
    </html>



        `,
  };
  sgMail
    .send(msg)
    .then(() => {
      res.send({
        success: true,
        message:
          "Registration Email has benn sent to the Employee/Intern succesfully",
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Something went wrong. Try again later",
      });
    });
});

// email route
router.post("/contact/sendemail", async (req, res) => {
  const data = req.body.State;
  // console.log(data);
  // const userId = req.body.userId;

  // contact us email
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: "mohd.shees101@gmail.com", // Change to your recipient
    from: "mohd.shees102@gmail.com", // Change to your verified sender
    subject: data.subject,
    html: `
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
        <!--[if !mso]><!-->
        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
        <!--<![endif]-->
        <!--[if (gte mso 9)|(IE)]>
        <xml>
          <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
        <!--[if (gte mso 9)|(IE)]>
    <style type="text/css">
      body {width: 620px;margin: 0 auto;}
      table {border-collapse: collapse;}
      table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
      img {-ms-interpolation-mode: bicubic;}
    </style>
  <![endif]-->
        <style type="text/css">
      body, p, div {
        font-family: arial,helvetica,sans-serif;
        font-size: 14px;
      }
      body {
        color: #000000;
      }
      body a {
        color: #932A89;
        text-decoration: none;
      }
      p { margin: 0; padding: 0; }
      table.wrapper {
        width:100% !important;
        table-layout: fixed;
        -webkit-font-smoothing: antialiased;
        -webkit-text-size-adjust: 100%;
        -moz-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      img.max-width {
        max-width: 100% !important;
      }
      .column.of-2 {
        width: 50%;
      }
      .column.of-3 {
        width: 33.333%;
      }
      .column.of-4 {
        width: 25%;
      }
      ul ul ul ul  {
        list-style-type: disc !important;
      }
      ol ol {
        list-style-type: lower-roman !important;
      }
      ol ol ol {
        list-style-type: lower-latin !important;
      }
      ol ol ol ol {
        list-style-type: decimal !important;
      }
      @media screen and (max-width:480px) {
        .preheader .rightColumnContent,
        .footer .rightColumnContent {
          text-align: left !important;
        }
        .preheader .rightColumnContent div,
        .preheader .rightColumnContent span,
        .footer .rightColumnContent div,
        .footer .rightColumnContent span {
          text-align: left !important;
        }
        .preheader .rightColumnContent,
        .preheader .leftColumnContent {
          font-size: 80% !important;
          padding: 5px 0;
        }
        table.wrapper-mobile {
          width: 100% !important;
          table-layout: fixed;
        }
        img.max-width {
          height: auto !important;
          max-width: 100% !important;
        }
        a.bulletproof-button {
          display: block !important;
          width: auto !important;
          font-size: 80%;
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        .columns {
          width: 100% !important;
        }
        .column {
          display: block !important;
          width: 100% !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
        }
        .social-icon-column {
          display: inline-block !important;
        }
      }
    </style>
        <!--user entered Head Start--><!--End Head user entered-->
      </head>
      <body>
        <center class="wrapper" data-link-color="#932A89" data-body-style="font-size:14px; font-family:arial,helvetica,sans-serif; color:#000000; background-color:#f0f0f0;">
          <div class="webkit">
            <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#f0f0f0">
              <tr>
                <td valign="top" bgcolor="#f0f0f0" width="100%">
                  <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td width="100%">
                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                          <tr>
                            <td>
                              <!--[if mso]>
      <center>
      <table><tr><td width="620">
    <![endif]-->
                                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:620px;" align="center">
                                        <tr>
                                          <td role="modules-container" style="padding:0px 10px 0px 10px; color:#000000; text-align:left;" bgcolor="#F0F0F0" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
      <tr>
        <td role="module-content">
          <p></p>
        </td>
      </tr>
    </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="13d36c46-b515-4bdf-ad3c-edafb5c1c151" data-mc-module-version="2019-10-22">
      <tbody>
        <tr>
          <td style="padding:20px 15px 15px 15px; line-height:0px; text-align:inherit; background-color:#d488cc;" height="100%" valign="top" bgcolor="#d488cc" role="module-content"><div><h3 style="text-align: center; font-family: inherit"><span style="font-size: 24px; color: #52184d">OFFTHEWEB</span></h3><div></div></div></td>
        </tr>
      </tbody>
    </table><table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:10px 2px 10px 2px;" bgcolor="#3172a3" data-distribution="1">
      <tbody>
        <tr role="module-content">
          <td height="100%" valign="top"><table width="596" style="width:596px; border-spacing:0; border-collapse:collapse; margin:0px 0px 0px 0px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-0">
        <tbody>
          <tr>
            <td style="padding:0px;margin:0px;border-spacing:0;"><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="efe5a2c4-1b11-49e7-889d-856d80b40f63" data-mc-module-version="2019-10-22">
      <tbody>
        <tr>
          <td style="padding:5px 0px 5px 0px; line-height:36px; text-align:inherit; background-color:#74bcd9;" height="100%" valign="top" bgcolor="#74bcd9" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-family: &quot;trebuchet ms&quot;, helvetica, sans-serif; font-size: 30px; color: #f8f4f4"><strong>${data.subject}</strong></span></div><div></div></div></td>
        </tr>
      </tbody>
    </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="efe5a2c4-1b11-49e7-889d-856d80b40f63.2" data-mc-module-version="2019-10-22">
      <tbody>
        <tr>
          <td style="padding:50px 5px 30px 10px; line-height:17px; text-align:inherit; background-color:#ffffff;" height="100%" valign="top" bgcolor="#ffffff" role="module-content"><div><div style="font-family: inherit; text-align: inherit"><span style="font-family: &quot;trebuchet ms&quot;, helvetica, sans-serif; color: #656565; font-size: 18px">${data.name}</span><span style="font-size: 20px; font-family: &quot;trebuchet ms&quot;, helvetica, sans-serif; color: #656565">,</span></div>
  <div style="font-family: inherit; text-align: inherit"><br></div>
  <div style="font-family: inherit; text-align: inherit"><span style="font-family: &quot;trebuchet ms&quot;, helvetica, sans-serif; color: #656565; font-size: 14px">${data.message}</span></div><div></div></div></td>
        </tr>
      </tbody>
    </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="efe5a2c4-1b11-49e7-889d-856d80b40f63.1" data-mc-module-version="2019-10-22">
      <tbody>
        <tr>
          <td style="padding:40px 5px 50px 10px; line-height:26px; text-align:inherit; background-color:#FFFFFF;" height="100%" valign="top" bgcolor="#FFFFFF" role="module-content"><div><div style="font-family: inherit; text-align: inherit"><span style="font-family: &quot;trebuchet ms&quot;, helvetica, sans-serif; color: #656565; font-size: 14px">From,</span></div>
  <div style="font-family: inherit; text-align: inherit"><span style="font-family: &quot;trebuchet ms&quot;, helvetica, sans-serif; color: #656565; font-size: 14px">${data.email}</span></div><div></div></div>

  </td>
        </tr>
      </tbody>
    </table></td>
          </tr>
        </tbody>
      </table></td>
        </tr>
      </tbody>
    </table></td>
                                        </tr>
                                      </table>
                                      <!--[if mso]>
                                    </td>
                                  </tr>
                                </table>
                              </center>
                              <![endif]-->
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
        </center>
      </body>
  
        `,
  };
  sgMail
    .send(msg)
    .then(() => {
      res.send({
        success: true,
        message: "Thanks for contacting us. We will get back to you shortly",
      });
    })
    .catch((error) => {
      // console.log(error);
      res.status(500).send({
        success: false,
        message: "Something went wrong. Try again later",
      });
    });
});

router.post("/forgetPassword", async (req, res) => {
  try {
    const email = req.body.email;
    const token = getPasswordToken(email);

    const userDetails = await Users.findOne(
      { email: email },
      { email: 1, password: 1 }
    );

    // console.log(userDetails);
    if (userDetails) {
      // res.send(userDetails._doc);
      // const data = req.body.state;
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: email, // Change to your recipient
        from: "mohd.shees102@gmail.com", // Change to your verified sender
        subject: "OFFTHEWEB PASSWORD",
        html: `
        <!DOCTYPE html>

        <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
        <head>
        <title></title>
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
        <meta content="width=device-width, initial-scale=1.0" name="viewport"/><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
        <style>
            * {
              box-sizing: border-box;
            }
        
            body {
              margin: 0;
              padding: 0;
            }
        
            a[x-apple-data-detectors] {
              color: inherit !important;
              text-decoration: inherit !important;
            }
        
            #MessageViewBody a {
              color: inherit;
              text-decoration: none;
            }
        
            p {
              line-height: inherit
            }
        
            .desktop_hide,
            .desktop_hide table {
              mso-hide: all;
              display: none;
              max-height: 0px;
              overflow: hidden;
            }
        
            .image_block img+div {
              display: none;
            }
        
            @media (max-width:660px) {
              .desktop_hide table.icons-inner {
                display: inline-block !important;
              }
        
              .icons-inner {
                text-align: center;
              }
        
              .icons-inner td {
                margin: 0 auto;
              }
        
              .row-content {
                width: 100% !important;
              }
        
              .mobile_hide {
                display: none;
              }
        
              .stack .column {
                width: 100%;
                display: block;
              }
        
              .mobile_hide {
                min-height: 0;
                max-height: 0;
                max-width: 0;
                overflow: hidden;
                font-size: 0px;
              }
        
              .desktop_hide,
              .desktop_hide table {
                display: table !important;
                max-height: none !important;
              }
            }
          </style>
        </head>
        <body style="background-color: #f8f8f9; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
        <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f8f8f9;" width="100%">
        <tbody>
        <tr>
        <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #1aa19c;" width="100%">
        <tbody>
        <tr>
        <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; background-color: #1aa19c; width: 640px;" width="640">
        <tbody>
        <tr>
        <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
        <table border="0" cellpadding="0" cellspacing="0" class="divider_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="pad">
        <div align="center" class="alignment">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 4px solid #1AA19C;"><span> </span></td>
        </tr>
        </table>
        </div>
        </td>
        </tr>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tbody>
        <tr>
        <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000000; border-radius: 0; width: 640px;" width="640">
        <tbody>
        <tr>
        <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
        <table border="0" cellpadding="0" cellspacing="0" class="heading_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="pad" style="width:100%;text-align:center;padding-top:15px;padding-right:10px;padding-left:10px;">
        <h1 style="margin: 0; color: #f80909; font-size: 30px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 120%; text-align: center; direction: ltr; font-weight: 700; letter-spacing: 2px; margin-top: 0; margin-bottom: 0;"><strong><span class="tinyMce-placeholder">OFFTHEWEB</span></strong></h1>
        </td>
        </tr>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tbody>
        <tr>
        <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; background-color: #fff; width: 640px;" width="640">
        <tbody>
        <tr>
        <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
        <table border="0" cellpadding="0" cellspacing="0" class="divider_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="pad" style="padding-left:15px;padding-right:15px;padding-top:10px;">
        <div align="center" class="alignment">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 4px solid #220303;"><span> </span></td>
        </tr>
        </table>
        </div>
        </td>
        </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" class="text_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
        <tr>
        <td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:25px;">
        <div style="font-family: Arial, sans-serif">
        <div class="" style="font-size: 12px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2;">
        <p style="margin: 0; font-size: 16px; text-align: center; mso-line-height-alt: 19.2px;"><span style="font-size:22px;color:#2b303a;"><strong>Forgot Your Password?</strong></span></p>
        </div>
        </div>
        </td>
        </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" class="text_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
        <tr>
        <td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
        <div style="font-family: sans-serif">
        <div class="" style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 18px; color: #555555; line-height: 1.5;">
        <p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 21px;"><strong>Click the Reset Password button to reset the password</strong><br/>Link is valid for 5 minutes.</p>
        </div>
        </div>
        </td>
        </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" class="button_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="pad" style="padding-left:10px;padding-right:10px;padding-top:15px;text-align:center;">
        <div align="center" class="alignment"><!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:62px;width:210px;v-text-anchor:middle;" arcsize="57%" stroke="false" fillcolor="#f7a50c"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:16px"><![endif]--><a href="http://offtheweb.in/changepassword/${token}" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#f7a50c;border-radius:35px;width:auto;border-top:0px solid transparent;font-weight:undefined;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:15px;padding-bottom:15px;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;" target="_blank"><span style="padding-left:30px;padding-right:30px;font-size:16px;display:inline-block;letter-spacing:normal;"><span dir="ltr" style="margin: 0; word-break: break-word; line-height: 32px;"><strong>RESET PASSWORD</strong></span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></div>
        </td>
        </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" class="divider_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="pad" style="padding-bottom:12px;padding-top:25px;">
        <div align="center" class="alignment">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span> </span></td>
        </tr>
        </table>
        </div>
        </td>
        </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" class="text_block block-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
        <tr>
        <td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
        <div style="font-family: sans-serif">
        <div class="" style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 18px; color: #555555; line-height: 1.5;">
        <p style="margin: 0; mso-line-height-alt: 18px;">If you did not request a password change, please contact us IMMEDIATELY so we can keep your account secure.</p>
        <p style="margin: 0; mso-line-height-alt: 18px;"> </p>
        <p style="margin: 0; mso-line-height-alt: 18px;">Contact Us at -<br/><a href="https://u24411844.ct.sendgrid.net/ls/click?upn=wn5VxQNDmL2KF-2BV1yfDiZLHBjPHpMGYpg7meDsSuIgti9TvmiARPN-2FfxRo7zg8KuSMdt_9-2FeLDb2w2xTsdHAxqgMnnsxTzRtJFSLtY-2FRonIwZ2Rvd-2BtlyFadMfGHIW8Aspm59A1dxSvP1hH6AljT1Jih0BBIY6JEEnLQ3G3o5KV-2F4V-2BUPjvi2LUWFC8AFv-2BokH1pDFdJjh7KPTgQm0kp-2FGq3n7FbEcRHBZMvl5I1ap2s-2Bbsw3J1DKFN6EL6bIyVssecoGcgSgS9g-2B5cHVvbc6bB81fDDNvXXpUozbipWY-2F4O-2Bgzg-3D" rel="noopener" style="text-decoration: underline; color: #e91414;" target="_blank">https://www.offtheweb.in/contact</a></p>
        <p style="margin: 0; mso-line-height-alt: 18px;">or Email at<br/><a href="mailto:official.offtheweb@gmail.com" rel="noopener" style="text-decoration: underline; color: #e91414;" target="_blank">official.offtheweb@gmail.com</a></p>
        <p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 21px;"><br/><br/></p>
        </div>
        </div>
        </td>
        </tr>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tbody>
        <tr>
        <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000000; border-radius: 0; width: 640px;" width="640">
        <tbody>
        <tr>
        <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
        <div class="spacer_block block-1" style="height:1px;line-height:1px;font-size:1px;"> </div>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tbody>
        <tr>
        <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000000; border-radius: 0; width: 640px;" width="640">
        <tbody>
        <tr>
        <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #410125; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
        <table border="0" cellpadding="15" cellspacing="0" class="paragraph_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
        <tr>
        <td class="pad">
        <div style="color:#ffffff;font-size:10px;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-weight:400;line-height:120%;text-align:center;direction:ltr;letter-spacing:0px;mso-line-height-alt:12px;">
        <p style="margin: 0; margin-bottom: 5px;">OFFTHEWEB Copyright © 2023</p>
        <p style="margin: 0; margin-bottom: 5px;">Want to stop receiving these emails?</p>
        <p style="margin: 0;"><a href="" rel="noopener" style="text-decoration: underline; color: #53bcfa;" target="_blank">Unsubscribe</a></p>
        </div>
        </td>
        </tr>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tbody>
        <tr>
        <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px;" width="640">
        <tbody>
        <tr>
        <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
        <table border="0" cellpadding="0" cellspacing="0" class="icons_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="pad" style="vertical-align: middle; color: #9d9d9d; font-family: inherit; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
        <table cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="alignment" style="vertical-align: middle; text-align: center;"><!--[if vml]><table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
        </td>
        </tr>
        </table>
        </td>
        </tr>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table><!-- End -->
        </body>
        </html>
          `,
      };
      sgMail
        .send(msg)
        .then(() => {
          res.send({
            success: true,
            message: "Password reset link has been Sent to Registered Email.",
          });
        })
        .catch((error) => {
          //   console.log(error);
          res.send({
            status: 500,
            success: false,
            message: "Something went wrong. Try again later",
          });
        });
    } else {
      res.send({ status: 500, message: "Incorrect Email" });
    }
    // userDetails
    //   ? res.send(userDetails._doc)
    //   : res.status(401).send({ msg: "Incorrect Mobile No. or Email" });
  } catch (error) {
    // console.log(error);
    res.send({ msg: error.message });
  }
});

export default router;
