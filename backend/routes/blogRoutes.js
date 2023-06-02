import express from "express";
import Blogs from "../models/blogModel.js";
import Users from "../models/userModel.js";
import Categories from "../models/categoryModels.js";
import sgMail from "@sendgrid/mail";
import { getToken, verifyToken } from "../jwt.js";

const router = express.Router();

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
    // console.log(resu);
    res.json(resu);
  } catch (error) {
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
    // console.log(resu);
    if (resu.modifiedCount && resu.modifiedCount) {
      res.json({ status: 200, msg: "Activated Sucessfully" });
    } else {
      res.json({ status: 500, msg: "something went wrong" });
    }
  } catch (error) {
    // console.log(error);
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
      res.json({ status: 1, msg: "Blog Deleted Successfully" });
    } else {
      res.json({ status: 0, msg: "Something went Wrong" });
    }
  } catch (error) {
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
      },
      {
        new: true,
      }
    );
    // console.log(updated);

    if (updated) {
      // console.log("in");
      res.json({ status: 1, msg: "Blog sucessfully updated.", data: updated });
    } else {
      // console.log("in2");
      res.json({ status: 0, msg: "Already updated." });
    }
  } catch (error) {
    res.send({ status: 0, msg: error.message });
  }
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

// forget password
router.post("/forgetPassword", async (req, res) => {
  try {
    const email = req.body.email;

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
        body {width: 600px;margin: 0 auto;}
        table {border-collapse: collapse;}
        table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
        img {-ms-interpolation-mode: bicubic;}
      </style>
    <![endif]-->
          <style type="text/css">
        body, p, div {
          font-family: inherit;
          font-size: 14px;
        }
        body {
          color: #000000;
        }
        body a {
          color: #1188E6;
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
          <!--user entered Head Start--><link href="https://fonts.googleapis.com/css?family=Chivo&display=swap" rel="stylesheet"><style>
    body {font-family: 'Chivo', sans-serif;}
    </style><!--End Head user entered-->
        </head>
        <body>
          <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:14px; font-family:inherit; color:#000000; background-color:#FFFFFF;">
            <div class="webkit">
              <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF">
                <tr>
                  <td valign="top" bgcolor="#FFFFFF" width="100%">
                    <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="100%">
                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td>
                                <!--[if mso]>
        <center>
        <table><tr><td width="600">
      <![endif]-->
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                                          <tr>
                                            <td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
        <tr>
          <td role="module-content">
            <p></p>
          </td>
        </tr>
      </table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="7a8a420f-bc0f-4307-bd09-412a5ff00998">
        <tbody>
          <tr>
            <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
              <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;" width="600" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/954c252fedab403f/93a17c3c-cf4b-40a6-9cae-ff0c223945a4/600x56.png">
            </td>
          </tr>
        </tbody>
      </table><table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:0px 0px 0px 0px;" bgcolor="#FFFFFF" data-distribution="1">
        <tbody>
          <tr role="module-content">
            <td height="100%" valign="top"><table width="600" style="width:600px; border-spacing:0; border-collapse:collapse; margin:0px 0px 0px 0px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-0">
          <tbody>
            <tr>
              <td style="padding:0px;margin:0px;border-spacing:0;"><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="0439ab5b-e48d-4678-b644-de6e5a115565">
        <tbody>
          <tr>
            <td style="padding:0px 0px 0px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
              <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="7px" style="line-height:7px; font-size:7px;">
                <tbody>
                  <tr>
                    <td style="padding:0px 0px 7px 0px;" bgcolor="#ffffff"></td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="8bf615c1-3087-4199-9d84-e16fd7210583" data-mc-module-version="2019-10-22">
        <tbody>
          <tr>
            <td style="padding:18px 0px 18px 0px; line-height:nullpx; text-align:inherit; background-color:#e9d2d2;" height="100%" valign="top" bgcolor="#e9d2d2" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-family: &quot;trebuchet ms&quot;, helvetica, sans-serif; font-size: 48px; color: #ff0000"><strong>OFFTHEWEB</strong></span></div><div></div></div></td>
          </tr>
        </tbody>
      </table></td>
            </tr>
          </tbody>
        </table></td>
          </tr>
        </tbody>
      </table><table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:50px 5px 0px 5px;" bgcolor="#fff7ea" data-distribution="1">
        <tbody>
          <tr role="module-content">
            <td height="100%" valign="top"><table width="550" style="width:550px; border-spacing:0; border-collapse:collapse; margin:0px 10px 0px 10px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-0">
          <tbody>
            <tr>
              <td style="padding:0px;margin:0px;border-spacing:0;"><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="550f2fb7-70c1-463b-9758-84b6d731ca56">
        <tbody>
          <tr>
            <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
              <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px;" width="162" alt="" data-proportionally-constrained="true" data-responsive="false" src="http://cdn.mcauto-images-production.sendgrid.net/954c252fedab403f/27050768-0978-4ce8-8ad0-fa01a1949374/162x34.png" height="34">
            </td>
          </tr>
        </tbody>
      </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="d8a6da06-629b-4b1f-a750-84744e679927">
        <tbody>
          <tr>
            <td style="padding:0px 0px 20px 0px;" role="module-content" bgcolor="">
            </td>
          </tr>
        </tbody>
      </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="b16a4afb-f245-4156-968e-8080176990ea" data-mc-module-version="2019-10-22">
        <tbody>
          <tr>
            <td style="padding:18px 40px 0px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: inherit"><span style="color: #00634a; font-size: 24px">We received a request to get your &nbsp;password.</span></div><div></div></div></td>
          </tr>
        </tbody>
      </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="b16a4afb-f245-4156-968e-8080176990ea.1" data-mc-module-version="2019-10-22">
        <tbody>
          <tr>
            <td style="padding:18px 40px 10px 0px; line-height:25px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div style="font-family: inherit; text-align: inherit"><span style="color: #00634a"><strong>Protecting your data is important to us.</strong></span></div>
            <div style="font-family: inherit; text-align: inherit"><span style="color: #00634a"><strong>Your Password is:</strong></span></div>
            <div style="font-family: inherit; text-align: center; margin-top: 20px"><span style="color: #635d00; font-size: 24px"><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong></span><span style="color: #00634a; font-size: 24px"><strong>&nbsp;</strong></span></div></td>
          </tr>
        </tbody>
      </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="c97177b8-c172-4c4b-b5bd-7604cde23e3f">
        <tbody>
          <tr>
            <td style="padding:0px 0px 10px 0px;" role="module-content" bgcolor="">
            </td>
          </tr>
        </tbody>
      </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="e4fd0309-df1b-4119-90b4-54e908c2459e" data-mc-module-version="2019-10-22">
        <tbody>
          <tr>
            <td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit; background-color:#0c4819;" height="100%" valign="top" bgcolor="#0c4819" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-family: &quot;trebuchet ms&quot;, helvetica, sans-serif; font-size: 30px; color: #7f8215">${userDetails.password}</span></div><div></div></div></td>
          </tr>
        </tbody>
      </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="b16a4afb-f245-4156-968e-8080176990ea.1.1" data-mc-module-version="2019-10-22">
        <tbody>
          <tr>
            <td style="padding:18px 10px 10px 0px; line-height:18px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: inherit"><span style="color: #00634a">If you did not request a password change, please contact us</span></div>
    <div style="font-family: inherit; text-align: inherit"><span style="color: #00634a">IMMEDIATELY so we can keep your account secure.</span></div>
    <div style="font-family: inherit; text-align: inherit"><span style="color: #00634a"><br>
    </span></div>
    <div style="font-family: inherit; text-align: inherit"><span style="color: #00634a">Contact Us at - <br/> <a href="https://www.offtheweb.in/contact"> https://www.offtheweb.in/contact </a></span></div>
    <div style="font-family: inherit; text-align: inherit"><span style="color: #00634a">or Email at <br/> official.offtheweb@gmail.com</span></div><div></div></div></td>
          </tr>
        </tbody>
      </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="c97177b8-c172-4c4b-b5bd-7604cde23e3f.1.1">
        <tbody>
          <tr>
            <td style="padding:0px 0px 80px 0px;" role="module-content" bgcolor="">
            </td>
          </tr>
        </tbody>
      </table></td>
            </tr>
          </tbody>
        </table></td>
          </tr>
        </tbody>
      </table><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="38ec2680-c847-4765-8c5f-aa2aba19a2b3">
        <tbody>
          <tr>
            <td style="padding:0px 0px 0px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
              <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="7px" style="line-height:7px; font-size:7px;">
                <tbody>
                  <tr>
                    <td style="padding:0px 0px 7px 0px;" bgcolor="#ffffff"></td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="7a8a420f-bc0f-4307-bd09-412a5ff00998.1">
        <tbody>
          <tr>
            <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
              <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;" width="600" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/954c252fedab403f/93a17c3c-cf4b-40a6-9cae-ff0c223945a4/600x56.png">
            </td>
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
            message: "Password has been Sent to Registered Email.",
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
    res.send({ msg: error.message });
  }
});

export default router;
