import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Grid, List } from 'lucide-react';
import { categoryAPI, servicesProductsAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import ServiceProductCard from '../components/ServiceProductCard';

const ServicesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addItem } = useCart();

  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [viewMode, setViewMode] = useState('grid');

  const selectedCategory = searchParams.get('category') || '';

  // ---------------- CATEGORIES ----------------
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoryAPI.services();
        setCategories(res.data);
      } catch (err) {
        console.error('categories error', err);
      }
    };
    fetchCategories();
  }, []);

  // ---------------- SERVICES ----------------
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);

      try {
        const params = { type: 'service' };
        if (selectedCategory) params.category = selectedCategory;

        const res = await servicesProductsAPI.list(params);

        // 🔥 IMPORTANT: aucune boucle API ici
        const items = res.data.items.map(item => ({
          ...item,
          // fallback safe
          enterprise_name: item.enterprise_name || "Entreprise indisponible"
        }));

        setServices(items);
        setTotal(res.data.total);

      } catch (err) {
        console.error('services error', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [selectedCategory]);

  // ---------------- CART ----------------
  const handleAddToCart = (item) => {
    addItem(item);
  };

  // ---------------- CATEGORY ----------------
  const handleCategoryChange = (value) => {
    if (value === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', value);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen bg-[#FFF5F9] pt-24">

      {/* HEADER */}
      <div className="relative h-[40vh] flex items-center bg-black text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold">Services</h1>
        </div>
      </div>

      {/* FILTERS */}
      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="flex justify-between mb-6">
          <span className="text-sm text-gray-500">{total} résultats</span>

          <div className="flex gap-2">
            <button onClick={() => setViewMode('grid')}>
              <Grid />
            </button>
            <button onClick={() => setViewMode('list')}>
              <List />
            </button>
          </div>
        </div>

        {/* GRID */}
        {loading ? (
          <div>Loading...</div>
        ) : services.length > 0 ? (
          <div className={viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-3 gap-6'
            : 'flex flex-col gap-4'
          }>

            {services.map(service => (
              <ServiceProductCard
                key={service.id}
                item={service}
                onAddToCart={handleAddToCart}
              />
            ))}

          </div>
        ) : (
          <p>Aucun service</p>
        )}

      </div>
    </div>
  );
};

export default ServicesPage;