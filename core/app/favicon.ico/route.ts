/* eslint-disable check-file/folder-naming-convention */
import fs from 'fs';
import path from 'path';

export const GET = async () => {
  const iconPath = path.join(process.cwd(), 'app/icon.png');

  if (fs.existsSync(iconPath)) {
    const iconBuffer = fs.readFileSync(iconPath);

    return new Response(iconBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  }

  return new Response(null, { status: 404 });
};

export const dynamic = 'force-static';
