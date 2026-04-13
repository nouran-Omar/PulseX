import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { LuUpload, LuUser } from 'react-icons/lu';
import {
  HiOutlineEnvelope, HiOutlinePhone, HiOutlineCalendarDays,
  HiOutlineLockClosed, HiMiniUserPlus,
} from 'react-icons/hi2';
import { createPatientValidationSchema } from '../../PatientForm/shared/patientValidationSchema';
import FieldError from '../../PatientForm/shared/FieldError';
import InputField from '../../PatientForm/shared/InputField';

export default function AddPatientBtn() {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);

  const formik = useFormik({
    initialValues: {
      firstName: '', lastName: '', email: '', phone: '',
      dateOfBirth: null, password: '', gender: 'Female', image: null,
    },
    validationSchema: createPatientValidationSchema,
    onSubmit: async (values) => {
      console.log("Form Submitted", values);
      navigate('/admin/patients/list');
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
      
      {/* Header */}
      <header className="bg-[#155dfc] p-4 md:p-8 flex items-center gap-4">
        <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-xl bg-white/20 text-white text-[24px]">
          <HiMiniUserPlus />
        </div>
        <div>
          <h1 className="text-[24px] font-bold text-white leading-tight">Add New Patient</h1>
          <p className="text-[16px] text-blue-100/90 font-normal">View, edit, and manage all registered Patients.</p>
        </div>
      </header>

      {/* Grid Layout: Left Margin Small (pl-8), Right Margin (pr-[145px]) */}
      <form onSubmit={formik.handleSubmit} className="py-6 md:py-12 px-4 md:px-8 lg:pl-8 lg:pr-[145px]">
        
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
          
          {/* Column 1: Upload Photo */}
         <div className="flex flex-col gap-4 w-full">
  {/* العنوان متوسن لو تحب، أو سيبه على الشمال حسب التصميم */}
  <p className="text-[16px] font-normal text-[#344054] ">Upload Photo</p>
  
  <label className="border-2 border-dashed border-[#D1E1FF] bg-[#F0F6FF] rounded-[20px] flex flex-col items-center justify-center p-6 min-h-[250px] cursor-pointer hover:bg-[#e6efff] transition-all overflow-hidden">
    <input type="file" accept="image/*" hidden onChange={handleImageChange} />
    
    {imagePreview ? (
      <div className="w-full h-full flex items-center justify-center">
        <img 
          src={imagePreview} 
          className="max-w-full max-h-[200px] object-contain rounded-[15px]" 
          alt="preview" 
        />
      </div>
    ) : (
      <div className="text-center flex flex-col items-center justify-center">
        {/* أيقونة الرفع */}
        <div className="w-14 h-14 bg-[#E0EBFF] rounded-2xl flex items-center justify-center text-[#155dfc] text-[24px] mb-4 shadow-sm">
          <LuUpload />
        </div>
        
        {/* النصوص */}
        <p className="text-[16px] font-normal text-[#101828]">Click to upload photo</p>
        <p className="text-[14px] text-gray-500 mt-1 font-normal">PNG, JPG up to 10MB</p>
      </div>
    )}
  </label>
</div>

          {/* Column 2: Personal Information Form */}
          <div className="bg-[#F9FAFB] border border-gray-200 rounded-[24px] p-8 shadow-sm h-fit">
            <div className="flex items-center gap-2 mb-8 text-[#155dfc]">
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
                <FieldError msg={formik.touched.dateOfBirth && formik.errors.dateOfBirth ? formik.errors.dateOfBirth : ''} />
              </div>

              <InputField label="Password" name="password" type="password" formik={formik} placeholder="Create a strong password" icon={HiOutlineLockClosed} />
            </div>

            {/* Gender Section with Background Styles as in Picture */}
            <div className="mt-8">
              <p className="text-[16px] font-normal text-[#344054] mb-4">Gender <span className="text-red-500">*</span></p>
              <div className="flex flex-col sm:flex-row gap-4">
                
                {/* Male Radio Button */}
                <label className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-full border transition-all cursor-pointer shadow-sm
                  ${formik.values.gender === 'Male' 
                    ? 'bg-white border-[#155dfc] text-[#155dfc]' 
                    : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                  <div className="relative flex items-center justify-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={formik.values.gender === 'Male'}
                      onChange={() => formik.setFieldValue('gender', 'Male')}
                      className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-full checked:border-[#155dfc] transition-all"
                    />
                    <div className="absolute w-2.5 h-2.5 bg-[#155dfc] rounded-full scale-0 peer-checked:scale-100 transition-transform" />
                  </div>
                  <span className="text-[16px] font-normal">Male</span>
                </label>

                {/* Female Radio Button (Active Style from Picture) */}
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
              <FieldError msg={formik.touched.gender && formik.errors.gender ? formik.errors.gender : ''} />
            </div>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col sm:flex-row items-center sm:justify-end gap-4 mt-8 md:mt-12 w-full">
          <button
            type="button"
            onClick={() => navigate('/admin/patients/list')}
            className="w-full sm:w-auto px-12 cursor-pointer py-3.5 rounded-full bg-[#E4E7EC] text-[#344054] text-[16px] font-normal hover:bg-gray-300 transition-all flex justify-center text-center"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full justify-center sm:w-auto flex cursor-pointer items-center gap-2 px-12 py-3.5 rounded-full bg-[#333CF5] text-white text-[16px] font-normal hover:bg-[#2830d4] transition-all shadow-lg"
          >
            <HiMiniUserPlus className="text-[20px] shrink-0" />
            {formik.isSubmitting ? 'Creating...' : 'Create Patient'}
          </button>
        </div>
      </form>
    </section>
  );
}