import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import ConfirmModal from '../ConfirmModal/ConfirmModal';
import { LuUpload, LuUser } from 'react-icons/lu';
import { TbTrash } from 'react-icons/tb';
import {
  HiOutlineEnvelope, HiOutlinePhone, HiOutlineCalendarDays,
  HiOutlineLockClosed, HiOutlineExclamationCircle,
  HiMiniUserPlus, HiOutlineCheckCircle,
} from 'react-icons/hi2';

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  dateOfBirth: Yup.date().nullable().required('Date of birth is required'),
  password: Yup.string().min(8, 'At least 8 characters'),
  gender: Yup.string().required('Gender is required'),
});

const FieldError = ({ msg }) =>
  msg ? (
    <span className="flex items-center gap-1.5 text-[14px] font-normal text-red-500 mt-1">
      <HiOutlineExclamationCircle className="text-[15px] shrink-0" />{msg}
    </span>
  ) : null;

const InputField = ({ label, name, type = 'text', formik, placeholder, icon: Icon }) => {
  const hasError = formik.touched[name] && formik.errors[name];
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[16px] font-normal text-[#344054]">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className={`flex items-center gap-2 px-4 py-3 rounded-full border bg-white transition-all ${hasError ? 'border-red-400' : 'border-gray-200 focus-within:border-[#155dfc] focus-within:ring-2 focus-within:ring-[#155dfc]/10'}`}>
        {Icon && <Icon className="text-gray-400 shrink-0 text-[20px]" />}
        <input
          type={type}
          className="flex-1 border-none outline-none bg-transparent text-[16px] font-normal text-gray-900 placeholder-gray-400"
          placeholder={placeholder}
          {...formik.getFieldProps(name)}
        />
      </div>
      <FieldError msg={hasError ? formik.errors[name] : ''} />
    </div>
  );
};

export default function EditPatient() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [imagePreview, setImagePreview] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const formik = useFormik({
    initialValues: { firstName: '', lastName: '', email: '', phone: '', dateOfBirth: null, password: '', gender: 'Female', image: null },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Updated Values:", values);
      navigate('/admin/patient-management', { state: { success: true, title: 'Updated Successfully' } });
    },
  });

  useEffect(() => {
    // محاكاة جلب البيانات
    const mockData = { firstName: 'Nouran', lastName: 'Mahdy', email: 'patient@pulsex.com', phone: '+20 1100000000', dateOfBirth: new Date('1995-05-20'), gender: 'Female', image: 'https://randomuser.me/api/portraits/women/12.jpg' };
    formik.setValues({ ...mockData, password: '' });
    setImagePreview(mockData.image);
  }, [id]);

  const handleDeleteConfirm = () => {
    setIsDeleteModalOpen(false);
    navigate('/admin/patient-management', { state: { success: true, title: 'Deleted' } });
  };

  const handleImageChange = (e) => {
    const file = e.currentTarget.files[0];
    if (!file) return;
    formik.setFieldValue('image', file);
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <section className="bg-white  overflow-hidden min-h-screen">
      
      {/* Header - Blue Solid Style */}
      <header className="bg-[#155dfc] p-4 md:p-8 flex items-center gap-4">
        <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-xl bg-white/20 text-white text-[24px]">
          <HiMiniUserPlus />
        </div>
        <div>
          <h1 className="text-[24px] font-bold text-white leading-tight">Edit Patient</h1>
          <p className="text-[16px] text-blue-100/90 font-normal">View, edit, and manage all registered Patients.</p>
        </div>
      </header>

      <form onSubmit={formik.handleSubmit} className="py-6 md:py-12 px-4 md:px-8 lg:pl-8 lg:pr-[145px]">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
          
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
                </div>
              )}
            </label>
          </div>

          {/* Column 2: Personal Information */}
          <div className="bg-[#F9FAFB] border border-gray-200 rounded-[24px] p-8 shadow-sm h-fit">
            <div className="flex items-center gap-2 mb-8 text-[#155dfc]">
              <LuUser className="text-[20px]" />
              <span className="text-[18px] font-normal text-[#101828]">Personal Information</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <InputField label="First Name" name="firstName" formik={formik} placeholder="Enter first name" />
              <InputField label="Last Name" name="lastName" formik={formik} placeholder="Enter last name" />
              <InputField label="Email Address" name="email" icon={HiOutlineEnvelope} formik={formik} placeholder="patient@pulsex.com" />
              <InputField label="Phone Number" name="phone" icon={HiOutlinePhone} formik={formik} placeholder="+20 1000000000" />
              
              <div className="flex flex-col gap-2">
                <label className="text-[16px] font-normal text-[#344054]">Date of Birth <span className="text-[bg-[#DC2626]]">*</span></label>
                <div className={`flex items-center gap-2 px-4 py-3 rounded-full border bg-white ${formik.touched.dateOfBirth && formik.errors.dateOfBirth ? 'border-red-400' : 'border-gray-200'}`}>
                  <HiOutlineCalendarDays className="text-gray-400 text-[20px]" />
                  <DatePicker 
                    selected={formik.values.dateOfBirth} 
                    onChange={(date) => formik.setFieldValue('dateOfBirth', date)} 
                    className="w-full outline-none text-[16px] font-normal bg-transparent" 
                    placeholderText="Select date" 
                  />
                </div>
                <FieldError msg={formik.touched.dateOfBirth && formik.errors.dateOfBirth ? formik.errors.dateOfBirth : ''} />
              </div>

              <InputField label="Password" name="password" type="password" icon={HiOutlineLockClosed} formik={formik} placeholder="Leave empty to keep current" />
            </div>

            {/* Gender Toggle Style - Same Pink/Blue */}
        {/* Gender Section with Radio Buttons as in Page 1 */}
