import { createUploadthing, type FileRouter } from "uploadthing/server";

const f = createUploadthing();

export const fileRouter = {
    imageUploader: f({
        image: {
            maxFileSize: "4MB",
            maxFileCount: 10,
        },
    })
        .onUploadComplete(() => { }),
    videoUploader: f({
        video: {
            maxFileSize: "32MB",
            maxFileCount: 5,
        },
    })
        .onUploadComplete(() => { }),
} satisfies FileRouter;

export type UploadRouter = typeof fileRouter;
