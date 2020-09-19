import { Request, Response, NextFunction } from 'express';
import formidable from 'formidable';
import path from 'path';

import AppError from '../../../shared/errors/AppError';

import uploadConfig from '../../../shared/config/upload';

function uploadHandler(
	request: Request,
	response: Response,
	next: NextFunction,
): void {
	const form = new formidable.IncomingForm();

	const { tempFolder, hashGenerator } = uploadConfig;

	form.uploadDir = tempFolder;
	form.multiples = false;
	form.keepExtensions = true;

	form.on('fileBegin', (name, file) => {
		if (!file) {
			throw new AppError('Missing avatar file');
		}

		const hash = hashGenerator();

		const fileName = hash + '-' + file.name;

		file.name = fileName;

		file.path = path.join(tempFolder, fileName);
	});

	form.parse(request, (err, fields, files) => {
		const file = files.avatar;

		if (!file) {
			throw new AppError('Missing avatar file');
		}

		request.fileName = file.name;

		next(err);
	});
}

export default uploadHandler;
