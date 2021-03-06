import Sequelize from 'sequelize';

import User from '../app/models/User';
import Plan from '../app/models/Plan';
import Student from '../app/models/Student';
import Enrollment from '../app/models/Enrollment';

import databaseConfig from '../config/database';

const models = [User, Plan, Student, Enrollment];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
