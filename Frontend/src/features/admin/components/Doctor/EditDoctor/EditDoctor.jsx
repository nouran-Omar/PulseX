import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import ConfirmModal from '../../ConfirmModal/ConfirmModal';
import { LuUpload, LuUser } from 'react-icons/lu';
import { TbTrash } from "react-icons/tb";
import {
  HiOutlineEnvelope, HiOutlinePhone, HiOutlineCalendarDays,
  HiOutlineLockClosed, HiOutlineMapPin, HiOutlineCurrencyDollar, HiMiniUserPlus, HiOutlineCheckCircle,
} from 'react-icons/hi2';
import { editDoctorValidationSchema } from '../../DoctorForm/shared/doctorValidationSchema';
import FieldError from '../../DoctorForm/shared/FieldError';
import InputField from '../../DoctorForm/shared/InputField';
import MOCK_DOCTORS from './doctorsMockById';

export default function EditDoctor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [imagePreview, setImagePreview] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const formik = useFormik({
    initialValues: { firstName: '', lastName: '', email: '', phone: '', dateOfBirth: null, password: '', location: '', price: '', gender: 'Male', image: null },
    validationSchema: editDoctorValidationSchema,
    onSubmit: async (values) => {
      console.log("Updated Values:", values);
      navigate('/admin/doctors/list', { state: { success: true, title: 'Updated Successfully' } });
    },
  });

  useEffect(() => {
    const data = MOCK_DOCTORS[Number(id)] || MOCK_DOCTORS[1];
    formik.setValues({ ...data, password: '' });
    setImagePreview(data.image);
  }, [id]);

  const handleDeleteConfirm = () => {
    setIsDeleteModalOpen(false);
    navigate('/admin/doctors/list', { state: { success: true, title: 'Deleted' } });
  };

  const handleImageChange = (e) => {
    const file = e.currentTarget.files[0];
    if (!file) return;
    formik.setFieldValue('image', file);
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <section className="bg-white  overflow-hidden min-h-screen">
      
      {/* Header - Solid Blue Matching Patient Page */}
      <header className="bg-[#155dfc] p-6 md:p-8 flex items-center gap-3 md:gap-4">
        <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 flex items-center justify-center rounded-xl bg-white/20 text-white text-[20px] md:text-[24px]">
          <HiMiniUserPlus />
        </div>
        <div>
          <h1 className="text-[20px] md:text-[24px] font-bold text-white leading-tight">Edit Doctor</h1>
          <p className="text-[14px] md:text-[16px] text-blue-100/90 font-normal mt-1 md:mt-0">View, edit, and manage all registered Doctors.</p>
        </div>
      </header>

      <form onSubmit={formik.handleSubmit} className="py-8 px-4 md:py-12 md:pl-8 md:pr-8 lg:pr-[145px]">
        
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] xl:grid-cols-[280px_1fr] gap-8 md:gap-12">
          
          {/* Column 1: Upload Photo */}
          <div className="flex flex-col gap-4">
            <p className="text-[16px] font-normal text-[#344054]">Upload Photo</p>
            <label className="border-2 border-dashed border-[#D1E1FF] bg-[#F0F6FF] rounded-[20px] flex flex-col items-center justify-center p-6 min-h-[250px] cursor-pointer hover:bg-[#e6efff] transition-all">
              <input type="file" accept="image/*" hidden onChange={handleImageChange} />
              {imagePreview ? (
                <img src={imagePreview} className="w-full h-full object-cover rounded-[15px]" alt="Doctor preview" />
              ) : (
                <div className="text-center flex flex-col items-center">
                  <div className="w-14 h-14 bg-[#E0EBFF] rounded-2xl flex items-center justify-center text-[#155dfc] text-[24px] mb-4">
                    <LuUpload />
                  </div>
                  <p className="text-[16px] font-normal text-[#101828]">Click to upload photo</p>
                </div>
              )}
            </label>
          </div>

          {/* Column 2: Personal Information */}
          <div className="bg-[#F9FAFB] border border-gray-200 rounded-[24px] p-5 md:p-8 shadow-sm h-fit">
            <div className="flex items-center gap-2 mb-6 md:mb-8 text-[#155dfc]">
              <LuUser className="text-[20px]" />
              <span className="text-[18px] font-normal text-[#101828]">Personal Information</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <InputField label="First Name" name="firstName" formik={formik} placeholder="Enter first name" requiredColorClass="text-[#DC2626]" errorColorClass="text-[#DC2626]" />
              <InputField label="Last Name" name="lastName" formik={formik} placeholder="Enter last name" requiredColorClass="text-[#DC2626]" errorColorClass="text-[#DC2626]" />
              <InputField label="Email Address" name="email" icon={HiOutlineEnvelope} formik={formik} placeholder="doctor@pulsex.com" requiredColorClass="text-[#DC2626]" errorColorClass="text-[#DC2626]" />
              <InputField label="Phone Number" name="phone" icon={HiOutlinePhone} formik={formik} placeholder="+20 1000000000" requiredColorClass="text-[#DC2626]" errorColorClass="text-[#DC2626]" />
              
              <div className="flex flex-col gap-2">
                <label className="text-[16px] font-normal text-[#344054]">Date of Birth <span className="text-[#DC2626]">*</span></label>
                <div className={`flex items-center gap-2 px-4 py-3 rounded-full border bg-white ${formik.touched.dateOfBirth && formik.errors.dateOfBirth ? 'border-red-400' : 'border-gray-200'}`}>
                  <HiOutlineCalendarDays className="text-gray-400 text-[20px]" />
                  <DatePicker 
                    selected={formik.values.dateOfBirth} 
                    onChange={(date) => formik.setFieldValue('dateOfBirth', date)} 
                    className="w-full outline-none text-[16px] font-normal bg-transparent" 
                    placeholderText="Select date" 
                    dateFormat="MMM dd, yyyy"
                  />
                </div>
                <FieldError msg={formik.touched.dateOfBirth && formik.errors.dateOfBirth ? formik.errors.dateOfBirth : ''} textClassName="text-[#DC2626]" />
              </div>

              <InputField label="Password" name="password" type="password" icon={HiOutlineLockClosed} formik={formik} placeholder="Leave empty to keep current" requiredColorClass="text-[#DC2626]" errorColorClass="text-[#DC2626]" />
              <InputField label="Location" name="location" icon={HiOutlineMapPin} formik={formik} placeholder="City, Country" requiredColorClass="text-[#DC2626]" errorColorClass="text-[#DC2626]" />
              <InputField label="Consultation Price" name="price" type="number" icon={HiOutlineCurrencyDollar} formik={formik} placeholder="0.00" requiredColorClass="text-[#DC2626]" errorColorClass="text-[#DC2626]" />
            </div>

            {/* Gender Section with Custom Radio Buttons */}
            <div className="mt-6 md:mt-8">
              <p className="text-[16px] font-normal text-[#344054] mb-3 md:mb-4">Gender <span className="text-[#DC2626]">*</span></p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                
                {/* Male Radio */}
                <label className={`flex-1 flex items-center justify-center gap-3 py-3 md:py-4 rounded-full border transition-all cursor-pointer shadow-sm
                  ${formik.values.gender === 'Male' ? 'bg-[#155dfc] border-[#155dfc] text-white' : 'bg-white border-gray-200 text-gray-500'}`}>
                  <div className="relative flex items-center justify-center">
                    <input type="radio" name="gender" value="Male" checked={formik.values.gender === 'Male'} onChange={() => formik.setFieldValue('gender', 'Male')} className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-full checked:border-white transition-all cursor-pointer" />
                    <div className="absolute w-2.5 h-2.5 bg-white rounded-full scale-0 peer-checked:scale-100 transition-transform" />
                  </div>
                  <span className="text-[15px] md:text-[16px] font-normal">Male</span>
                </label>

                {/* Female Radio */}
                <label className={`flex-1 flex items-center justify-center gap-3 py-3 md:py-4 rounded-full border transition-all cursor-pointer shadow-sm
                  ${formik.values.gender === 'Female' ? 'bg-[#e91e63] border-[#e91e63] text-white' : 'bg-white border-gray-200 text-gray-500'}`}>
                  <div className="relative flex items-center justify-center">
                    <input type="radio" name="gender" value="Female" checked={formik.values.gender === 'Female'} onChange={() => formik.setFieldValue('gender', 'Female')} className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-full checked:border-white transition-all cursor-pointer" />
                    <div className="absolute w-2.5 h-2.5 bg-white rounded-full scale-0 peer-checked:scale-100 transition-transform" />
                  </div>
                  <span className="text-[15px] md:text-[16px] font-normal">Female</span>
                </label>
              </div>
              <FieldError msg={formik.touched.gender && formik.errors.gender ? formik.errors.gender : ''} textClassName="text-[#DC2626]" />
            </div>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col sm:flex-row items-center sm:justify-end gap-3 md:gap-4 mt-8 md:mt-12">
          <button type="button" onClick={() => navigate('/admin/doctors/list')} className="w-full sm:w-auto px-8 md:px-12 py-3 md:py-3.5 rounded-full bg-[#E4E7EC] text-[#344054] text-[15px] md:text-[16px] font-normal hover:bg-gray-300 transition-all cursor-pointer">
            Cancel
          </button>
          
          <button type="button" onClick={() => setIsDeleteModalOpen(true)} className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 md:px-10 py-3 md:py-3.5 rounded-full bg-[#DC2626] text-white border border-red-200 text-[15px] md:text-[16px] font-normal hover:bg-[#fc4242] transition-all cursor-pointer">
            <TbTrash className="text-[18px] md:text-[20px]" /> Delete
          </button>

          <button type="submit" disabled={formik.isSubmitting} className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 md:px-12 py-3 md:py-3.5 rounded-full bg-[#333CF5] text-white text-[15px] md:text-[16px] font-normal hover:bg-[#2830d4] transition-all shadow-lg cursor-pointer">
            <HiOutlineCheckCircle className="text-[18px] md:text-[20px]" />
            {formik.isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>

      <ConfirmModal isOpen={isDeleteModalOpen} title="Delete Doctor?" desc="Are you sure you want to delete this doctor? This action is permanent." onConfirm={handleDeleteConfirm} onCancel={() => setIsDeleteModalOpen(false)} />
    </section>
  );
}