<div className="mt-8">
  <p className="text-[16px] font-normal text-[#344054] mb-4">
    Gender <span className="text-[bg-[#DC2626]]">*</span>
  </p>
  <div className="flex flex-col sm:flex-row gap-4">
    
    {/* Male Radio Button */}
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
        {/* الدائرة الصغيرة اللي بتظهر لما نختار */}
        <div className="absolute w-2.5 h-2.5 bg-white rounded-full scale-0 peer-checked:scale-100 transition-transform" />
      </div>
      <span className="text-[16px] font-normal">Male</span>
    </label>

    {/* Female Radio Button (Pink Style) */}
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
        {/* الدائرة الصغيرة اللي بتظهر لما نختار */}
        <div className="absolute w-2.5 h-2.5 bg-white rounded-full scale-0 peer-checked:scale-100 transition-transform" />
      </div>
      <span className="text-[16px] font-normal">Female</span>
    </label>

  </div>
  <FieldError msg={formik.touched.gender && formik.errors.gender ? formik.errors.gender : ''} />
</div>
          </div>
        </div>

        {/* Action Buttons Section */}
        <div className="flex flex-col sm:flex-row items-center sm:justify-end gap-4 mt-8 md:mt-12 w-full">
          <button type="button" onClick={() => navigate('/admin/patient-management')} className="w-full sm:w-auto px-12 py-3.5 rounded-full bg-[#E4E7EC] text-[#344054] text-[16px] font-normal cursor-pointer flex justify-center text-center">
            Cancel
          </button>
          
          <button type="button" onClick={() => setIsDeleteModalOpen(true)} className="w-full justify-center sm:w-auto flex items-center gap-2 px-10 py-3.5 rounded-full bg-[#DC2626] text-white border border-red-200 text-[16px] font-normal hover:bg-[#fc4242] transition-all cursor-pointer">
            <TbTrash className="text-[20px] shrink-0" /> Delete
          </button>

          <button type="submit" disabled={formik.isSubmitting} className="w-full justify-center sm:w-auto flex items-center gap-2 px-12 py-3.5 rounded-full bg-[#333CF5] text-white text-[16px] font-normal hover:bg-[#2830d4] transition-all shadow-lg cursor-pointer">
            <HiOutlineCheckCircle className="text-[20px] shrink-0" />
            {formik.isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>

      <ConfirmModal isOpen={isDeleteModalOpen} title="Delete Patient?" desc="Are you sure you want to delete this patient? This action is permanent." onConfirm={handleDeleteConfirm} onCancel={() => setIsDeleteModalOpen(false)} />
    </section>
  );
}