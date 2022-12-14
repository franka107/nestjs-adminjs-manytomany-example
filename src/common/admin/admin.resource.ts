import { Database, Resource as TypeOrmResource } from '@adminjs/typeorm';
import { BaseRecord } from 'adminjs';

// const { BaseRecord } = require('admin-bro')
// module.exports = { Database, Resource: CustomResource };
// const { Op } = require('sequelize')

export class CustomResource extends TypeOrmResource {
  // titleField() {
  //   return this.decorate().titleProperty().name();
  // }

  // wrapObjects(sequelizeObjects) {
  //   return sequelizeObjects.map(
  //     (sequelizeObject) => new BaseRecord(sequelizeObject.toJSON(), this),
  //   );
  // }

  // async findRelated(record, toResourceId, options = {}) {
  //   const instance = this.getInstance(record);

  //   const association = this.getAssociationsByResourceId(toResourceId)[0];
  //   return await instance[association.accessors.get](options);
  // }

  // getAssociationsByResourceId(resourceId) {
  //   return Object.values(this.SequelizeModel.associations).filter(
  //     (association) => association.target.name === resourceId,
  //   );
  // }

  // getInstance(record) {
  //   return new this.SequelizeModel(record.params, { isNewRecord: false });
  // }

  // async saveRecords(record, resourceId, ids) {
  //   const instance = this.getInstance(record);
  //   const association = this.getAssociationsByResourceId(resourceId)[0];
  //   await association.set(instance, ids);
  // }

  // primaryKeyField() {
  //   return this.SequelizeModel.primaryKeyField;
  // }

  getManyProperties() {
    return this.decorate()
      .getProperties({ where: 'edit' })
      .filter((p: any) => {
        console.log(p.type());
        return p.type() === 'reference';
      })
      .map((p) => p.name());
  }
}
