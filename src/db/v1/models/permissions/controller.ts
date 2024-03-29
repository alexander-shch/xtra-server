import RoleModel, { IRole } from './model';

export async function CreateRole(role: IRole) {
  const roleModel = new RoleModel(role);
  return roleModel.save().then((role) => role.toObject());
}

export async function FindRole(query = {}) {
  return RoleModel.findOne(query).then((role) => role?.toObject());
}

export async function FindRoles(query: Partial<IRole> = {}) {
  return RoleModel.find(query);
}

export async function RoleUpdateOne(_id: string, doc: Partial<IRole>) {
  return RoleModel.findByIdAndUpdate(
    _id,
    {
      $set: doc,
    },
    {
      new: true,
    }
  );
}
