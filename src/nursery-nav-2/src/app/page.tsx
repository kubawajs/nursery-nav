import ListItem from "@/components/list/list-item";
import Map from "@/components/map/map";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen h-screen overflow-hidden p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start h-full">
        <div className="grid grid-cols-2 gap-4 w-full h-full">
          <div className="flex flex-col items-center gap-4 h-full overflow-auto">
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
          </div>
          <div className="flex flex-col items-center gap-4 h-full">
            <Map />
          </div>
        </div>
      </main>
    </div>
  );
}
