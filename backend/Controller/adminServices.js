const Manage_Service = require("../Model/manage_services");

exports.manageService = async (req, res) => {
  const { title, short_description, long_description, parent_id, page_slug } = req.body;
  let imageUrl = req.file.filename;

  console.log("req.body in post api ------------->>", req.body);
  console.log("---------images", imageUrl);
  //   console.log("req.file in post api -->>", req.file);
  if (!title || !short_description || !long_description) {
    res.status(500).json({
      status: false,
      message: "Something went wrong!!!.  All Field Required* ",
      data: error || error.message,
    });
  }


  try {
    const result_Serivice = await Manage_Service.create({
      title,
      short_description,
      long_description,
      parent_id,
      imageUrl,
      page_slug:title.replace(/\s/g , "-").toLowerCase()
    });
    // console.log(result_Serivice);
    res.status(200).json({
      status: true,
      message: "Added Service Successfully",
      data: result_Serivice,
    });
  } catch (error) {
    console.log("-----error", error);
    res.status(500).json({
      status: false,
      message: "Something went wrong to Add the Services",
      data: error || error.message,
    });
  }
};


exports.allService = async (req, res, next) => {
    try {
      const allServices = await Manage_Service.findAll({ where: { chr_delete: 0 } });
  
      return res.status(201).json({
        status: true,
        message: "Get ALl Services Fetched Successfully",
        data: allServices,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: false,
        message: "Service could't be fetched",
        data: error,
      });
    }
  };


// title, short_description, long_description,  imageUrl });
exports.updateService = async (req, res) => {
  console.log(req.body);

  const { title, short_description, long_description } = req.body;
  let imageUrl = req.file;
  try {
    if (req.file) {
      console.log("@@@@@@@",req.file.filename);
      const menu_Services_Update = await Manage_Service.update(
        {
          title: title,
          short_description: short_description,
          imageUrl: imageUrl.filename,
          long_description: long_description,
        },
        { where: { id: req.params.id } }
        );
        
        res.status(200).json({
          status: true,
          message: "Service Successfully updated",
          data: { title, short_description, long_description, imageUrl },
        });
    } else {
      console.log("------######",req.file);
      const menu_Services_Update = await Manage_Service.update(
        {
          title: title,
          short_description: short_description,
          long_description: long_description,
        },
        { where: { id: req.params.id } }
        );
        console.log("VALUE UPDATE----", menu_Services_Update);
        // let resMessage = "Successfully updated.";
        
        res.status(200).json({
          status: true,
          message: "Service Successfully updated",
          data: { title, short_description, long_description, imageUrl },
        });
      }
    // return  result;
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: false, message: " Page is not  Updated", data: error });
  }
};

exports.deleteService = async (req, res, next) => {
  try {
    let id = req.params.id;
    const deleteService = await Manage_Service.update(
      { chr_delete: 1 },
      { where: { id: id } }
    );

    return res.status(200).json({
      status: true,
      message: " Service Deleted successfully ",
      data: deleteService,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: " Service shouldn't be  delete ",
      data: error,
    });
  }
};
