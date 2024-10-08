import { prisma } from "../index";
import fixture from "./fixture.json";
import type { PrismaPromise, User } from "@prisma/client";

export const user = () => {
  const res: PrismaPromise<User>[] = [];
  fixture.forEach((data) => {
    const row = prisma.user.create({ data });
    res.push(row);
  });
  console.log(res);
  return res;
};
