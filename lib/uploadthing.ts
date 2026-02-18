import { generateUploadButton, generateUploadDropzone, generateReactHelpers } from "@uploadthing/react";
import type { UploadRouter } from "@/app/api/uploadthing/core";

export const UploadThingButton = generateUploadButton<UploadRouter>();
export const UploadThingDropzone = generateUploadDropzone<UploadRouter>();
export const { useUploadThing, uploadFiles } = generateReactHelpers<UploadRouter>();
