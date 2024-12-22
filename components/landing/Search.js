"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Search = () => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathName}?${params.toString()}`);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        className="bg-[#27292F] border border-[#CCCCCC]/20 py-1 px-2 rounded-md"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </div>
  );
};

export default Search;
