import { Database, Resource as TypeOrmResource } from '@adminjs/typeorm';
import { BaseRecord } from 'adminjs';
import { User } from 'src/users/entities/user.entity';

// const { BaseRecord } = require('admin-bro')
// module.exports = { Database, Resource: CustomResource };
// const { Op } = require('sequelize')

export class CustomResource extends TypeOrmResource {
  titleField() {
    return this.decorate().titleProperty().name();
  }

  wrapObjects(objects) {
    return objects.map(
      (sequelizeObject) => new BaseRecord(sequelizeObject.toJSON(), this),
    );
  }

  // async getRoles(record) {
  //   const result = await this.findOne(record.params.id);
  //   console.log(
  //     '🚀 ~ file: admin.resource.ts:22 ~ CustomResource ~ getRoles ~ result',
  //     result,
  //   );
  // }

  async findRelated(record, resource: CustomResource, options = {}) {
    // resource.find(
    //   {
    //     relations: true,
    //   },
    //   {},
    // );
    // const instance = this.getInstance(record);
    // const association = this.getAssociationsByResourceId(resource)[0];
    // return await instance[association.accessors.get](options);
  }

  // getAssociationsByResourceId(resourceId) {
  //   return Object.values(this.SequelizeModel.associations).filter(
  //     (association) => association.target.name === resourceId,
  //   );
  // }

  // getInstance(record) {
  //   return new this.SequelizeModel(record.params, { isNewRecord: false });
  // }

  async saveRecords(record, resourceId, ids) {
    await this.update(record.params.id, {
      [resourceId]: ids.map((id) => ({ id: id.id })),
    });

    // const instance = this.getInstance(record);
    // const association = this.getAssociationsByResourceId(resourceId)[0];
    // await association.set(instance, ids);
  }

  primaryKeyField() {
    return this.id;
  }

  getManyReferences() {
    return this.decorate()
      .getProperties({ where: 'edit' })
      .filter((p: any) => {
        console.log(p.type());
        return p.type() === 'reference';
      })
      .map((p) => p.reference());
  }

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
