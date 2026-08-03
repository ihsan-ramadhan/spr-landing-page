interface ProjectMapProps {
  readonly lat: number;
  readonly lng: number;
  readonly zoom: number;
  readonly label: string;
}

export default function ProjectMap({ lat, lng, zoom, label }: ProjectMapProps) {
  const embedUrl = `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
      <iframe
        title={label}
        src={embedUrl}
        className="w-full h-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
