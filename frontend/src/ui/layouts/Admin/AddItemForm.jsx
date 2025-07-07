import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import imageCompression from 'browser-image-compression';
import {
  setImagePreview,
  setImageFile,
  setProductData,
  resetProductData,
} from '../../../core/redux/AdminStockSlice/AdminStockSlice';
import request from '../../../lib/remote/axios';

const AddItemForm = () => {
  const dispatch = useDispatch();
  const { imagePreview, productData, category, imageFile } = useSelector(
  (state) => state.adminStock.stock
);


  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [attributes, setAttributes] = useState({
    "category":"tobacco"
  });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const options = {
        maxSizeMB: 0.1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };

      const compressed = await imageCompression(file, options);
      const url = URL.createObjectURL(compressed);

      dispatch(setImagePreview(url));
      dispatch(setImageFile(compressed));
    } catch (error) {
      console.error('Image compression error:', error);
    }
  };

  const handleChange = (e) => {
    dispatch(setProductData({ ...productData, [e.target.name]: e.target.value }));
  };

  const handleAttributeChange = (e) => {
  setAttributes((prev) => ({
    ...prev,
    [e.target.name]: e.target.value,
  }));
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.entries(productData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append('attributes', JSON.stringify(attributes));
    formData.append('image', imageFile);
    formData.append('category', category);
    formData.append('category_id', 1);

   
    const res = await request({
      method: 'POST',
      route: `/products`,
      body: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    
    setLoading(false);
    setMessage(res.message);

    if (res.success) {
      dispatch(resetProductData());
      dispatch(setImagePreview(null));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full sm:w-1/2 gap-2 p-4"
      encType="multipart/form-data"
    >
      <label className="text-sm font-bold">Upload Product Image</label>
      <input type="file" accept="image/*" onChange={handleImageChange} />

      {imagePreview && (
        <img src={imagePreview} alt="preview" className="max-w-xs rounded" />
      )}

      <input
        type="text"
        name="name"
        placeholder="Name"
        className="border border-primary rounded px-2 h-8"
        value={productData.name || ''}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price (in IQD)"
        className="border border-primary rounded px-2 h-8"
        value={productData.price || ''}
        onChange={handleChange}
        required
      />

      {/* Category-specific inputs */}
      {category === 'tobacco' && (
        <>
          <select name="flavor" onChange={handleAttributeChange} required className="border border-primary rounded px-2 h-8">
            <option hidden>Flavor</option>
            <option value="cool">Cool</option>
            <option value="fruity">Fruity</option>
            <option value="sour">Sour</option>
            <option value="sweet">Sweet</option>
          </select>
          <select name="size" onChange={handleAttributeChange} required className="border border-primary rounded px-2 h-8">
            <option hidden>Size</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </>
      )}

      {category === 'shisha' && (
        <>
          <select name="color" onChange={handleChange} required className="border border-primary rounded px-2 h-8">
            <option hidden>Color</option>
            <option value="black">Black</option>
            <option value="blue">Blue</option>
            <option value="red">Red</option>
            <option value="green">Green</option>
          </select>
          <select name="size" onChange={handleChange} required className="border border-primary rounded px-2 h-8">
            <option hidden>Size</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </>
      )}

      {category === 'parts' && (
        <select name="type" onChange={handleChange} required className="border border-primary rounded px-2 h-8">
          <option hidden>Type</option>
          <option value="bowl">Bowl</option>
          <option value="tray">Tray</option>
          <option value="hose">Hose</option>
          <option value="base">Base</option>
          <option value="mouthpiece">Mouthpiece</option>
          <option value="grommet">Grommet</option>
          <option value="downsteam">Downsteam</option>
          <option value="valve">Valve</option>
          <option value="diffuser">Diffuser</option>
        </select>
      )}

      <textarea
        name="description"
        placeholder="Description"
        className="border border-primary rounded px-2 h-24"
        value={productData.description || ''}
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        className="bg-secondary text-tertiary rounded h-10 font-bold mt-2"
        disabled={loading}
      >
        {loading ? 'Adding...' : 'Add Item'}
      </button>

      {message && <p className="text-sm mt-2">{message}</p>}
    </form>
  );
};

export default AddItemForm;
