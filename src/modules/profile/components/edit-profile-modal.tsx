"use client";

import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { addToast, Avatar, Button, Input, Link, Modal, ModalBody, ModalContent, Textarea } from "@heroui/react";
import { IconCamera, IconChevronRight, IconX } from "@tabler/icons-react";
import { updateProfile } from "../actions/update-profile-action";
import { type Profile } from "../types/profile";
import upsellImage from "@/assets/images/upsell_header_wide_v2.png";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="sm" radius="full" isLoading={pending} isDisabled={pending} color="default" className="font-bold">
      {pending ? "" : "Save"}
    </Button>
  );
}

function ProfessionalView({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3">
        <Button isIconOnly variant="light" radius="full" onPress={onBack}>
          <IconX size={20} />
        </Button>
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-label="X">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        <div className="w-10" />
      </div>

      <ModalBody className="flex flex-col items-center text-start gap-6 p-0">
        <img src={upsellImage.src} alt="X for Professionals" className="w-full h-auto" />

        <div className="flex flex-col gap-3 px-6">
          <p className="text-2xl font-bold">X for Professionals</p>
          <p className="text-default-400 text-sm ">Get access to the tools you need to better connect with your audience, grow your brand, and increase your profits.</p>
          <p className="text-default-400 text-sm">
            By tapping "Agree & continue", you are agreeing to our{" "}
            <Link className="mb-4" href="https://help.x.com/es/rules-and-policies/professional-account-policy" isExternal size="sm">
              Professional Account policy.
            </Link>
          </p>
          <div className="w-full px-6 pb-8">
            <Button radius="full" className="w-full bg-white text-black font-bold" size="lg">
              Agree & Continue
            </Button>
          </div>
        </div>
      </ModalBody>
    </div>
  );
}

export function EditProfileModal({ profile, isOpen, onClose }: { profile: Profile; isOpen: boolean; onClose: () => void }) {
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const [avatarPreview, setAvatarPreview] = useState<string>(profile.avatar_url);
  const [bannerPreview, setBannerPreview] = useState<string | null>(profile.banner_url ?? null);
  const [showProfessional, setShowProfessional] = useState(false);

  const clientAction = async (formData: FormData) => {
    try {
      await updateProfile(formData);
      onClose();
    } catch (error: any) {
      addToast({
        title: "Error al actualizar",
        description: error,
        color: "danger",
      });
      console.error(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" hideCloseButton scrollBehavior="inside" classNames={{ base: "bg-[#0a0a0a]" }}>
      <ModalContent>
        {showProfessional ? (
          <ProfessionalView onBack={() => setShowProfessional(false)} />
        ) : (
          <form action={clientAction} className="flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2">
                <Button isIconOnly variant="light" radius="full" onPress={onClose}>
                  <IconX size={20} />
                </Button>
                <span className="font-bold text-lg">Edit profile</span>
              </div>
              <SubmitButton />
            </div>

            <ModalBody className="p-0 mb-4">
              <div className="relative w-full h-36 bg-zinc-800 cursor-pointer" onClick={() => bannerInputRef.current?.click()}>
                {bannerPreview && <img src={bannerPreview} alt="banner" className="w-full h-full object-cover" />}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <IconCamera size={28} className="text-white" />
                </div>
                <input
                  ref={bannerInputRef}
                  type="file"
                  name="banner"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setBannerPreview(URL.createObjectURL(file));
                  }}
                />
              </div>

              <div className="px-4 -mt-10 mb-4 relative w-fit">
                <div className="relative cursor-pointer" onClick={() => avatarInputRef.current?.click()}>
                  <Avatar src={avatarPreview} name={profile.name} className="w-24 h-24 text-xl border-4 border-black" isBordered radius="full" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
                    <IconCamera size={22} className="text-white" />
                  </div>
                </div>
                <input
                  ref={avatarInputRef}
                  type="file"
                  name="avatar"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setAvatarPreview(URL.createObjectURL(file));
                  }}
                />
              </div>

              <div className="flex flex-col gap-4 px-4">
                <Input label="Name" name="name" defaultValue={profile.name} variant="bordered" />
                <Textarea label="Bio" name="bio" defaultValue={profile.bio ?? ""} variant="bordered" minRows={3} />
                <Input label="Location" name="location" defaultValue={profile.location ?? ""} variant="bordered" />
                <Input label="Website" name="website_url" defaultValue={profile.website_url ?? ""} variant="bordered" />
              </div>

              <div className="px-4 py-4 border-t border-divider mt-4">
                <p className="text-sm text-default-400 mb-1">Birth date</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm">January 1, 1990</span>
                  <IconChevronRight size={18} className="text-default-400" />
                </div>
              </div>

              <Button variant="light" radius="none" onPress={() => setShowProfessional(true)} className="w-full flex items-center justify-between px-4 py-6 border-t border-divider" endContent={<IconChevronRight size={18} className="text-default-400" />}>
                <span className="font-semibold">Switch to professional</span>
              </Button>
            </ModalBody>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
