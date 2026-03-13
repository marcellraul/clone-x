"use client";

import { Button, Card, CardBody } from "@heroui/react";

export function HeroUITest() {
  return (
    <Card className="mb-4 w-full">
      <CardBody>
        <p className="mb-2 font-semibold">HeroUI funcionando ✓</p>
        <div className="flex gap-2">
          <Button color="primary">Primary</Button>
          <Button color="secondary">Secondary</Button>
          <Button color="danger" variant="flat">Danger</Button>
        </div>
      </CardBody>
    </Card>
  );
}
