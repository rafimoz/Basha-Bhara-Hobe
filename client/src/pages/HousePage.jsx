// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
import image from '../assets/unit.jpg'
import star from '../assets/star.svg'


export default function HousePage() {
  // const { adminId } = useParams();
  // const [ads, setAds] = useState([]);

  // useEffect(() => {
  //   fetch(`http://localhost:5000/api/ads/${adminId}`)
  //     .then(res => res.json())
  //     .then(setAds);
  // }, [adminId]);

  return (
    <section className="p-6">

      <h1 className="text-6xl font-bold mb-7 leading-13">Available <br></br> Units</h1>

      <div className='w-full grid md:grid-cols-3 gap-6'>
      <section className="bg-black text-white gap-6 rounded-2xl overflow-hidden cursor-pointer">
          <div className="flex overflow-x-auto no-scrollbar">
            <img className="bg-cover" src={image} />
          </div>
          <div className='p-4'>
            <div className='flex items-center justify-between'>
              <h2 className="text-4xl font-bold">2nd Floor</h2>
              <div className='flex items-center justify-center'>
                <p className="font-bold text-sm absolute z-10">5000৳</p>
                <img className='scale-110' src={star} />
              </div>
            </div>
            <p className='mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate molestiae.</p>
            <p>Available from: <span className='font-bold'>1st May 2025</span></p>
          </div>
      </section>
      
      <section className="bg-black text-white gap-6 rounded-2xl overflow-hidden cursor-pointer">
          <div className="overflow-x-auto">
            <img className="bg-cover" src={image} />
          </div>
          <div className='p-4'>
            <div className='flex items-center justify-between'>
              <h2 className="text-4xl font-bold">2nd Floor</h2>
              <div className='flex items-center justify-center'>
                <p className="font-bold text-sm absolute z-10">5000৳</p>
                <img className='scale-110' src={star} />
              </div>
            </div>
            <p className='mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate molestiae.</p>
            <p>Available from: <span className='font-bold'>1st May 2025</span></p>
          </div>
      </section>

      <section className=" bg-black text-white gap-6 rounded-2xl overflow-hidden cursor-pointer">
          <div className="overflow-x-auto">
            <img className="bg-cover" src={image} />
          </div>
          <div className='p-4'>
            <div className='flex items-center justify-between'>
              <h2 className="text-4xl font-bold">2nd Floor</h2>
              <div className='flex items-center justify-center'>
                <p className="font-bold text-sm absolute z-10">5000৳</p>
                <img className='scale-110' src={star} />
              </div>
            </div>
            <p className='mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate molestiae.</p>
            <p>Available from: <span className='font-bold'>1st May 2025</span></p>
          </div>
      </section>

      </div>
    </section>
  );
}