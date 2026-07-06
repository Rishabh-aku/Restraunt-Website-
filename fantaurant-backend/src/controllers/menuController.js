const Menu = require('../models/Menu');

const getMenuItems = async (req, res) => {
  try {
    const items = await Menu.find({});
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMenuItem = async (req, res) => {
  try {
    const { name, description, price, category, isAvailable } = req.body;
    let imageURL = '';
    
    if (req.file) {
      imageURL = `/uploads/${req.file.filename}`;
    }

    const menuItem = new Menu({
      name,
      description,
      price,
      category,
      imageURL,
      isAvailable
    });

    const createdItem = await menuItem.save();
    res.status(201).json(createdItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateMenuItem = async (req, res) => {
  try {
    const item = await Menu.findById(req.params.id);
    if (item) {
      item.name = req.body.name || item.name;
      item.description = req.body.description || item.description;
      item.price = req.body.price || item.price;
      item.category = req.body.category || item.category;
      item.isAvailable = req.body.isAvailable !== undefined ? req.body.isAvailable : item.isAvailable;
      
      if (req.file) {
        item.imageURL = `/uploads/${req.file.filename}`;
      }

      const updatedItem = await item.save();
      res.json(updatedItem);
    } else {
      res.status(404).json({ message: 'Menu item not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteMenuItem = async (req, res) => {
  try {
    const item = await Menu.findById(req.params.id);
    if (item) {
      await item.deleteOne();
      res.json({ message: 'Menu item removed' });
    } else {
      res.status(404).json({ message: 'Menu item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem };
