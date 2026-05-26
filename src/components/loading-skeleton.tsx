import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="rounded-[24px] border border-white/10 bg-white/10 p-6">
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-5 w-32 rounded-full bg-white/15" />
          <Skeleton className="h-24 w-24 rounded-full bg-white/15" />
          <Skeleton className="h-14 w-28 rounded-2xl bg-white/15" />
          <Skeleton className="h-4 w-24 rounded-full bg-white/15" />
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Skeleton className="h-20 rounded-2xl bg-white/15" />
          <Skeleton className="h-20 rounded-2xl bg-white/15" />
          <Skeleton className="h-20 rounded-2xl bg-white/15" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-40 rounded-[20px] bg-white/15"
          />
        ))}
      </div>
    </div>
  );
}