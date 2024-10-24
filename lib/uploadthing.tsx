"use server"
import { OurFileRouter } from '@/app/api/uploadthing/core';
import { generateReactHelpers } from '@uploadthing/react';

console.log(typeof generateReactHelpers);



export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();
