import { Request, Response, NextFunction } from 'express';
import path from 'path';
import crypto from 'crypto';

import formidable from 'formidable';

export const tempFolder = path.resolve(__dirname, '..', '..', 'temp');

function upload(
	request: Request,
	response: Response,
	next: NextFunction,
): void {
	const form = new formidable.IncomingForm();

	form.uploadDir = tempFolder;
	form.multiples = false;
	form.keepExtensions = true;

	form.on('fileBegin', (name, file) => {
		if (!file) {
			throw new Error('Missing avatar file');
		}

		const hash = crypto.randomBytes(4).toString('hex');

		const fileName = hash + '-' + file.name;

		file.name = fileName;

		file.path = path.join(tempFolder, fileName);
	});

	form.parse(request, (err, fields, files) => {
		const file = files.avatar;

		if (!file) {
			throw new Error('Missing avatar file');
		}

		request.fileName = file.name;

		next(err);
	});
}

export default upload;
