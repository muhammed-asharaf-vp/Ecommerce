import { useState } from 'react';
import api from '../../../Api/Axios';
import AdminLayout from '../AdminLayout';
import { useNavigate } from 'react-router-dom';

const AddNewProductPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    count: '',
    category: 'men\'s',
    warranty: '2 years',
    isActive: true,
    images: ['']
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
  };

  const addImageField = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };

  const removeImageField = (index) => {
    if (formData.images.length > 1) {
      const newImages = formData.images.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        images: newImages
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Valid price is required';
    }

    if (!formData.count || formData.count < 0) {
      newErrors.count = 'Valid stock quantity is required';
    }

    if (!formData.warranty.trim()) {
      newErrors.warranty = 'Warranty information is required';
    }

    // Validate images
    const validImages = formData.images.filter(img => img.trim() !== '');
    if (validImages.length === 0) {
      newErrors.images = 'At least one image URL is required';
    }

    // Validate image URLs
    formData.images.forEach((img, index) => {
      if (img.trim() && !isValidUrl(img)) {
        newErrors[`image-${index}`] = 'Please enter a valid image URL';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const generateProductId = () => {
    const categories = {
      "men's": 'm',
      "women's": 'w'
    };
    const prefix = categories[formData.category] || 'p';
    const timestamp = Date.now().toString(36);
    return `${prefix}${timestamp.slice(-6)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const productData = {
        ...formData,
        id: generateProductId(),
        price: parseFloat(formData.price),
        count: parseInt(formData.count),
        images: formData.images.filter(img => img.trim() !== ''),
        created_at: new Date().toISOString()
      };

      const response = await api.post('/products', productData);
      
      if (response.status === 201) {
        alert('Product added successfully!');
        navigate('/admin-allproducts'); // Redirect to products list
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      navigate('/admin-newproducts');
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
              <p className="text-gray-600 mt-2">Create a new product listing for your store</p>
            </div>
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                  Basic Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Product Name */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        errors.name ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter product name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="4"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        errors.description ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter product description"
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                    )}
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price ($) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-500">$</span>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          errors.price ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    {errors.price && (
                      <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                    )}
                  </div>

                  {/* Stock Quantity */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock Quantity *
                    </label>
                    <input
                      type="number"
                      name="count"
                      value={formData.count}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        errors.count ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="0"
                      min="0"
                    />
                    {errors.count && (
                      <p className="mt-1 text-sm text-red-600">{errors.count}</p>
                    )}
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                      <option value="men's">Men's Watches</option>
                      <option value="women's">Women's Watches</option>
                    </select>
                  </div>

                  {/* Warranty */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Warranty *
                    </label>
                    <input
                      type="text"
                      name="warranty"
                      value={formData.warranty}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        errors.warranty ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="e.g., 2 years"
                    />
                    {errors.warranty && (
                      <p className="mt-1 text-sm text-red-600">{errors.warranty}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Images Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                  Product Images
                </h2>
                
                <div className="space-y-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Image URL {index + 1}
                        </label>
                        <input
                          type="url"
                          value={image}
                          onChange={(e) => handleImageChange(index, e.target.value)}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            errors[`image-${index}`] ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="https://example.com/image.jpg"
                        />
                        {errors[`image-${index}`] && (
                          <p className="mt-1 text-sm text-red-600">{errors[`image-${index}`]}</p>
                        )}
                      </div>
                      {formData.images.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeImageField(index)}
                          className="mt-8 px-3 py-3 text-red-600 hover:text-red-700 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                  
                  {errors.images && (
                    <p className="text-sm text-red-600">{errors.images}</p>
                  )}

                  <button
                    type="button"
                    onClick={addImageField}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Add Another Image</span>
                  </button>
                </div>

                {/* Image Preview */}
                {formData.images.some(img => img.trim() !== '') && (
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Image Preview</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {formData.images.map((image, index) => (
                        image.trim() && (
                          <div key={index} className="border rounded-lg p-2">
                            <img
                              src={image}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-24 object-cover rounded"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/150?text=Invalid+URL';
                              }}
                            />
                            <p className="text-xs text-gray-500 mt-1 truncate">
                              Image {index + 1}
                            </p>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Status */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                  Product Status
                </h2>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-3 block text-sm font-medium text-gray-900">
                    Activate this product
                  </label>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  When active, this product will be visible to customers in your store.
                </p>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Adding Product...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span>Add Product</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddNewProductPage;