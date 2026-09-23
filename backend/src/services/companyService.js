const CompanySetting = require('../models/CompanySetting');

// Get company settings (Public)
const getCompanySetting = async () => {
  let setting = await CompanySetting.findOne();
  if (!setting) {
    setting = await CompanySetting.create({
      companyName: 'J K BIOTECH',
      tagline: 'Delivering Excellence in Healthcare & Pharmaceuticals',
      phone: '+91 7383936095',
      email: 'info@jkbiotech.in',
      address:
        'Office No. 22, First Floor, Satyam Arcade, Near Intas Pharma, Opposite Moraiya Patiya, Ahmedabad - 382213',
      workingHours: 'Mon - Sat: 10:00 AM - 7:30 PM',
      socialLinks: {
        linkedin: 'https://linkedin.com',
        facebook: 'https://facebook.com',
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com',
      },
    });
  }
  return setting;
};

// Update company settings (Admin)
const updateCompanySetting = async (updateData) => {
  let setting = await CompanySetting.findOne();
  if (!setting) {
    return await CompanySetting.create(updateData);
  }

  return await CompanySetting.findByIdAndUpdate(setting._id, updateData, {
    new: true,
    runValidators: true,
  });
};

module.exports = {
  getCompanySetting,
  updateCompanySetting,
};
