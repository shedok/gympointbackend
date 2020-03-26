import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async store(req, res) {
    const scheme = Yup.object().shape({
      name: Yup.string().required(),
      duration: Yup.number()
        .integer()
        .required(),
      price: Yup.number().required(),
    });

    if (!(await scheme.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    try {
      const planExists = await Plan.findOne({
        where: { name: req.body.name },
      });

      if (planExists) {
        return res.status(400).json({ error: 'Plan already exists' });
      }

      const { id, name, duration, price } = await Plan.create(req.body);

      return res.json({
        id,
        name,
        duration,
        price,
      });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  async index(req, res) {
    const plans = await Plan.findAll({
      attributes: ['id', 'name', 'duration', 'price'],
    });

    return res.json(plans);
  }

  async update(req, res) {
    const scheme = Yup.object().shape({
      name: Yup.string(),
      duration: Yup.number().integer(),
      price: Yup.number().integer(),
    });

    if (!(await scheme.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const plan = await Plan.findByPk(req.planId);

    const { id, name, duration, price } = await plan.update(req.body);

    return res.json({
      id,
      name,
      duration,
      price,
    });
  }
}

export default new PlanController();
