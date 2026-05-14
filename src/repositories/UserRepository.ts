import { AppDataSource } from "../config/database";
import { User } from "../models/User";

export const UserRepository = AppDataSource.getRepository(User).extend({
  async findByUsername(username: string) {
    return this.findOneBy({ username });
  },
});
