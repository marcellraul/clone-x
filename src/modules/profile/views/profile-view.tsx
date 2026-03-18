"use client";

import { Button } from "@heroui/react";
import { type Profile } from "../types/profile";
import { ProfileHeader } from "../components/profile-header";
import { ProfileBanner } from "../components/profile-banner";
import { ProfileAvatar } from "../components/profile-avatar";
import { ProfileInfo } from "../components/profile-info";
import { ProfileTabs } from "../components/profile-tabs";

export function ProfileView({ profile }: { profile: Profile }) {
  return (
    <div className="max-w-[600px] w-full mx-auto border-l border-r border-white/20 min-h-screen">
      <ProfileHeader name={profile.name} postsCount={profile.postsCount} />
      <ProfileBanner bannerUrl={profile.banner_url} />
      <div className="flex justify-between items-start">
        <ProfileAvatar avatarUrl={profile.avatar_url} name={profile.name} />
        <div className="px-4 mt-3">
          <Button radius="full" variant="bordered" className="font-bold">
            Edit profile
          </Button>
        </div>
      </div>
      <ProfileInfo name={profile.name} userName={profile.user_name} bio={profile.bio} location={profile.location} websiteUrl={profile.website_url} createdAt={profile.created_at} followersCount={profile.followersCount} followingCount={profile.followingCount} />
      <ProfileTabs />
    </div>
  );
}
