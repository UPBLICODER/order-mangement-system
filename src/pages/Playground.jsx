import { Button, Card, Badge, Input } from "../components/ui";

export default function Playground() {
  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-6">
      <h1 className="text-xl font-semibold">SaaS UI Components</h1>

      <div className="space-x-3">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
      </div>

      <Card>
        <h2 className="text-lg mb-2">Card Title</h2>
        <p className="text-gray-400 text-sm mb-4">
          Minimal dark themed card with subtle borders and spacing.
        </p>
        <div className="flex gap-2">
          <Badge value="success" />
          <Badge value="warning" />
          <Badge value="error" />
          <Badge value="high" />
        </div>
      </Card>

      <div className="max-w-sm">
        <Input placeholder="Enter your email" />
      </div>
    </div>
  );
}
