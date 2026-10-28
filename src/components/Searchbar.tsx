type SearchbarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function Searchbar({ value, onChange }: SearchbarProps) {
  return (
    <label className="flex items-center gap-3 rounded-xl border border-[#dedbd2] bg-white px-4 py-3 transition focus-within:border-[#a6a195]">
      <svg
        aria-hidden="true"
        className="size-5 shrink-0 text-[#77766f]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </svg>
      <input
        className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#9b9991]"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by author"
        aria-label="Search photos by author"
      />
    </label>
  );
}
