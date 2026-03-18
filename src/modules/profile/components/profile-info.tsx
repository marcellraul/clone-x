import { IconCalendar, IconMapPin, IconLink } from "@tabler/icons-react";
import moment from "moment";

export function ProfileInfo({
  name,
  userName,
  bio,
  location,
  websiteUrl,
  createdAt,
  followersCount,
  followingCount,
}: {
  name: string;
  userName: string;
  bio: string | null;
  location: string | null;
  websiteUrl: string | null;
  createdAt: string;
  followersCount: number;
  followingCount: number;
}) {
  const joinedDate = moment(createdAt).format("MMMM YYYY");

  return (
    <div className="px-4 flex flex-col gap-2 mt-3">
      <div>
        <p className="font-bold text-xl">{name}</p>
        <p className="text-gray-500">@{userName}</p>
      </div>
      {bio && <p className="text-lg">{bio}</p>}
      <div className="flex flex-wrap gap-3 text-gray-500 text-lg">
        {location && (
          <span className="flex items-center gap-1">
            <IconMapPin className="w-4 h-4" />
            {location}
          </span>
        )}
        {websiteUrl && (
          <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-400 hover:underline">
            <IconLink className="w-4 h-4" />
            {websiteUrl}
          </a>
        )}
        <br />
      </div>
      <div className="text-gray-500 text-lg">
        <span className="flex items-center gap-1">
          <IconCalendar className="w-4 h-4" />
          Joined {joinedDate}
        </span>
      </div>
      <div className="flex gap-4 text-lg">
        <span>
          <strong>{followingCount}</strong> <span className="text-gray-500">Following</span>
        </span>
        <span>
          <strong>{followersCount}</strong> <span className="text-gray-500">Followers</span>
        </span>
      </div>
    </div>
  );
}
