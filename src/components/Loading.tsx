export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-fit-screen">
      <div className="animate-spin rounded-full h-28 w-28 border-t-3 border-b-3 border-blue-500"></div>
      <h2 className="mt-8 text-2xl text-blue-900">Loading...</h2>
    </div>
  );
}
