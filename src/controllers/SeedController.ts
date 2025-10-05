import { Request, Response } from 'express';
import { User } from '../models/User';
import { Issue } from '../models/Issue';
import bcrypt from 'bcrypt';
import { descriptionIssues, titleIssues } from '../utils/constants';


export class SeedController {
  static seedDatabase = async (req: Request, res: Response) => {
    try {
      const { fakerES_MX: faker } = await import('@faker-js/faker');
  
      // clean database
      await Promise.all([
        User.deleteMany({}),
        Issue.deleteMany({})
      ]);
  
      const users = [];
      const testUser1 = {
        name: 'Usuario Prueba a',
        email: 'usuario.prueba_a@mail.com',
        password: 'password123'
      }
      const testUser2 = {
        name: 'Usuario Prueba b',
        email: 'usuario.prueba_b@mail.com',
        password: 'password_abc'
      }
      const testUser3 = {
        name: 'Usuario Prueba c',
        email: 'usuario.prueba_c@mail.com',
        password: 'password.$&'
      }
  
      // invariable test users
      const testUsers = [testUser1, testUser2, testUser3];
      for (let k = 0; k < 3; k++) {
        const { name, email, password } = testUsers[k];
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
          name,
          email,
          password: hashedPassword,
          refreshTokens: []
        });
        users.push(user);
      }
      
      // complementary variable users
      for (let i = 0; i < 10; i++) {
        const hashedPassword = await bcrypt.hash('password123', 10);
        const user = new User({
          name: faker.person.fullName(),
          email: faker.internet.email().toLowerCase(),
          password: hashedPassword,
          refreshTokens: []
        });
        users.push(user);
      }
  
      const savedUsers = await User.insertMany(users);
  
      const issues = [];
      const states = ['open', 'in_progress', 'closed'];
      const priorities = ['low', 'medium', 'hight'];
  
      for (let i = 0; i < 100; i++) {
        const randomAuthor = faker.helpers.arrayElement(savedUsers);
        const randomAssignee = faker.helpers.arrayElement(savedUsers);
        const randomState = faker.helpers.arrayElement(states);
        const randomPriority = faker.helpers.arrayElement(priorities);
        const randomTitle = faker.helpers.arrayElement(titleIssues);
        const randomDescription = faker.helpers.arrayElement(descriptionIssues);
  
        const issue = new Issue({
          title: randomTitle,
          description: randomDescription,
          author: randomAuthor._id,
          userAssigned: randomAssignee._id,
          state: randomState,
          priority: randomPriority
        });
  
        issues.push(issue);
      }
  
      const savedIssues = await Issue.insertMany(issues);
  
      // Actualizar usuarios con issues asignados
      for (const issue of savedIssues) {
        await User.findByIdAndUpdate(issue.userAssigned, {
          $push: { assignedIssues: issue._id }
        });
      }
  
      res.status(201).json({
        message: 'Base de datos reseteada y poblada correctamente',
        usersCount: savedUsers.length,
        issuesCount: savedIssues.length
      });
    } catch (error: any) {
      console.error('Error al hacer seed:', error);
      res.status(500).json({ message: 'Error al hacer seed', error: error.message });
    }
  };
}
