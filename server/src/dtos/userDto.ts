export type UserDtoType = {
  email: string;
  _id: string;
  isActivated: boolean;
};

export class UserDto {
  email;
  _id;
  isActivated;

  constructor(model: UserDtoType) {
    this.email = model.email;
    this._id = model._id;
    this.isActivated = model.isActivated;
  }
}
