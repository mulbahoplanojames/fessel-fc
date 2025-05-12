import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

function bufferToStream(buffer: Buffer): Readable {
  const readable = new Readable();
  readable.push(buffer);
  readable.push(null);
  return readable;
}

export async function uploadMatchImageToCloudinary(
  file: File
): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "fassel-fc/matches",
        resource_type: "image",
        transformation: [
          { width: 800, crop: "scale" },
          { fetch_format: "auto", quality: "auto" },
        ],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result?.secure_url || "");
      }
    );

    bufferToStream(buffer).pipe(uploadStream);
  });
}

export async function uploadPlayersImageToCloudinary(
  file: File
): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "fassel-fc/players",
        resource_type: "image",
        transformation: [
          { width: 800, crop: "scale" },
          { fetch_format: "auto", quality: "auto" },
        ],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result?.secure_url || "");
      }
    );

    bufferToStream(buffer).pipe(uploadStream);
  });
}

export async function uploadNewsImageToCloudinary(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "fassel-fc/news",
        resource_type: "image",
        transformation: [
          { width: 800, crop: "scale" },
          { fetch_format: "auto", quality: "auto" },
        ],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result?.secure_url || "");
      }
    );

    bufferToStream(buffer).pipe(uploadStream);
  });
}
