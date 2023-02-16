import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123', 9),
        isAdmin: true,
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: bcrypt.hashSync('123', 9),
      },
      {
        name: 'Jane Doe',
        email: 'Jane@example.com',
        password: bcrypt.hashSync('123', 9),
      },
]

export default users