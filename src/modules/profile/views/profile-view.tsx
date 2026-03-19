"use client";

import { useState } from "react";
import { type Profile } from "../types/profile";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/react";
import { ProfileHeader } from "../components/profile-header";
import { ProfileBanner } from "../components/profile-banner";
import { ProfileAvatar } from "../components/profile-avatar";
import { ProfileInfo } from "../components/profile-info";
import { ProfileTabs } from "../components/profile-tabs";

export function ProfileView({ profile }: { profile: Profile }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState("md");

  const handleOpen = (size: string) => {
    setSize(size);
    onOpen();
  };

  return (
    <div className="max-w-[600px] w-full mx-auto border-l border-r border-white/20 min-h-screen">
      <ProfileHeader name={profile.name} postsCount={profile.postsCount} />
      <ProfileBanner bannerUrl={profile.banner_url} />
      <div className="flex justify-between items-start">
        <ProfileAvatar avatarUrl={profile.avatar_url} name={profile.name} />
        <div className="px-4 mt-3">
          <Button radius="full" onPress={() => handleOpen(size)} variant="bordered" className="font-bold">
            Edit profile
          </Button>
          <Modal isOpen={isOpen} size={size} onClose={onClose}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                  <ModalBody>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.</p>
                    <p>Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Action
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>
      <ProfileInfo name={profile.name} userName={profile.user_name} bio={profile.bio} location={profile.location} websiteUrl={profile.website_url} createdAt={profile.created_at} followersCount={profile.followersCount} followingCount={profile.followingCount} />
      <ProfileTabs userId={profile.id} />
    </div>
  );
}
