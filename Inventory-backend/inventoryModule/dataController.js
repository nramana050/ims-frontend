const inventoryModel = require("./schema");

exports.createInventory = async (req, res, next) => {
  try {
    const newItemData = req.body;
    const newBatchesData = newItemData.batch;
    delete newItemData.batch;

    const newItem = new inventoryModel(newItemData);
    if (req.file) {
      newItem.file = req.file.filename;
    }
    await newItem.save();

    // Save batches data
    const newItemId = newItem._id;
    await inventoryModel.findByIdAndUpdate(
      newItemId,
      { $push: { batch: newBatchesData } },
      { new: true }
    );

    res.status(201).json({ message: "Item created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getInventory = async (req, res) => {
  await inventoryModel
    .find({})
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
};

exports.getListItem = async (req, res) => {
  await inventoryModel
    .findOne({ _id: req.params.id })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
};

exports.deleteListItem = async (req, res) => {
  await inventoryModel
    .deleteOne({ _id: req.params.id })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
};

exports.updateItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const updateData = req.body;

    if (req.file) {
      updateData.file = req.file.filename;
    }

    const updatedItem = await inventoryModel.findByIdAndUpdate(
      itemId,
      updateData,
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json({ message: "Item updated successfully", updatedItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
