'use strict';

const gulp = require('gulp');
const s3 = require('gulp-s3-upload')({ useIAM: true });

gulp.task('s3', () => gulp.src('./assets/**')
  .pipe(s3({
    Bucket: process.env.BUCKET_NAME, //  Required
    ACL: 'public-read',       //  Needs to be user-defined
  }, {
    // S3 Constructor Options, ie:
    maxRetries: 5,
  }))
);
