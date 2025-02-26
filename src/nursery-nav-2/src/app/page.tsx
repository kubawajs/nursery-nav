import ListItem from "@/components/list/list-item";
import Map from "@/components/map/map";

export default function Home() {
  return (
    <div className="grid grid-cols-2 gap-4 w-full h-full">
      <div className="flex flex-col items-center gap-4 h-full overflow-auto">
        <ul>
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
        </ul>
      </div>
      <div className="flex flex-col items-center gap-4 h-full">
        <Map />
      </div>
    </div>
  );
}
