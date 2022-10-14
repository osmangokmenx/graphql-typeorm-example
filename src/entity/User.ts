import { Field, ObjectType, Int } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String)
  firstName: string;

  @Column()
  @Field(() => String)
  lastName: string;

  @Column()
  @Field(() => Int)
  age: number;
}
