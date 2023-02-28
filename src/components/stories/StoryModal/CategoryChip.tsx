export default function FilterChip({
  filter,
}: {
  filter: { tagid: number; title: string };
}) {
  return (
    <div className="bg-black rounded-full py-1 px-3 whitespace-nowrap">
      <span className="capitalize">{filter.title}</span>
    </div>
  );
}
