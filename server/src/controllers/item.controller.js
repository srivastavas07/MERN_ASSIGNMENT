const Item = require('../models/item.model');

const allowedSortFields = ['title', 'createdAt'];

const parseSort = (sortQuery) => {
  if (!sortQuery) return { createdAt: -1 };

  const [field, order] = sortQuery.split(':');
  if (!allowedSortFields.includes(field)) {
    return { createdAt: -1 };
  }

  return {
    [field]: order === 'asc' ? 1 : -1,
  };
};

exports.listItems = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit, 10) || 5, 1);
    const skip = (page - 1) * limit;
    const sort = parseSort(req.query.sort);
    const search = req.query.search?.trim();

    // Build search filter
    const filter = {};
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const [items, total] = await Promise.all([
      Item.find(filter).sort(sort).skip(skip).limit(limit),
      Item.countDocuments(filter),
    ]);

    res.json({
      data: items,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 1,
    });
  } catch (error) {
    next(error);
  }
};

exports.getItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    next(error);
  }
};

exports.createItem = async (req, res, next) => {
  try {
    const { title, description, isActive } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const item = await Item.create({
      title: title.trim(),
      description,
      isActive,
    });

    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};

exports.updateItem = async (req, res, next) => {
  try {
    const { title, description, isActive } = req.body;
    const payload = {};

    if (title !== undefined) payload.title = title.trim();
    if (description !== undefined) payload.description = description;
    if (isActive !== undefined) payload.isActive = isActive;

    const item = await Item.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(item);
  } catch (error) {
    next(error);
  }
};

exports.deleteItem = async (req, res, next) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json({ message: 'Item deleted' });
  } catch (error) {
    next(error);
  }
};

