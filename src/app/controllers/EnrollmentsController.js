import * as Yup from 'yup';
import Enrollment from '../models/Enrollment';

class EnrollmentsController {
  async store(req, res) {
    const scheme = Yup.object().shape({
      start_date: Yup.date().required(),
      plan_id: Yup.number()
        .integer()
        .required(),
      student_id: Yup.number()
        .integer()
        .required(),
    });

    if (!(await scheme.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const enrollment = await Enrollment.create(req.body);

    return res.json(enrollment);
  }

  async index(req, res) {
    const enrollment = await Enrollment.findAll({
      attributes: ['id', 'student_id', 'start_date', 'plan_id'],
    });

    return res.json(enrollment);
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

export default new EnrollmentsController();
