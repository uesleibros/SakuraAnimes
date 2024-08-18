import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import { tmpdir } from 'os';
import { join } from 'path';
import { readFile } from 'fs/promises';
import { unlink } from 'fs/promises';

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

export async function GET(request) {
  const { pathname } = new URL(request.url);
  const pathParts = pathname.split('/').filter(Boolean);
  const slug = pathParts[pathParts.length - 2];

  if (!slug || pathParts[pathParts.length - 1] !== "thumbnail.jpg") {
    return new Response(JSON.stringify({ error: "Invalid URL structure or missing slug." }), { status: 400 });
  }

  const videoUrl = `https://cdn-zenitsu-gamabunta.b-cdn.net/cf/hls/movies/${slug}/movie.mp4/media.m3u8`;
  const tempDir = tmpdir();
  const thumbnailPath = join(tempDir, `${slug}-thumbnail.jpg`);

  return new Promise((resolve, reject) => {
    ffmpeg(videoUrl)
      .screenshots({
        count: 1,
        folder: tempDir,
        filename: `${slug}-thumbnail.jpg`,
        size: '800x450'
      })
      .on('end', async () => {
        try {
          const imageBuffer = await readFile(thumbnailPath);
          await unlink(thumbnailPath); // Remove the temporary file after reading

          resolve(new Response(imageBuffer, {
            headers: {
              "Content-Type": "image/jpeg",
              "Cache-Control": "no-store"
            }
          }));
        } catch (error) {
          reject(new Response(JSON.stringify({ error: "Failed to process the thumbnail image." }), { status: 500 }));
        }
      })
      .on('error', (error) => {
        reject(new Response(JSON.stringify({ error: "Failed to generate thumbnail." }), { status: 500 }));
      });
  });
}
