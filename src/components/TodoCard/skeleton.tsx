import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function TodoCardSkeleton() {
  return (
    <Card className="w-full max-w-96 rounded-[25px] py-4 shadow-none border-none bg-gray-200">
      <CardHeader>
        <div className="flex items-center border-b-1 pb-4 px-4 justify-between">
          <Skeleton className="w-2/3 h-4 bg-gray-300 rounded" />
          <Skeleton className="w-4 h-4 bg-gray-300 rounded" />
        </div>
      </CardHeader>

      <CardContent className="h-80 font-normal px-4 text-[13px]">
        <Skeleton className="w-full h-full bg-gray-300 rounded" />
      </CardContent>

      <CardFooter className="flex justify-between">
        <div className="flex gap-3 items-center">
          <Skeleton className="w-4 h-4 bg-gray-300 rounded" />
          <Skeleton className="w-4 h-4 bg-gray-300 rounded" />
        </div>
        <Skeleton className="w-4 h-4 bg-gray-300 rounded" />
      </CardFooter>
    </Card>
  );
}
