import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../../../infra/typeorm/repositories/UsersRepository';

const usersRepository = getCustomRepository(UsersRepository);

// const user = usersRepository.create(); // same as const user = new User();
// user.firstName = 'Timber';
// user.lastName = 'Saw';
// await usersRepository.save(user);

// const timber = await usersRepository.findByName('Timber', 'Saw');
