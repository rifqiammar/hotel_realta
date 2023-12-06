const { stock_photo } = require("../../models");

const getPhoto = async (req, res) => {
  try {
    const data = await stock_photo.schema("purchasing").findAll();

    res.status(200).json({
      message: "success",
      data,
    });
  } catch (error) {
    res.status(400).json({
      message: "failed",
      error: error.message,
    });
  }
};

const addPhoto = async (req, res) => {
  try {
    if (req.errorValidateFile) {
      throw new Error(req.errorValidateFile);
    }

    const id = +req.query.id;
    const { spho_primary } = req.body;

    // image name
    const file = req.file;
    const fileName = file.filename;

    const pImg = `${req.protocol}://${req.hostname}:${process.env.PORT}/purchasing/stockphoto/${fileName}`;

    const thumbnailName = file.originalname;

    console.log({ thumbnailName });
    console.log({ fileName });

    // DB Create
    await stock_photo.schema("purchasing").create({
      spho_thumbnail_filename: thumbnailName,
      spho_photo_filename: fileName,
      spho_primary,
      spho_url: pImg,
      spho_stock_id: id,
    });

    // Send response
    res.status(200).json({
      message: "Success",
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed",
      error: error.message,
    });
  }
};

const showPhoto = (req, res) => {
  try {
    const { imgpathname } = req.params;
    res.sendFile(imgpathname, { root: "./public/images/purchase" });
  } catch (error) {
    res.status(400).json({
      message: "Failed",
      error: error.message,
    });
  }
};

const removePhoto = async (req, res) => {
  try {
    const id = +req.query.id;

    await stock_photo.schema("purchasing").destroy({
      where: { spho_id: id },
    });

    res.status(200).json({
      message: `Deleted success.`,
    });
  } catch (error) {
    res.status(400).json({
      message: `Deleted Failed.`,
      error: error.message,
    });
  }
};

module.exports = { getPhoto, addPhoto, removePhoto, showPhoto };
