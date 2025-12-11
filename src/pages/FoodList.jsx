import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import toast from 'react-hot-toast';
import { fetchFoods, deleteFood, updateStock, updateFoodStatus } from '../store/slices/foodSlice';

const FoodList = () => {
  const dispatch = useDispatch();
  const { items: foods, loading } = useSelector((state) => state.food);

  useEffect(() => {
    dispatch(fetchFoods());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this food item?')) return;
    dispatch(deleteFood(id));
  };


  const handleToggleStatus = (food) => {
    dispatch(updateFoodStatus({
      id: food._id,
      inStock: !food.inStock,
      stockQty: food.stockQty // Keep existing stock
    }));
  };

  return (
    <Layout title="Food Items">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Food Items</h1>
          <p className="text-gray-600">Manage your restaurant menu</p>
        </div>
        <Link
          to="/food/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
        >
          Add New Food
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Food Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {foods.map((food) => (
                <tr key={food._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {food.images && food.images.length > 0 && (
                        <img
                          className="h-10 w-10 rounded-lg object-cover mr-3"
                          src={`http://localhost:3000${food.images[0]}`}
                          alt={food.title}
                        />
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{food.title}</div>
                        <div className="text-sm text-gray-500">{food.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">₹{food.price}</div>
                    {food.discount > 0 && (
                      <div className="text-sm text-green-600">-{food.discount}% off</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{food.stockQty}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleStatus(food)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${food.inStock ? 'bg-green-600' : 'bg-gray-200'
                        }`}
                    >
                      <span className="sr-only">Use setting</span>
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${food.inStock ? 'translate-x-5' : 'translate-x-0'
                          }`}
                      />
                    </button>
                    <span className={`ml-2 text-xs font-medium ${food.inStock ? 'text-green-600' : 'text-gray-500'}`}>
                      {food.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <Link
                      to={`/food/edit/${food._id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(food._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
};

export default FoodList;
