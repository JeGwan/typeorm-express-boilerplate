import { Entity, Column } from "typeorm";
import { Common } from "./Common";

export enum UserRole {
  admin,
  user,
}

@Entity()
export class User extends Common {
  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.user,
  })
  role!: UserRole;
}
