import { Button } from "@/components/ui/button";

interface ItemsListProps {
  items: {
    id: string;
    name: string;
    quantity: number;
  }[];
  deleteItem: (id: string) => void;
  incrementQuantity: (id: string, name: string, quantity: number) => void;
}

const ItemsList = ({
  items,
  deleteItem,
  incrementQuantity,
}: ItemsListProps) => {
  return (
    <ul className="w-full">
      {items.map((item, id) => (
        <li
          key={id}
          className="bg-slate-300 p-2 rounded-md my-4 w-full flex justify-between items-center gap-2"
        >
          <div className="p-2 w-full flex justify-between">
            <p className="capitalize">{item.name}</p>
            <p>{item.quantity}</p>
          </div>
          <Button
            onClick={() => incrementQuantity(item.id, item.name, item.quantity)}
            variant="default"
            size="sm"
          >
            Add
          </Button>
          <Button
            onClick={() => deleteItem(item.id)}
            variant="default"
            size="sm"
          >
            Remove
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default ItemsList;
