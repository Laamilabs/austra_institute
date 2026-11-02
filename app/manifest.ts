import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Austra Training Institute',
    short_name: 'Austra',
    description: 'Caregiving, health support, ICT and professional courses in Eldoret, Kenya',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0B1F3A',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
