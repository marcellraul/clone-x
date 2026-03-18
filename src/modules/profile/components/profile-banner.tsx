export function ProfileBanner({ bannerUrl }: { bannerUrl?: string | null }) {
  return <div className="w-full h-48 bg-gray-700">{bannerUrl && <img src={bannerUrl} alt="Banner" className="w-full h-full object-cover" />}</div>;
}
