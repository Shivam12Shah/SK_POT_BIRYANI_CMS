import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import toast from 'react-hot-toast';
import { Input } from '../components/Input';
import Button from '../components/Button';
import { fetchPartners, createPartner, updatePartner, deletePartner } from '../store/slices/partnerSlice';

const Partners = () => {
  const dispatch = useDispatch();
  const { partners, loading } = useSelector((state) => state.partners);

  const [showForm, setShowForm] = useState(false);
  const [editingPartner, setEditingPartner] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    vehicle: '',
    status: 'active'
  });
  const [submitting, setSubmitting] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPartners());
  }, [dispatch]);

  useEffect(() => {
    if (location.pathname === '/partners/new') {
      setShowForm(true);
      setEditingPartner(null);
      setFormData({ name: '', phone: '', vehicle: '', status: 'active' });
    }
  }, [location.pathname]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let resultAction;
      if (editingPartner) {
        resultAction = await dispatch(updatePartner({ id: editingPartner._id, data: formData }));
      } else {
        resultAction = await dispatch(createPartner(formData));
      }

      if (updatePartner.fulfilled.match(resultAction) || createPartner.fulfilled.match(resultAction)) {
        handleCloseForm();
      }
    } catch (error) {
      console.error('Error saving partner:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (partner) => {
    setEditingPartner(partner);
    setFormData({
      name: partner.name || '',
      phone: partner.phone || '',
      vehicle: partner.vehicle || '',
      status: partner.status || 'active'
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this partner?')) return;
    dispatch(deletePartner(id));
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingPartner(null);
    setFormData({ name: '', phone: '', vehicle: '', status: 'active' });
    if (location.pathname === '/partners/new') {
      navigate('/partners');
    }
  };

  return (
    <Layout title="Delivery Partners">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Delivery Partners</h1>
          <p className="text-gray-500 mt-1">Manage your delivery partners</p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          variant="primary"
        >
          Add New Partner
        </Button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 mt-4 animate-fade-in-down">
          <h2 className="text-lg font-bold text-gray-900 mb-6">
            {editingPartner ? 'Edit Partner' : 'Add New Partner'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter partner name"
              />

              <Input
                label="Phone *"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1234567890"
              />

              <Input
                label="Vehicle"
                name="vehicle"
                value={formData.vehicle}
                onChange={handleInputChange}
                placeholder="Enter vehicle info"
              />

              <div>
                <label className="block text-sm font-semibold text-gray-700 ml-1 mb-1.5">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 ease-in-out sm:text-sm"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-50">
              <Button
                type="button"
                onClick={handleCloseForm}
                variant="secondary"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={submitting}
                variant="primary"
              >
                {editingPartner ? 'Update Partner' : 'Create Partner'}
              </Button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Partner
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {partners.map((partner) => (
                <tr key={partner._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">
                      {partner.name || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600 font-medium">{partner.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">
                      {partner.vehicle || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${partner.status === 'active'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-red-100 text-red-700'
                      }`}>
                      {partner.status.charAt(0).toUpperCase() + partner.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                    <button
                      onClick={() => handleEdit(partner)}
                      className="text-primary hover:text-primary-dark transition-colors font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(partner._id)}
                      className="text-red-500 hover:text-red-700 transition-colors font-semibold"
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

export default Partners;

