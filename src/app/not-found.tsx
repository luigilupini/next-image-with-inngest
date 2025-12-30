import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RootNotFound() {
  return (
    <div className="center h-screen">
      <Card className="relative px-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">404</CardTitle>
          <CardDescription className="prose-p:mt-1 pt-1">
            Sorry we not sure how you got here,
            <br />
            <p>Let&apos;s get you get back on track!</p>
          </CardDescription>
        </CardHeader>
        <CardContent className="text-xs">
          <div className="flex gap-3">
            <Button asChild size="sm" variant="link" className="px-0">
              <Link href="/">Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
