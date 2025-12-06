import { useState } from 'react';

// Mock Data based on the image
const SUBCATEGORIES = [
    {
        id: 5,
        categoryName: 'Pet Care',
        subcategoryName: 'Accessories & Other Supplies',
        subcategoryImage: '/assets/category-pet-care.png', // Placeholder - blue pet food bowl
        totalProduct: 2
    },
    {
        id: 6,
        categoryName: 'Pet Care',
        subcategoryName: 'Dog Need',
        subcategoryImage: '/assets/category-pet-care.png', // Placeholder - red and yellow dog food bag
        totalProduct: 8
    },
    {
        id: 7,
        categoryName: 'Sweet Tooth',
        subcategoryName: 'Indian Sweet',
        subcategoryImage: '/assets/category-sweet-tooth.png', // Placeholder - pink Rasgulla box
        totalProduct: 1
    },
    {
        id: 8,
        categoryName: 'Sweet Tooth',
        subcategoryName: 'Cake & Rolls',
        subcategoryImage: '/assets/category-sweet-tooth.png', // Placeholder - round cake
        totalProduct: 2
    },
    {
        id: 9,
        categoryName: 'Sweet Tooth',
        subcategoryName: 'Syrup',
        subcategoryImage: '/assets/category-sweet-tooth.png', // Placeholder - Hershey's syrup
        totalProduct: 1
    },
    {
        id: 10,
        categoryName: 'Tea Coffee',
        subcategoryName: 'Tea',
        subcategoryImage: '/assets/category-tea-coffee.png', // Placeholder - tea bags
        totalProduct: 1
    }
];

export default function SellerSubCategory() {
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const displayedSubcategories = SUBCATEGORIES.slice(0, rowsPerPage);

    const handleSort = (column: string) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const SortIcon = ({ column }: { column: string }) => (
        <span className="text-neutral-300 text-[10px]">
            {sortColumn === column ? (sortDirection === 'asc' ? '↑' : '↓') : '⇅'}
        </span>
    );

    return (
        <div className="flex flex-col h-full">
            {/* Page Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-neutral-800">View SubCategory</h1>
                <div className="text-sm text-blue-500">
                    <span className="cursor-pointer hover:underline">Home</span> <span className="text-neutral-400">/</span> <span className="text-neutral-600">Dashboard</span>
                </div>
            </div>

            {/* Content Card */}
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 flex-1 flex flex-col">
                <div className="p-4 border-b border-neutral-100 font-medium text-neutral-700">
                    View SubCategory
                </div>

                {/* Controls */}
                <div className="p-4 flex justify-between items-center border-b border-neutral-100">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-neutral-600">Show</span>
                        <select
                            value={rowsPerPage}
                            onChange={(e) => setRowsPerPage(Number(e.target.value))}
                            className="bg-white border border-neutral-300 rounded py-1.5 px-3 text-sm focus:ring-1 focus:ring-teal-500 focus:outline-none cursor-pointer"
                        >
                            <option value={10}>10 entries</option>
                            <option value={20}>20 entries</option>
                            <option value={50}>50 entries</option>
                            <option value={100}>100 entries</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto flex-1">
                    <table className="w-full text-left border-collapse border border-neutral-200">
                        <thead>
                            <tr className="bg-neutral-50 text-xs font-bold text-neutral-800">
                                <th 
                                    className="p-4 w-16 border border-neutral-200 cursor-pointer hover:bg-neutral-100 transition-colors"
                                    onClick={() => handleSort('id')}
                                >
                                    <div className="flex items-center justify-between">
                                        ID <SortIcon column="id" />
                                    </div>
                                </th>
                                <th 
                                    className="p-4 border border-neutral-200 cursor-pointer hover:bg-neutral-100 transition-colors"
                                    onClick={() => handleSort('categoryName')}
                                >
                                    <div className="flex items-center justify-between">
                                        Category Name <SortIcon column="categoryName" />
                                    </div>
                                </th>
                                <th 
                                    className="p-4 border border-neutral-200 cursor-pointer hover:bg-neutral-100 transition-colors"
                                    onClick={() => handleSort('subcategoryName')}
                                >
                                    <div className="flex items-center justify-between">
                                        Subcategory Name <SortIcon column="subcategoryName" />
                                    </div>
                                </th>
                                <th 
                                    className="p-4 border border-neutral-200 cursor-pointer hover:bg-neutral-100 transition-colors"
                                    onClick={() => handleSort('subcategoryImage')}
                                >
                                    <div className="flex items-center justify-between">
                                        Subcategory Image <SortIcon column="subcategoryImage" />
                                    </div>
                                </th>
                                <th 
                                    className="p-4 border border-neutral-200 cursor-pointer hover:bg-neutral-100 transition-colors"
                                    onClick={() => handleSort('totalProduct')}
                                >
                                    <div className="flex items-center justify-between">
                                        Total Product <SortIcon column="totalProduct" />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedSubcategories.map((subcategory) => (
                                <tr key={subcategory.id} className="hover:bg-neutral-50 transition-colors text-sm text-neutral-700">
                                    <td className="p-4 align-middle border border-neutral-200">{subcategory.id}</td>
                                    <td className="p-4 align-middle border border-neutral-200">{subcategory.categoryName}</td>
                                    <td className="p-4 align-middle border border-neutral-200">{subcategory.subcategoryName}</td>
                                    <td className="p-4 border border-neutral-200">
                                        <div className="w-16 h-12 bg-white border border-neutral-200 rounded p-1 flex items-center justify-center mx-auto">
                                            <img
                                                src={subcategory.subcategoryImage}
                                                alt={subcategory.subcategoryName}
                                                className="max-w-full max-h-full object-contain"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = 'https://placehold.co/60x40?text=Img';
                                                }}
                                            />
                                        </div>
                                    </td>
                                    <td className="p-4 align-middle border border-neutral-200">{subcategory.totalProduct}</td>
                                </tr>
                            ))}
                            {displayedSubcategories.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-neutral-400 border border-neutral-200">
                                        No subcategories found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

