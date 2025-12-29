import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type Props = {
  name?: string
  classname?: string | undefined
  data: unknown
}

const ShowCode = ({ data, name, classname }: Props) => {
  return (
    <Card
      className={cn(
        'center relative my-2 w-fit bg-inherit p-1 text-inherit backdrop-blur-md',
        classname,
      )}
    >
      {name && (
        <Badge className="absolute -right-2 -top-[10px] h-5 text-nowrap rounded-md border font-mono text-[9px] backdrop-blur-xl">
          {name}
        </Badge>
      )}
      <pre className="w-full select-text rounded-lg bg-card-foreground/5 px-4 py-2 text-[9px] leading-4 text-card-foreground/70">
        {JSON.stringify(data, null, 2)}
      </pre>
    </Card>
  )
}

export { ShowCode }
