///<reference types="gulp-typedoc"/>

import {Module, Target} from "gulp-typescript-helper";
import * as PATH from "./constants/Paths";
import * as TASK from "./constants/TaskNames";
import * as gulp from "gulp";
const typedoc = require("gulp-typedoc");

gulp.task(
	TASK.TYPEDOC, ()=>
	{
		const typedocOptions = {
			name: 'TypeScript.NET',
			out: PATH.DOCS,
			//tscPath: PATH.TSC,

			module: Module.UMD,
			target: Target.ES5,

			excludeNotExported: true,
			includeDeclarations: true,
			ignoreCompilerErrors: false,
			version: true
		};

		console.log('Building TypeDocs...');
		return gulp
			.src(PATH.SOURCE)
			.pipe(typedoc(<any>typedocOptions))
			;

	});