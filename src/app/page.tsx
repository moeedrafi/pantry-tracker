"use client";

import { ChangeEvent, MouseEvent } from "react";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";

import ItemsList from "../components/List";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [items, setItems] = useState<
    { id: string; name: string; quantity: number }[]
  >([]);
  const [filteredItems, setFilteredItems] = useState<
    { id: string; name: string; quantity: number }[]
  >([]);
  const [newItem, setNewItem] = useState<{ name: string; quantity: number }>({
    name: "",
    quantity: 1,
  });

  const addItem = async (e: MouseEvent) => {
    e.preventDefault();

    if (newItem.name.trim() !== "") {
      await addDoc(collection(db, "inventory"), {
        name: newItem.name.trim(),
        quantity: newItem.quantity,
      });

      updatePantry();
    }

    setNewItem({ name: "", quantity: 1 });
  };

  const deleteItem = async (id: string) => {
    await deleteDoc(doc(db, "inventory", id));

    updatePantry();
  };

  const updatePantry = async () => {
    const snapshot = collection(db, `inventory`);
    const docs = await getDocs(snapshot);
    const inventoryList: { id: string; name: string; quantity: number }[] = [];
    docs.forEach((doc) => {
      inventoryList.push({ id: doc.id, ...doc.data() } as {
        id: string;
        name: string;
        quantity: number;
      });
    });
    setItems(inventoryList);
    setFilteredItems(inventoryList);
  };

  const incrementQuantity = async (
    id: string,
    name: string,
    quantity: number
  ) => {
    const docRef = doc(db, "inventory", id);
    await setDoc(docRef, { name, quantity: quantity + 1 }, { merge: true });
    await updatePantry();
  };

  const searchItem = (e: ChangeEvent<HTMLInputElement>) => {
    const filterItems = items.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredItems(filterItems);
  };

  useEffect(() => {
    updatePantry();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center sm:p-24 p-4">
      <div className="w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl p-4 text-center">Inventory Tracker</h1>
      </div>

      <div className="flex items-center gap-3">
        <Input
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="col-span-3 p-3"
          placeholder="Enter Item or Search Item"
        />
        <Button onClick={addItem}>Submit</Button>
      </div>

      <div className="flex items-center gap-3">
        <Input onChange={searchItem} placeholder="Search" />
      </div>

      <div>
        <span>Total Items: {items.length}</span>
      </div>

      <ItemsList
        items={filteredItems}
        deleteItem={deleteItem}
        incrementQuantity={incrementQuantity}
      />
    </main>
  );
}
