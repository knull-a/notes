export type UserDtoType = {
  email: string
  _id: string
  isActivated: boolean
}

export class UserDto {
  constructor(private model: UserDtoType) {}

  get email(): string {
    return this.model.email;
  }

  get _id(): string {
    return this.model._id;
  }

  get isActivated(): boolean {
    return this.model.isActivated;
  }
}
