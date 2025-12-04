"use client";
import { useState, FormEvent } from "react";
import Image from "next/image";

interface ListViewProps<T> {
  title: string;
  data: T[];
  onAdd?: (item: T) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onDelete?: (id: any) => void;
  fields: { name: string; key: keyof T; type?: string }[];
  idKey: keyof T;
  showAddButton?: boolean;
}

export default function GenericListView<T>({ 
  title, 
  data, 
  onAdd, 
  onDelete, 
  fields, 
  idKey, 
  showAddButton = true 
}: ListViewProps<T>) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState<Partial<T>>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (onAdd && newItem) {
        onAdd(newItem as T);
    }
    setIsModalOpen(false);
    setNewItem({});
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
        {showAddButton && (
          <button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto bg-black text-white px-6 py-2 rounded-sm text-sm font-medium hover:bg-gray-800 transition-colors">
            + Add New
          </button>
        )}
      </div>

      <div className="bg-white rounded-sm border border-gray-200 overflow-hidden w-full">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm min-w-[600px]">
            <thead className="bg-gray-50 font-bold text-gray-500 uppercase text-xs">
              <tr>
                {fields.map(f => <th key={String(f.key)} className="p-3 md:p-4 whitespace-nowrap">{f.name}</th>)}
                {onDelete && <th className="p-3 md:p-4 text-center whitespace-nowrap">Action</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.length > 0 ? (
                data.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    {fields.map(f => (
                      <td key={String(f.key)} className="p-3 md:p-4">
                        {(f.key === 'image' || f.key === 'thumbnail') && typeof item[f.key] === 'string' ? (
                          <div className="w-10 h-10 md:w-12 md:h-12 relative bg-gray-100 rounded overflow-hidden border border-gray-200 shrink-0">
                            {item[f.key] ? (
                                <Image src={item[f.key] as string} alt="img" fill className="object-cover w-full h-full" />
                            ) : null}
                          </div>
                        ) : (
                          <span className="line-clamp-2">{String(item[f.key])}</span>
                        )}
                      </td>
                    ))}
                    {onDelete && (
                      <td className="p-3 md:p-4 text-center">
                        <button onClick={() => onDelete(item[idKey])} className="text-red-500 hover:text-red-700 font-bold p-2">🗑</button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={fields.length + 1} className="p-8 text-center text-gray-400">No items found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && showAddButton && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Add Item</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {fields.map(f => (
                <div key={String(f.key)}>
                  <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">{f.name}</label>
                  <input
                    placeholder={f.name}
                    className="w-full border border-gray-300 p-2.5 rounded text-sm focus:ring-1 focus:ring-black outline-none"
                    value={String(newItem[f.key] || '')}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={e => setNewItem({ ...newItem, [f.key]: e.target.value as any })}
                    required
                  />
                </div>
              ))}
              <div className="flex gap-3 justify-end mt-6 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-500 text-sm hover:bg-gray-100 rounded">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-black text-white rounded text-sm hover:bg-gray-800">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}