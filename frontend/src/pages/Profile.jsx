import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';

// Compress image utility (same as you had)
const compressImage = (file) => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error("File is not an image."));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const maxWidth = 800;
        const quality = 0.7;

        let newWidth = img.width;
        let newHeight = img.height;

        if (newWidth > maxWidth) {
          newHeight = Math.floor(newHeight * (maxWidth / newWidth));
          newWidth = maxWidth;
        }

        canvas.width = newWidth;
        canvas.height = newHeight;
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };

      img.onerror = () => reject(new Error("Failed to load image for compression."));
    };

    reader.onerror = () => reject(new Error("Failed to read file for compression."));
    reader.readAsDataURL(file);
  });
};

const Profile = () => {
  const { user, setUser, backendURL, toggleRefreshAds, toast } = useOutletContext();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    image: '',
    email: '',
  });
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form when user changes
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        phone: user.phone || '',
        image: user.image || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const compressedDataUrl = await compressImage(file);
        setForm(prev => ({ ...prev, image: compressedDataUrl }));
      } catch (error) {
        console.error("Error compressing image:", error);
        toast.error("Failed to compress image");
      }
    }
  };

  const updateProfile = async () => {
    if (!form.name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    setIsLoading(true);
    try {
      const res = await axios.put(`${backendURL}/api/user/update/${user._id}`, {
        name: form.name,
        phone: form.phone,
        image: form.image,
        email: form.email,
      });
      if (res.data.success) {
        setUser(res.data.user); // update user in parent context
        setIsEdit(false);
      }
      toggleRefreshAds()
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
      toast.success("Profile Updated Successfully");
    }
  };

  return (
    <div className="min-h-screen dark:bg-bg-dark bg-bg-light font-sans">
      <main className="max-w-7xl mx-auto px-4 py-4 sm:py-6 lg-py-8 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold sm:mb-5 mt-18 mb-8 dark:text-title-dark text-title-light">Profile</h2>
        <div className='relative grid sm:grid-cols-[1fr_2fr] grid-cols-1 items-center gap-4 p-4 dark:bg-card-dark/20 bg-card-light/20 rounded-4xl shadow-xl overflow-hidden'>
          <div className='w-full flex justify-center'>
            {isEdit ? (
              <label htmlFor='image' className='rounded-full cursor-pointer'>
                <div className='relative sm:w-70 sm:h-70 w-40 h-40 rounded-full overflow-hidden'>
                  <img
                    className='object-cover opacity-50'
                    src={form.image}
                    alt="edit"
                  />
                  <svg width="30" height="30" className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6432 0.106781L3.03644 13.7136L0.118958 22.881L9.28644 19.9636L22.8932 6.35678C22.8932 6.35678 22.789 4.16824 20.8099 2.19012C18.8307 0.210948 16.6432 0.106781 16.6432 0.106781ZM17.0338 1.79949C18.1505 2.01199 19.0395 2.48502 19.7255 3.18905C20.4114 3.89308 20.8943 4.82814 21.2005 5.96616L19.3125 7.85418L15.1458 3.68751L16.6432 2.19012L17.0338 1.79949ZM4.18594 14.7573C4.19825 14.7604 5.43848 15.0739 6.68227 16.3177C8.03644 17.5677 8.24477 18.7144 8.24477 18.7144L8.28953 18.7673L4.59283 19.9575L3.03441 18.399L4.18594 14.7573Z" fill="#FFFF" />
                  </svg>
                </div>
                <input onChange={handleImageChange} type="file" id='image' hidden />
              </label>
            ) : (
              <div className='sm:w-70 sm:h-70 w-40 h-40 rounded-full overflow-hidden'>
                <img
                  className='object-cover'
                  src={form.image}
                  alt="profile"
                />
              </div>
            )}
          </div>
          <div className='dark:bg-card-dark bg-card-light dark:text-subtitle-dark text-subtitle-light border border-title-light/10 dark:border-title-dark/10 rounded-3xl p-4 flex flex-col gap-2 w-full h-full'>
            <div className='flex items-center gap-2'>
              <p className='font-bold'>Name:</p>
              {isEdit
                ? <input type="text" value={form.name} onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))} className='uppercase bg-subtitle-dark/10 p-2 rounded-2xl w-full' />
                : <p className='uppercase p-2 rounded-2xl'>{form.name}</p>}
            </div>
            <div className='flex items-center gap-2'>
              <p className='font-bold'>Phone:</p>
              {isEdit
                ? <input type="text" value={form.phone} onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))} className='uppercase bg-subtitle-dark/10 p-2 rounded-2xl w-full' />
                : <p className='uppercase p-2 rounded-2xl'>{form.phone}</p>}
            </div>
            <div className='flex items-center gap-2'>
              <p className='font-bold'>Email:</p>
              <p className='p-2 rounded-2xl'>{form.email}</p>
            </div>
            <div className='flex justify-between items-end h-full mt-2 gap-2'>
              {isEdit
                ? <button onClick={updateProfile} disabled={isLoading} className={`cursor-pointer p-2 w-full dark:text-title-light text-title-dark dark:hover:bg-subtitle-dark dark:bg-subtitle-dark bg-subtitle-light rounded-full px-3`}>
                  {isLoading ? "Updating..." : "Update"}
                </button>
                : <button onClick={() => setIsEdit(true)} className='p-2 w-full dark:text-title-light text-title-dark dark:hover:bg-subtitle-dark dark:bg-subtitle-dark bg-subtitle-light rounded-full px-3 cursor-pointer'>Edit</button>}
              <button onClick={() => setIsEdit(false)} className={`${isEdit ? "block" : "hidden"} p-2 w-full bg-red-400 hover:bg-red-500 text-white rounded-full px-3 cursor-pointer`}>Cancel</button>
            </div>
          </div>
          {isLoading && (
            <div className='w-full h-full absolute flex justify-center items-center z-10 bg-white/10 backdrop-blur-xs'>
              <svg className="animate-spin h-10 w-10 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="#FFFF" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;
