import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export interface Template {
  id: string
  title: string
  description: string
}

export function TemplateCard({ template }: { template: Template }) {
  return (
    <Card className="flex flex-col justify-between gap-4 p-4">
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-foreground">{template.title}</h3>
        <p className="text-sm text-muted-foreground">{template.description}</p>
      </div>
      <Button variant="outline" size="sm" className="w-full">
        Use Template
      </Button>
    </Card>
  )
}
