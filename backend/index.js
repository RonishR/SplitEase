const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { User, Group } = require("./db");
const app = express();

app.use(express.json());

app.post("/createGroup", async (req, res) => {
  const { groupName, userName } = req.body;
  if (!groupName || !userName) {
    return res
      .status(400)
      .json({ message: "Group name and user name are required" });
  }
  try {
    const groupID = uuidv4();
    const adminUser = new User({
      name: userName,
    });

    await adminUser.save();

    const newGroup = new Group({
      groupID: groupID,
      groupName: groupName,
      createdBy: adminUser._id,
    });

    await newGroup.save();

    res.status(201).json({
      message: "Group created successfully",
      groupId: newGroup.groupID,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating group", error: error.message });
  }
});

app.get("/group/:id", async (req, res) => {});
