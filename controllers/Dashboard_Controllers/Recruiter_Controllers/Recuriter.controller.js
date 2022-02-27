const Recruiter = require('../../../models/Recruiter_Model');
const bcrypt = require('bcrypt');

module.exports = {
  getMyProfile: async (req, res, next) => {
    try {
      const user_id = req.payload.user_id;
      const recruiter = await Recruiter.findById(user_id)
        .select({ name: 1, email: 1, contact: 1, designation: 1, role: 1 })
        .lean()
        .exec();
      res.send(recruiter);
    } catch (err) {
      return next(err);
    }
  },
  updateMyProfile: async (req, res, next) => {
    try {
      const user_id = req.payload.user_id;
      if (!req.body) {
        return res.status(400).send('Body Not Provided');
      }
      const { name, contact, designation } = req.body;
      const data = {};

      data.name = name;
      data.contact = contact;
      data.designation = designation;

      if (req.body.newPassword) {
        const hashedPassword = bcrypt.hash(req.body.newPassword, 10);
        data.password = hashedPassword;
      }
      const recruiter = await Recruiter.findByIdAndUpdate(user_id, data, {
        returnDocument: 'after',
        lean: true,
      })
        .select({ name: 1, contact: 1, designation: 1 })
        .exec();
      res.json({ message: 'Profile Updated Successfully', data: recruiter });
    } catch (err) {
      return next(err);
    }
  },
  getOthersProfile: async (req, res, next) => {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).send('Parameter Not Provided');
      }
      const companyId = req.payload.companyId;

      const recruiter = await Recruiter.findOne({
        _id: id,
        fromCompany: companyId,
      })
        .select({ name: 1, contact: 1, designation: 1, role: 1 })
        .lean()
        .exec();
      res.send(recruiter);
    } catch (err) {
      return next(err);
    }
  },
  updateOthersProfileRole: async (req, res, next) => {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).send('Parameter Not Provided');
      }
      const companyId = req.payload.companyId;
      const user_id = req.payload.user_id;
      if (id === user_id) {
        return res.status(400).send('Action Not Allowed');
      }
      const check = await Recruiter.findById(id).exec();

      if (!req.body.role) {
        return res.status(400).send('Role Not Provided');
      }

      if (check.role === 'admin' && req.body.role === 'admin') {
        return res.status(400).send('Action Not Allowed');
      }
      const recruiter = await Recruiter.findOneAndUpdate(
        {
          _id: id,
          fromCompany: companyId,
        },
        {
          role: req.body.role,
        },
        {
          returnDocument: 'after',
          lean: true,
        }
      )
        .select({ name: 1, email: 1, role: 1 })
        .exec();
      res.json({ message: 'Profile Updated Successfully', data: recruiter });
    } catch (err) {
      return next(err);
    }
  },
  deleteOthersProfile: async (req, res, next) => {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).send('Parameter Not Provided');
      }
      const companyId = req.payload.companyId;

      await Recruiter.deleteOne({
        _id: id,
        fromCompany: companyId,
      });
      res.send('Profile Deleted Successfully');
    } catch (err) {
      return next(err);
    }
  },
};
