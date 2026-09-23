const Enquiry = require('../models/Enquiry');

// Submit new contact enquiry (Public)
const createEnquiry = async (enquiryData) => {
  const { name, email, phone, subject, message } = enquiryData;

  // Clean phone to 10 digits
  const cleanPhone = phone ? phone.replace(/\D/g, '').slice(0, 10) : '';

  return await Enquiry.create({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: cleanPhone,
    subject: subject ? subject.trim() : 'General Enquiry',
    message: message ? message.trim() : '',
    status: 'new',
  });
};

// Get all enquiries (Admin)
const getAllEnquiries = async (status = null) => {
  const query = status ? { status } : {};
  return await Enquiry.find(query).sort({ createdAt: -1 });
};

// Get single enquiry by ID (Admin)
const getEnquiryById = async (id) => {
  return await Enquiry.findById(id);
};

// Update enquiry status & admin note (Admin)
const updateEnquiryStatus = async (id, status, adminNote = null) => {
  const updateData = {};
  if (status) updateData.status = status;
  if (adminNote !== null && adminNote !== undefined) updateData.adminNote = adminNote;

  return await Enquiry.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

// Delete enquiry (Admin)
const deleteEnquiry = async (id) => {
  return await Enquiry.findByIdAndDelete(id);
};

module.exports = {
  createEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry,
};
