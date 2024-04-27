"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const CatalogFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const changeCatalogFilterHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.currentTarget.value);
    router.push(`/catalog?filter=${e.currentTarget.value}`);

    // router.replace(`./catalog?sort=${e.currentTarget.value}`);
  };

  useEffect(() => {
    console.log(searchParams.get("filter"));
  }, []);

  return (
    <div className=" flex justify-center py-5">
      <select
        defaultValue={String(searchParams.get("filter"))}
        onChange={changeCatalogFilterHandler}
        name="catalogSelect"
        id="catalogSelect"
      >
        <option value="popular">По популярности</option>
        <option value="raiting">По рейтингу</option>
        <option value="name">По имени</option>
      </select>
    </div>
  );
};

export default CatalogFilter;
