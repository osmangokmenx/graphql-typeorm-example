import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql';
import { db } from '../data-source';
import { User } from '../entity/User';

@Resolver()
export class UserResolver {
  userRepo = db.getRepository(User);
  @Query(() => String)
  hello(): string {
    return 'hello world';
  }

  // Get all users
  @Query(() => [User])
  users(): Promise<User[]> {
    return this.userRepo.find();
  }

  // Get user by id
  @Query(() => User, { nullable: true })
  user(
    @Arg('id', () => Int)
    id: number
  ): Promise<User | undefined> {
    return this.userRepo.findOne({ where: { id } });
  }

  @Mutation(() => User)
  createUser(
    @Arg('firstName', () => String)
    firstName: string,
    @Arg('lastName', () => String)
    lastName: string,
    @Arg('age', () => Number)
    age: number
  ): Promise<User> {
    console.log(`first: ${firstName}, last: ${lastName}, age: ${age}`);
    const newUser = new User();
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.age = age;
    return this.userRepo.manager.save(newUser);
  }

  @Mutation(() => Boolean)
  deleteUser(
    @Arg('id', () => Int)
    id: number
  ): boolean {
    try {
      db.createQueryBuilder()
        .delete()
        .from(User)
        .where('id = :id', { id })
        .execute();
      return true;
    } catch {
      return false;
    }
  }

  @Mutation(() => Boolean, { nullable: true })
  async updateUser(
    @Arg('id', () => Int)
    id: number,
    @Arg('firstName', () => String)
    firstName: string,
    @Arg('lastName', () => String)
    lastName: string,
    @Arg('age', () => Number)
    age: number
  ): Promise<boolean | null> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      return null;
    }

    try {
      user.firstName = firstName;
      user.lastName = lastName;
      user.age = age;
      this.userRepo.manager.save(user);
      return true;
    } catch {
      return false;
    }
  }
}
