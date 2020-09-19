import path from 'path';
import crypto from 'crypto';

const tempFolder = path.resolve(__dirname, '..', '..', '..', 'temp');

export default {
	tempFolder,

	uploadsFolder: path.resolve(tempFolder, 'uploads'),

	hashGenerator(): string {
		return crypto.randomBytes(4).toString('hex');
	},
};
