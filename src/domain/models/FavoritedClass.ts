import { uuid } from 'uuidv4';

class FavoritedClass {
	id: string;
	user_id: string;
	class_id: string;

	constructor({ user_id, class_id }: Omit<FavoritedClass, 'id'>) {
		this.id = uuid();
		this.user_id = user_id;
		this.class_id = class_id;
	}
}

export default FavoritedClass;
