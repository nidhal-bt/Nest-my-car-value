import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('insert user with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('update user with id', this.id);
  }

  @AfterRemove()
  logRemove() {}
}
