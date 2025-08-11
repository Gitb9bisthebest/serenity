import { hashSync } from "bcrypt";

const sampleData = {
  users: [
    {
      name: "John Doe",
      email: "admin@example.com",
      password: hashSync("password", 10),
      role: "admin",
    },
    {
      name: "Jane Doe",
      email: "guest@example.com",
      password: hashSync("password", 10),
      role: "guest",
    },
  ],
};

export default sampleData;
