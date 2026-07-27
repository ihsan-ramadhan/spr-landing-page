// ponytail: custom loader to optimize images from Squarespace CDN based on layout width requests
export default function sqspLoader({ src, width }: { src: string; width: number }) {
  if (src.includes('squarespace-cdn.com') || src.includes('static1.squarespace.com')) {
    // Squarespace supported formats: 100w, 300w, 500w, 750w, 1000w, 1500w, 2500w
    let format = '1000w';
    if (width <= 100) format = '100w';
    else if (width <= 300) format = '300w';
    else if (width <= 500) format = '500w';
    else if (width <= 750) format = '750w';
    else if (width <= 1000) format = '1000w';
    else if (width <= 1500) format = '1500w';
    else format = '2500w';

    const baseUrl = src.split('?')[0];
    return `${baseUrl}?format=${format}`;
  }
  return src;
}

// ponytail: check execution block for verification
if (import.meta.url.startsWith('file:') && process.argv[1] === new URL(import.meta.url).pathname) {
  const testUrl = 'https://images.squarespace-cdn.com/content/v1/61cdb78e5104297f40ace0af/logo.png';
  const out1 = sqspLoader({ src: testUrl, width: 250 });
  const out2 = sqspLoader({ src: testUrl, width: 1200 });
  console.assert(out1 === `${testUrl}?format=300w`, `Expected 300w format, got ${out1}`);
  console.assert(out2 === `${testUrl}?format=1500w`, `Expected 1500w format, got ${out2}`);
  console.log('Loader self-check passed.');
}
