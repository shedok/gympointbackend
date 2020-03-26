import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
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
    });

    if (!(await scheme.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    try {
      const studentExists = await Student.findOne({
        where: { email: req.body.email },
      });

      if (studentExists) {
        return res.status(400).json({ error: 'Student already exists' });
      }

      const { id, email, name, age, weight, height } = await Student.create(
        req.body
      );

      return res.json({
        id,
        email,
        name,
        age,
        weight,
        height,
      });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  async index(req, res) {
    const students = await Student.findAll({
      attributes: ['id', 'name', 'age', 'weight', 'height', 'email'],
    });

    return res.json(students);
  }

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

    const student = await Student.findByPk(req.userId);

    if (email !== student.email) {
      const studentExists = await Student.findOne({ where: { email } });
      if (studentExists) {
        return res.status(400).json({ error: 'Student already exists.' });
      }
    }

    const { id, name, provider } = await student.update(req.body);

    return res.json({
      id,
      email,
      name,
      provider,
    });
  }
}

export default new StudentController();
