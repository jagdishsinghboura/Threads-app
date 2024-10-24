

import { OurFileRouter } from '@/app/api/uploadthing/core';
import { generateReactHelpers } from '@uploadthing/react';

console.log("sdfl;msd;lf", typeof generateReactHelpers);

export const  { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();
