import React from 'react';
import { MoreVertical } from 'lucide-react';

// تعريف بنية بيانات المنتج لضمان دقة الأنواع في TypeScript
interface Product {
  id: number;
  name: string;
  sku: string;
  price: string;
  sales: string;
  imageUrl: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Adidas Ultra boost',
    sku: '$126.500',
    price: '$126.50',
    sales: '999 sales',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Adidas Ultra boost',
    sku: '$126.500',
    price: '$126.50',
    sales: '999 sales',
    imageUrl: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=300&q=80&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Adidas Ultra boost',
    sku: '$126.500',
    price: '$126.50',
    sales: '999 sales',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&q=80&auto=format&fit=crop',
  },
];

const BestSellersCard: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-full border border-gray-100 font-sans">
      
      {/* رأس البطاقة */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Best Sellers</h2>
        <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
          <MoreVertical size={20} />
        </button>
      </div>
      
      {/* خط فاصل */}
      <hr className="border-gray-200 mb-6" />

      {/* قائمة المنتجات */}
      <div className="flex flex-col gap-6">
        {products.map((product) => (
          <div key={product.id} className="flex items-center justify-between">
            
            <div className="flex items-center gap-4">
              {/* حاوية الصورة المستوحاة من Figma */}
              <div className="w-20 h-20 bg-[#F3F4F6] rounded-2xl flex items-center justify-center p-2">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-contain mix-blend-multiply" 
                />
              </div>

              {/* نصوص المنتج الجانبية */}
              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-gray-900 leading-tight">
                  {product.name}
                </h3>
                <p className="text-gray-400 text-sm mt-1 font-medium">
                  {product.sku}
                </p>
              </div>
            </div>

            {/* السعر والمبيعات */}
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900 leading-none">
                {product.price}
              </p>
              <p className="text-gray-400 text-sm mt-2 font-medium">
                {product.sales}
              </p>
            </div>

          </div>
        ))}
      </div>

      {/* زر التقرير */}
      <button className="mt-8 bg-[#1C1C1C] text-white text-xs font-bold py-3.5 px-7 rounded-xl hover:bg-black transition-all active:scale-95 uppercase tracking-wider">
        Report
      </button>

    </div>
  );
};

export default BestSellersCard;