import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const scheme = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .integer()
        .required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await scheme.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    try {
      const userExists = await User.findOne({
        where: { email: req.body.email },
      });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const {
        id,
        email,
        name,
        provider,
        age,
        weight,
        height,
      } = await User.create(req.body);

      return res.json({
        id,
        email,
        name,
        age,
        weight,
        height,
        provider,
      });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async update(req, res) {
    const scheme = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number().integer(),
      height: Yup.number(),
      weight: Yup.number(),
    });

    if (!(await scheme.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    const { id, name, provider } = await user.update(req.body);

    return res.json({
      id,
      email,
      name,
      provider,
    });
  }
}

export default new UserController();
