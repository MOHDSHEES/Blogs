import express from "express";
import Blogs from "../models/blogModel.js";
import UBlogs from "../models/uBlogModel.js";
import HomepageData from "../models/homepageDataModel.js";
import Users from "../models/userModel.js";
import Employees from "../models/employeeModel.js";
import Categories from "../models/categoryModels.js";
import { customAlphabet } from "nanoid";
import sgMail from "@sendgrid/mail";
import {
  getToken,
  getEmployeeToken,
  verifyEmployeeToken,
  verifyToken,
  getPasswordToken,
  verifyPasswordToken,
} from "../jwt.js";
import {
  contactForm,
  forgetEmployeePassword,
  forgetPassword,
  registerEmployee,
  sendotp,
} from "./emailTemplates.js";

const router = express.Router();

// update employee by admin
router.post("/update/employees/admin", async (req, res) => {
  try {
    const employee = await Employees.findOneAndUpdate(
      { _id: req.body.id },
      req.body.data,
      { new: true }
    );
    res.json(employee);
    // if (newUser._id) {
    //   res.json({ status: 200, msg: "Successfully Registered" });
    // } else
    //   res.json({ status: 500, msg: "Something went wrong try again later." });
    // // res.json(user);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

//  update task by admin
router.post("/update/task/employee", async (req, res) => {
  try {
    // console.log(res.locals.data._id);
    // let date = new Date().toJSON().slice(0, 10);
    // console.log(req.body.taskNo);
    const resu = await Employees.findOneAndUpdate(
      { email: req.body.email, "tasks.taskNo": req.body.taskNo },
      { $set: { "tasks.$.task": req.body.newTask } },
      {
        new: true,
      }
    );
    // console.log(resu);
    if (resu)
      res.json({
        status: 200,
        msg: "Task updated successfully",
        data: resu,
      });
    else
      res.json({ status: 500, msg: "Something went wrong, Try again later" });
    // console.log(user);
    // let trending = resu.map((a) => a.title);
    // console.log(resu);
  } catch (error) {
    // console.log(error);
    res.send({ status: 500, msg: error.message });
  }
});

//  assigning task by admin
router.post("/assign/task/employee", async (req, res) => {
  try {
    // console.log(res.locals.data._id);
    let date = new Date().toJSON().slice(0, 10);
    // console.log(date);
    const resu = await Employees.findOneAndUpdate(
      {
        email: req.body.email,
      },
      {
        $push: {
          tasks: {
            $each: [
              {
                task: req.body.task,
                assignDate: date,
                taskNo: req.body.taskNo,
                status: 0,
              },
            ],
            $position: 0,
          },
        },
      },
      {
        new: true,
      }
    );
    // console.log(resu);
    if (resu)
      res.json({
        status: 200,
        msg: "Task assigned successfully",
        data: resu,
      });
    else
      res.json({ status: 500, msg: "Something went wrong, Try again later" });
    // console.log(user);
    // let trending = resu.map((a) => a.title);
    // console.log(resu);
  } catch (error) {
    // console.log(error);
    res.send({ status: 500, msg: error.message });
  }
});

//  updating task score
router.post("/update/task/score", async (req, res) => {
  try {
    const score = req.body.score;
    const taskNo = req.body.taskNo;
    // console.log(req.body.status);
    // console.log(req.body.taskNo);
    // console.log(res.locals.data._id);
    // let date = new Date().toJSON().slice(0, 10);
    // console.log(date);
    const resu = await Employees.findOneAndUpdate(
      {
        email: req.body.email,
        "tasks.taskNo": taskNo,
      },
      {
        $set: {
          "tasks.$.score": score,
        },
      },
      {
        new: true,
      }
    );
    // console.log(resu);
    if (resu)
      res.json({
        status: 200,
        data: resu,
        msg: "Successfully updated",
      });
    else
      res.json({ status: 500, msg: "Something went wrong, Try again later" });
    // console.log(user);
    // let trending = resu.map((a) => a.title);
    // console.log(resu);
  } catch (error) {
    // console.log(error);
    res.send({ status: 500, msg: error.message });
  }
});
//  updating task status
router.post("/update/task/status", async (req, res) => {
  try {
    const status = req.body.status;
    const taskNo = req.body.taskNo;
    // console.log(req.body.status);
    // console.log(req.body.taskNo);
    // console.log(res.locals.data._id);
    // let date = new Date().toJSON().slice(0, 10);
    // console.log(date);
    const resu = await Employees.updateOne(
      {
        email: req.body.email,
        "tasks.taskNo": taskNo,
      },
      {
        $set: {
          "tasks.$.status": status,
        },
      }
    );
    // console.log(resu);
    if (resu.acknowledged && resu.modifiedCount)
      res.json({
        status: 200,
        msg: "Successfully updated",
      });
    else
      res.json({ status: 500, msg: "Something went wrong, Try again later" });
    // console.log(user);
    // let trending = resu.map((a) => a.title);
    // console.log(resu);
  } catch (error) {
    // console.log(error);
    res.send({ status: 500, msg: error.message });
  }
});
// get all Employee
router.post("/find/employees", async (req, res) => {
  try {
    const employee = await Employees.find({});

    res.json(employee);
    // if (newUser._id) {
    //   res.json({ status: 200, msg: "Successfully Registered" });
    // } else
    //   res.json({ status: 500, msg: "Something went wrong try again later." });
    // // res.json(user);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

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

// employee login
router.post("/find/employee", async (req, res) => {
  try {
    // console.log(req.body.email);
    const user1 = await Employees.findOne(
      {
        email: req.body.email,
        password: req.body.password,
      },
      { password: 0 }
    );
    // let trending = resu.map((a) => a.title);
    // console.log(resu);
    if (user1) {
      const token = getToken({ _id: user1.employeeId, email: user1.email });
      res.json({ user: user1, token: token });
    } else res.send({ msg: "Incorrect Email or Password" });
  } catch (error) {
    // console.log(error);
    res.send({ msg: error.message });
  }
});

// authenticate employee
router.post("/authenticate/employee", verifyToken, async (req, res) => {
  try {
    // console.log(res.locals.data._id);
    const user = await Employees.findOne(
      {
        email: res.locals.data.email,
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

// update employee details

router.post("/update/employee", verifyToken, async (req, res) => {
  try {
    // console.log(res.locals.data._id);
    const resu = await Employees.updateOne(
      {
        email: res.locals.data.email,
      },
      req.body.data
    );
    // console.log(resu);
    if (resu.acknowledged && resu.modifiedCount)
      res.json({
        status: 200,
        msg: "Updated Successfully",
        details: req.body.data,
      });
    else if (resu.acknowledged && !resu.modifiedCount)
      res.json({ status: 200, msg: "Already Updated" });
    else
      res.json({ status: 500, msg: "Something went wrong, Try again later" });
    // console.log(user);
    // let trending = resu.map((a) => a.title);
    // console.log(resu);
  } catch (error) {
    // console.log(error);
    res.send({ status: 500, msg: error.message });
  }
});

// update employee Password
router.post("/update/employee/password", verifyToken, async (req, res) => {
  try {
    // console.log(res.locals.data._id);
    const found = await Employees.findOne({
      email: res.locals.data.email,
      password: req.body.oldPassword,
    });
    // console.log(found);
    // console.log(req.body.oldPassword);
    // console.log(req.body.newPassword);
    if (found) {
      const updated = await Employees.updateOne(
        {
          email: res.locals.data.email,
        },
        { password: req.body.newPassword }
      );
      // console.log(updated);
      if (updated.acknowledged)
        res.json({ status: 200, msg: "Password changed successfully." });
      else
        res.json({ statue: 500, msg: "Something went wrong. Try again later" });
    } else res.json({ status: 404, msg: "Old Password is Incorrect." });
  } catch (error) {
    // console.log(error);
    res.send({ status: 500, msg: error.message });
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
        _id: res.locals.data._id,
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

// all blogs for particular user for new editor
router.post("/find/ublog/all", verifyToken, async (req, res) => {
  try {
    // console.log(res.locals.id);
    const user = await Users.findOne(
      {
        _id: res.locals.data._id,
      },
      { password: 0 }
    );
    // console.log(user.blog);
    if (user.isAdmin) {
      const resu = await UBlogs.find({});
      res.json({ blogs: resu, user: user });
    } else {
      const resu = await UBlogs.find({ id: { $in: user.blog } });
      res.json({ blogs: resu, user: user });
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
        _id: res.locals.data._id,
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
    // console.log(error);
    res.send({ msg: error.message });
  }
});
// find ublogs with status
router.post("/find/ublog/status", async (req, res) => {
  try {
    const resu = await UBlogs.find({ status: req.body.status });
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

// update ublogs isActive
router.post("/update/ublog/status", verifyToken, async (req, res) => {
  try {
    const resu = await UBlogs.updateMany(
      { _id: { $in: req.body.id } },
      { status: req.body.status }
    );

    if (resu.modifiedCount && resu.modifiedCount) {
      if (req.body.status === "Active") {
        // adding blog to homepage recent
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
        var querry = "categoryData." + req.body.blog.category + "_id";
        var quer = "categoryData." + req.body.blog.category;
        // adding blog to homepage category
        const s = await HomepageData.updateOne(
          {
            _id: "647a21933a89a8239f770931",
            [querry]: { $nin: req.body.id },
          },
          {
            $push: {
              [quer]: {
                $each: [req.body.blog],
                $position: 0,
                $slice: 6,
              },
            },
          }
        );
        // console.log(s);
      }

      res.json({ status: 200, msg: "Activated Sucessfully" });
    } else {
      res.json({ status: 500, msg: "something went wrong" });
    }
  } catch (error) {
    // console.log(error);
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
        // adding blog to homepage recent
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
        var querry = "categoryData." + req.body.blog.category + "_id";
        var quer = "categoryData." + req.body.blog.category;
        // adding blog to homepage category
        const s = await HomepageData.updateOne(
          {
            _id: "647a21933a89a8239f770931",
            [querry]: { $nin: req.body.id },
          },
          {
            $push: {
              [quer]: {
                $each: [req.body.blog],
                $position: 0,
                $slice: 6,
              },
            },
          }
        );
        // console.log(s);
      }

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

// creating new blogs from editor
router.post("/add/new/blog", async (req, res) => {
  try {
    // let nanoid = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 10);
    // const id = req.body.metaData.id ? req.body.metaData.id : nanoid();
    const date =
      new Date().toLocaleString("en-US", { weekday: "long" }) +
      ", " +
      new Date().toLocaleString("en-US", { month: "long" }) +
      ", " +
      new Date().getDate() +
      ", " +
      new Date().getFullYear();

    const blog = new UBlogs({
      // id: id,
      title: req.body.metaData.title,
      mainImg: req.body.metaData.mainImg,
      description: req.body.metaData.description,
      keywords: req.body.metaData.keywords,
      category: req.body.metaData.category,
      blog: req.body.blog,
      views: 0,
      createdDate: date,
      activationRequest: req.body.activationRequest || false,
      user: req.body.user,
    });
    const status = await blog.save();
    // console.log(status._id);
    const response = await Users.updateOne(
      {
        _id: req.body.user,
      },
      { $addToSet: { blog: status.id } }
    );
    res.json({ status: 1, msg: "Blog saved successfully.", data: status });
  } catch (error) {
    console.log(error);
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
router.post("/blog/updated/titles", async (req, res) => {
  try {
    const resu = await UBlogs.find({}).select({ title: 1, id: 0 });
    let titles = resu.map((a) => a.title);
    res.json(titles);
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
router.post("/find/updated/blog", async (req, res) => {
  try {
    const blog = await UBlogs.find({
      title: req.body.title,
    }).collation({
      locale: "en",
      strength: 2,
    });
    res.json(blog);
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
      { $inc: { views: 1 } },
      { new: true }
    );
    // console.log(blog);
    res.json(blog);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

// find blog for new editor
router.post("/find/blog/new/id", async (req, res) => {
  try {
    const blog = await UBlogs.findOneAndUpdate({}, { new: true });
    // console.log(blog);
    res.json(blog);
  } catch (error) {
    res.send({ msg: error.message });
  }
});
// delete blog with id
router.post("/delete/blog", async (req, res) => {
  try {
    // console.log(req.body.category);
    const stat = await Blogs.deleteOne({ _id: req.body.id });
    // console.log(stat);
    const address = await Users.updateOne(
      { _id: req.body.user },
      { $pull: { blog: req.body.id } }
    );

    // console.log(stat);
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
      const query = "categoryData." + req.body.category;
      const s = await HomepageData.updateOne(
        {
          _id: "647a21933a89a8239f770931",
        },
        {
          $pull: {
            [query]: {
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

//  Update new editor blog
router.post("/update/new/blog", async (req, res) => {
  // console.log(req.body.metaData.description);
  // console.log(req.body.id);
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
    const updated = await UBlogs.findOneAndUpdate(
      { id: req.body.id },
      {
        title: req.body.metaData.title,
        mainImg: req.body.metaData.mainImg,
        description: req.body.metaData.description,
        category: req.body.metaData.category,
        keywords: req.body.metaData.keywords,
        blog: req.body.blog,
        updatedDate: date,
        activationRequest: req.body.activationRequest || false,
        status: "Inactive",
      },
      {
        new: true,
      }
    );
    // console.log(updated);

    // pull blog from homepage recent
    const st = await HomepageData.updateOne(
      {
        _id: "647a21933a89a8239f770931",
      },
      {
        $pull: {
          recent: {
            id: req.body.id,
          },
        },
      }
    );

    const query = "categoryData." + req.body.metaData.category;
    // pull blog from homepage category
    const s = await HomepageData.updateOne(
      {
        _id: "647a21933a89a8239f770931",
      },
      {
        $pull: {
          [query]: {
            id: req.body.id,
          },
        },
      }
    );
    // console.log(s);
    if (updated) {
      // console.log("in");
      res.json({ status: 1, msg: "Blog sucessfully updated.", data: updated });
    } else {
      // console.log("in2");
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

    // pull blog from homepage recent
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

    const query = "categoryData." + req.body.category;
    // pull blog from homepage category
    const s = await HomepageData.updateOne(
      {
        _id: "647a21933a89a8239f770931",
      },
      {
        $pull: {
          [query]: {
            _id: req.body.id,
          },
        },
      }
    );
    // console.log(s);
    if (updated) {
      // console.log("in");
      res.json({ status: 1, msg: "Blog sucessfully updated.", data: updated });
    } else {
      // console.log("in2");
      res.json({ status: 0, msg: "Something went Wrong" });
    }
  } catch (error) {
    // console.log(error);
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
// verify token and change password token
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
      if (update.acknowledged) {
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

// verify token change employee password token
router.post(
  "/forget/employee/password",
  verifyPasswordToken,
  async (req, res) => {
    try {
      const email = res.locals.email;
      // console.log(email);
      if (email) {
        const update = await Employees.updateOne(
          { email: email },
          { password: req.body.password }
        );
        // console.log(update);
        if (update.acknowledged) {
          res.json({ status: 200, msg: "Password reset sucessfully" });
        }
      } else {
        res.json({ status: 500, msg: "Something went wrong, try again later" });
      }
    } catch (error) {
      // console.log(error);
      res.send({ status: 500, msg: error.message });
    }
  }
);

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
      // console.log(error);
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
    from: "official.offtheweb@gmail.com", // Change to your verified sender
    subject: "Register",
    html: registerEmployee(data, token),
  };
  sgMail
    .send(msg)
    .then(() => {
      res.send({
        success: true,
        message:
          "Registration Email has been sent to the Employee/Intern succesfully",
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

// email contact form
router.post("/contact/sendemail", async (req, res) => {
  const data = req.body.State;
  // console.log(data);
  // const userId = req.body.userId;

  // contact us email
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: "mohd.shees101@gmail.com", // Change to your recipient
    from: "official.offtheweb@gmail.com", // Change to your verified sender
    subject: data.subject,
    html: contactForm(data),
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
        from: "official.offtheweb@gmail.com", // Change to your verified sender
        subject: "OFFTHEWEB PASSWORD",
        html: forgetPassword(token),
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
          // console.log(error);
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

router.post("/forgetPassword/employee", async (req, res) => {
  try {
    const email = req.body.email;
    const token = getPasswordToken(email);

    // console.log("in");
    const userDetails = await Employees.findOne(
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
        from: "official.offtheweb@gmail.com", // Change to your verified sender
        subject: "OFFTHEWEB PASSWORD",
        html: forgetEmployeePassword(token),
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
          // console.log(error);
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

//  email verification OTP
router.post("/emailotp", async (req, res) => {
  try {
    const OTP = req.body.otp;
    const email = req.body.email;

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email, // Change to your recipient
      from: "official.offtheweb@gmail.com", // Change to your verified sender
      subject: "OTP for Email verification ",
      html: sendotp(OTP, email),
    };
    sgMail
      .send(msg)
      .then(() => {
        res.send({
          success: true,
          message: "OTP has been sent to the Email",
        });
      })
      .catch((error) => {
        // console.log(error);
        res.status(500).send({
          success: false,
          message: "Something went wrong. Try again later",
        });
      });

    // userDetails
    //   ? res.send(userDetails._doc)
    //   : res.status(401).send({ msg: "Incorrect Mobile No. or Email" });
  } catch (error) {
    // console.log(error);
    res.send({ msg: error.message });
  }
});

export default router;
