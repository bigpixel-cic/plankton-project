import { ImageResponse } from 'next/og';
import { join } from 'node:path';
import { readFile } from 'node:fs/promises';

async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error('failed to load font data');
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title')?.slice(0, 100) || 'The Plankton Project';
    const bgData = await readFile(
      join(process.cwd(), 'public', 'metadata', 'og-image-base.png'),
      'base64'
    );
    const bgImageSrc = `data:image/png;base64,${bgData}`;

    return new ImageResponse(
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '1200px',
          height: '630px',
          backgroundImage: `url(${bgImageSrc})`,
          backgroundSize: 'cover',
          padding: '50px',
          boxSizing: 'border-box',
        }}
      >
        <h1
          style={{
            color: '#fff',
            fontSize: 100,
            fontWeight: 900,
            textAlign: 'center',
            margin: '24px 0',
          }}
        >
          {title}
        </h1>
      </div>,
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: await loadGoogleFont('Inter:wght@900', title),
            weight: 900,
            style: 'normal',
          },
        ],
      }
    );
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Failed to generate image', { status: 500 });
  }
}
