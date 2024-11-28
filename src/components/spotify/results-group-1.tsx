export function ResultsGroup1() {
  return (
    <div className="flex h-[800px] flex-col justify-between gap-4 lg:h-full lg:w-1/2">
      <div className="h-1/3 w-full rounded-xl bg-muted">
        <p>hi</p>
      </div>
      <div className="flex h-2/3 w-full gap-4 rounded-xl">
        <div className="h-full w-full rounded-xl bg-muted"></div>
        <div className="h-full w-full rounded-xl">
          <div className="flex h-full w-full flex-col gap-4">
            <div className="h-3/4 w-full rounded-xl bg-muted"></div>
            <div className="h-1/4 w-full rounded-xl bg-muted"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
