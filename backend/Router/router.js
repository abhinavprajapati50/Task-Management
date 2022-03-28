// const { jwtAuth } = require("../authentication/auth");
// const {
//   manageMenu,
//   allMenu,
//   deleteMenu,
//   updateManu,
//   parent_ChildMenu,
// } = require("../Controller/adminMenu");
// const {
//   adminPages,
//   allPages,
//   deletePage,
//   updatePage,
// } = require("../Controller/adminPages");
// const {
//   manageService,
//   updateService,
//   deleteService,
//   allService,
// } = require("../Controller/adminServices");
const upload = require("../imageuploader");
const { signUpRoute, signin } = require("../Controller/userController");
const { task, AllTask, completedTask, RejectedTask, deletedTask, updateTask, getUpdatedTask } = require("../Controller/task");
const { team, Allteam, singleTeamUser,  } = require("../Controller/Team");
const authExisting = require("../Middleware/authUser");
const { joinTeamTask, scopes, completedTaskApi, joinProjectTask } = require("../JOIN TABLE/join");
const { projects, AllProjects, updateProject } = require("../Controller/projects");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("the home page");
});

// ------USER
router.post("/signup", [authExisting.checkEmail] , signUpRoute);
router.post("/signin", signin);

// --------Projects
router.post("/projects", projects);
router.get("/allprojects", AllProjects);
router.put("/project/edit/:id", updateProject);

// ---------TASK
router.post("/task", task);
router.get("/task", AllTask);
router.put("/task/edit/:id", updateTask);
router.get("/task/edit/:id", getUpdatedTask);
router.put("/task/completed/:id", completedTask);
router.put("/task/deletedtask/:id", deletedTask);
// ------------TEAM
router.post("/team", team);
router.get("/team/:id", singleTeamUser);
router.get("/team", Allteam);

// --------------- JOIN
router.get("/joinTeamTask/:id", joinTeamTask);
router.get("/completedTask", completedTaskApi);
router.get("/joinProject/:id", joinProjectTask);




// -----------------------------MENU

// --(I) Manage Menu
// router.post("/admin/managemenu", manageMenu);
// router.get("/admin/allmenu", allMenu);
// router.put("/admin/allmenu/:id", updateManu);
// router.put("/admin/allmenu/delete/:id", deleteMenu); // NOTE:- update the data like id delete then char_delete flag 1

// // --(II) Manage Pages
// router.post("/admin/allpages", upload.single("image"), adminPages);
// router.get("/admin/allpages", allPages);

// router.put("/admin/allpages/:id", upload.single("image"), updatePage);
// router.put("/admin/allpages/delete/:id", deletePage); // NOTE:- update the data like id delete then char_delete flag 1
// // router.put('/admin/allpages/:id', updatePage)

// // -------(III) Manage Services
// router.post("/admin/allservice", upload.single("imageUrl"), manageService);
// router.get("/admin/allservice", allService);
// router.put("/admin/allservice/:id", upload.single("imageUrl"), updateService);
// router.put("/admin/allservice/delete/:id", deleteService);

// -------(IV) Manage Appontments
// router.post("/admin/appontment" ,createAppointment);
// router.get("/admin/appontment" ,allAppointments);
// router.put("/admin/appontment/aprooved/:id" ,aproovedAppointment);
// router.put("/admin/appontment/reject/:id" ,rejectedAppointment);

module.exports = router;
