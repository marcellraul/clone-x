"use client";
import { Button } from "@heroui/react";
import { useFormStatus } from "react-dom";

export function ComposePostButton() {
  const { pending } = useFormStatus();

  return (
    <div className="self-end">
      <Button type="submit" isLoading={pending} color="primary">
        Post
      </Button>
    </div>
  );
}
