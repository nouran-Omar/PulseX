import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { LuUpload, LuUser } from 'react-icons/lu';
import {
  HiOutlineEnvelope, HiOutlinePhone, HiOutlineCalendarDays,
  HiOutlineLockClosed, HiOutlineMapPin, HiOutlineCurrencyDollar, HiMiniUserPlus,
} from 'react-icons/hi2';
import { createDoctorValidationSchema } from '../../DoctorForm/shared/doctorValidationSchema';
import FieldError from '../../DoctorForm/shared/FieldError';
import InputField from '../../DoctorForm/shared/InputField';

export default function AddDoctorBtn() {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);

  const formik = useFormik({
    initialValues: {
      firstName: '', lastName: '', email: '', phone: '',
      dateOfBirth: null, password: '', location: '', price: '',
      gender: 'Male', image: null,
    },
    validationSchema: createDoctorValidationSchema,
    onSubmit: async (values) => {
      console.log("Doctor Form Submitted", values);
      navigate('/admin/doctors/list');
    },
  });

  const handleImageChange = (e) => {
    const file = e.currentTarget.files[0];
    if (!file) return;
    formik.setFieldValue('image', file);
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <section className="bg-white overflow-hidden min-h-screen">
      
      {/* Header - Matching Patient Page */}
      <header className="bg-[#155dfc] p-6 md:p-8 flex items-center gap-3 md:gap-4">
        <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 flex items-center justify-center rounded-xl bg-white/20 text-white text-[20px] md:text-[24px]">
          <HiMiniUserPlus />
        </div>
        <div>
          <h1 className="text-[20px] md:text-[24px] font-bold text-white leading-tight">Add New Doctor</h1>
          <p className="text-[14px] md:text-[16px] text-blue-100/90 font-normal mt-1 md:mt-0">Fill in the details to register a new doctor on the platform.</p>
        </div>
      </header>

      {/* Form Content - Same Spacing as Patient Page */}
      <form onSubmit={formik.handleSubmit} className="py-8 px-4 md:py-12 md:pl-8 md:pr-8 lg:pr-[145px]">
        
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] xl:grid-cols-[280px_1fr] gap-8 md:gap-12">
          
          {/* Column 1: Upload Photo */}
          <div className="flex flex-col gap-4">
            <p className="text-[16px] font-normal text-[#344054]">Upload Photo</p>
            <label className="border-2 border-dashed border-[#D1E1FF] bg-[#F0F6FF] rounded-[20px] flex flex-col items-center justify-center p-6 min-h-[250px] cursor-pointer hover:bg-[#e6efff] transition-all">
              <input type="file" accept="image/*" hidden onChange={handleImageChange} />
              {imagePreview ? (
                <img src={imagePreview} className="w-full h-full object-cover rounded-[15px]" alt="preview" />
              ) : (
                <div className="text-center flex flex-col items-center">
                  <div className="w-14 h-14 bg-[#E0EBFF] rounded-2xl flex items-center justify-center text-[#155dfc] text-[24px] mb-4">
                    <LuUpload />
                  </div>
                  <p className="text-[16px] font-normal text-[#101828]">Click to upload photo</p>
                  <p className="text-[14px] text-gray-500 mt-1 font-normal">PNG, JPG up to 10MB</p>
                </div>
              )}
            </label>
          </div>

          {/* Column 2: Doctor Information Form */}
          <div className="bg-[#F9FAFB] border border-gray-200 rounded-[24px] p-5 md:p-8 shadow-sm h-fit">
            <div className="flex items-center gap-2 mb-6 md:mb-8 text-[#155dfc]">
              <LuUser className="text-[20px]" />
              <span className="text-[18px] font-normal text-[#101828]">Personal Information</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <InputField label="First Name" name="firstName" formik={formik} placeholder="Enter first name" />
              <InputField label="Last Name" name="lastName" formik={formik} placeholder="Enter last name" />
              <InputField label="Email Address" name="email" type="email" formik={formik} placeholder="doctor@pulsex.com" icon={HiOutlineEnvelope} />
              <InputField label="Phone Number" name="phone" formik={formik} placeholder="+20 1000000000" icon={HiOutlinePhone} />
              
              <div className="flex flex-col gap-2">
                <label className="text-[16px] font-normal text-[#344054]">Date of Birth <span className="text-red-500">*</span></label>
                <div className={`flex items-center gap-2 px-4 py-3 rounded-full border bg-white ${formik.touched.dateOfBirth && formik.errors.dateOfBirth ? 'border-red-400' : 'border-gray-200'}`}>
                  <HiOutlineCalendarDays className="text-gray-400 text-[20px]" />
                  <DatePicker
                    selected={formik.values.dateOfBirth}
                    onChange={(date) => formik.setFieldValue('dateOfBirth', date)}
                    placeholderText="Select date"
                    className="w-full outline-none text-[16px] font-normal bg-transparent"
                  />
                </div>
                <FieldError msg={formik.touched.dateOfBirth && formik.errors.dateOfBirth ? formik.errors.dateOfBirth : ''} textClassName="text-red-500" />
              </div>

              <InputField label="Password" name="password" type="password" formik={formik} placeholder="Create a strong password" icon={HiOutlineLockClosed} />
              <InputField label="Location" name="location" formik={formik} placeholder="Enter doctor location" icon={HiOutlineMapPin} />
              <InputField label="Consultation Price" name="price" type="number" formik={formik} placeholder="Enter price" icon={HiOutlineCurrencyDollar} />
            </div>

            {/* Gender Section - Same Pink/Blue Style */}
            <div className="mt-8">
              <p className="text-[16px] font-normal text-[#344054] mb-4">Gender <span className="text-red-500">*</span></p>
              <div className="flex flex-col md:flex-row gap-4">
                
                {/* Male Radio */}
                <label className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-full border transition-all cursor-pointer shadow-sm
                  ${formik.values.gender === 'Male' 
                    ? 'bg-[#155dfc] border-[#155dfc] text-white' 
                    : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                  <div className="relative flex items-center justify-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={formik.values.gender === 'Male'}
                      onChange={() => formik.setFieldValue('gender', 'Male')}
                      className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-full checked:border-white transition-all"
                    />
                    <div className="absolute w-2.5 h-2.5 bg-white rounded-full scale-0 peer-checked:scale-100 transition-transform" />
                  </div>
                  <span className="text-[16px] font-normal">Male</span>
                </label>

                {/* Female Radio */}
                <label className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-full border transition-all cursor-pointer shadow-sm
                  ${formik.values.gender === 'Female' 
                    ? 'bg-[#e91e63] border-[#e91e63] text-white' 
                    : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                  <div className="relative flex items-center justify-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={formik.values.gender === 'Female'}
                      onChange={() => formik.setFieldValue('gender', 'Female')}
                      className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-full checked:border-white transition-all"
                    />
                    <div className="absolute w-2.5 h-2.5 bg-white rounded-full scale-0 peer-checked:scale-100 transition-transform" />
                  </div>
                  <span className="text-[16px] font-normal">Female</span>
                </label>

              </div>
              <FieldError msg={formik.touched.gender && formik.errors.gender ? formik.errors.gender : ''} textClassName="text-red-500" />
            </div>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-end gap-4 mt-12">
          <button
            type="button"
            onClick={() => navigate('/admin/doctors/list')}
            className="w-full md:w-auto px-12 cursor-pointer py-3.5 rounded-full bg-[#E4E7EC] text-[#344054] text-[16px] font-normal hover:bg-gray-300 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full md:w-auto flex cursor-pointer items-center justify-center gap-2 px-12 py-3.5 rounded-full bg-[#333CF5] text-white text-[16px] font-normal hover:bg-[#2830d4] transition-all shadow-lg"
          >
            <HiMiniUserPlus className="text-[20px] " />
            {formik.isSubmitting ? 'Creating...' : 'Create Doctor'}
          </button>
        </div>
      </form>
    </section>
  );
}