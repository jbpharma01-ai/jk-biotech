const dns = require('dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);

const mongoose = require('mongoose');
require('dotenv').config();

const config = require('../config/env');
const connectDB = require('../config/db');

const Admin = require('../models/Admin');
const Category = require('../models/Category');
const Product = require('../models/Product');
const HeroSlide = require('../models/HeroSlide');
const DocumentCategory = require('../models/DocumentCategory');
const Document = require('../models/Document');
const CompanySetting = require('../models/CompanySetting');

const categoriesData = [
  { name: 'Capsule', slug: 'capsule', description: 'High-grade gelatin encapsulated formulations', icon: 'Pill', displayOrder: 1 },
  { name: 'Drop', slug: 'drop', description: 'Pediatric & ophthalmic oral/topical liquid drops', icon: 'Droplet', displayOrder: 2 },
  { name: 'Injection', slug: 'injection', description: 'Sterile IV/IM parenteral injectables', icon: 'Syringe', displayOrder: 3 },
  { name: 'Powder', slug: 'powder', description: 'Effervescent & oral rehydration powder formulas', icon: 'Boxes', displayOrder: 4 },
  { name: 'Sachet', slug: 'sachet', description: 'Single-dose nutritional & probiotic sachets', icon: 'FileSpreadsheet', displayOrder: 5 },
  { name: 'Suppository', slug: 'suppository', description: 'Targeted rectal/vaginal therapeutic suppositories', icon: 'ShieldAlert', displayOrder: 6 },
  { name: 'Soft Gel Capsule', slug: 'soft-gel-capsule', description: 'Softgel lipid-based nutrient capsules', icon: 'Sparkles', displayOrder: 7 },
  { name: 'Suspension', slug: 'suspension', description: 'Oral pediatric & adult liquid suspensions', icon: 'FlaskConical', displayOrder: 8 },
  { name: 'Syrup', slug: 'syrup', description: 'Flavored therapeutic cough & multivitamin syrups', icon: 'Wine', displayOrder: 9 },
  { name: 'Tablet', slug: 'tablet', description: 'Film-coated, chewable & sustained release tablets', icon: 'Tablets', displayOrder: 10 },
  { name: 'Liquid', slug: 'liquid', description: 'Oral liquids & antiseptic solutions', icon: 'TestTube', displayOrder: 11 },
];

const rawProductsData = [
  {
    slug: 'amital-500',
    categorySlug: 'capsule',
    name: 'AMITAL-500',
    image: '/images/products/capsule/IMG_1539.JPG',
    shortDescription: 'Broad spectrum antibiotic capsule formulation for bacterial infections.',
    description: 'AMITAL-500 is a high-grade broad-spectrum antibiotic capsule indicated for upper and lower respiratory tract infections, urinary tract infections, and skin infections. Formulated with pure active pharmaceutical ingredients to guarantee superior bioavailability and rapid therapeutic response. Manufactured under strict WHO-GMP compliance.',
    composition: 'Amoxicillin Trihydrate IP eq. to Amoxicillin 500 mg',
    packaging: '10 x 10 Blister Pack',
    dosageForm: 'Capsule',
    indications: 'Respiratory tract infections, UTI, Skin & soft tissue infections',
    displayOrder: 1,
  },
  {
    slug: 'alfree',
    categorySlug: 'capsule',
    name: 'ALFREE',
    image: '/images/products/capsule/IMG_1467.JPG',
    shortDescription: 'Multivitamin, multimineral & antioxidant capsule for immunity support.',
    description: 'ALFREE provides comprehensive daily nutritional fortification to combat fatigue, strengthen cellular immunity, and promote overall vitality. Contains a balanced complex of essential vitamins, trace minerals, and powerful antioxidants.',
    composition: 'Multivitamins, Multiminerals & Antioxidants with Zinc & Ginseng',
    packaging: '10 x 1 x 10 Alu-Alu Pack',
    dosageForm: 'Capsule',
    indications: 'General debility, convalescence, immune support, nutritional deficiency',
    displayOrder: 2,
  },
  {
    slug: 'neuro-jk',
    categorySlug: 'capsule',
    name: 'NEURO-JK',
    image: '/images/products/capsule/IMG_1539.JPG',
    shortDescription: 'Methylcobalamin & Alpha Lipoic Acid capsule for nerve health.',
    description: 'NEURO-JK is engineered for peripheral neuropathy management and nerve cell regeneration. Combines high-potency Methylcobalamin with Alpha Lipoic Acid, Pyridoxine, and Folic Acid to alleviate diabetic neuropathy and shooting nerve pains.',
    composition: 'Methylcobalamin 1500 mcg + Alpha Lipoic Acid 100 mg + Pyridoxine 3 mg + Folic Acid 1.5 mg',
    packaging: '10 x 10 Alu-Alu Pack',
    dosageForm: 'Capsule',
    indications: 'Diabetic neuropathy, peripheral neuritis, sciatica, lumbar spondylosis',
    displayOrder: 3,
  },
  {
    slug: 'xyz-drop',
    categorySlug: 'drop',
    name: 'XYZ Drop',
    image: '/images/products/capsule/IMG_1549.JPG',
    shortDescription: 'Pediatric oral carminative & anti-colic drops for infants.',
    description: 'XYZ Drop is a gentle, fast-acting pediatric formulation designed to soothe infantile colic, intestinal gas, and abdominal distension in infants and toddlers. Contains pediatrician-approved carminative oils and simethicone for safe, rapid relief.',
    composition: 'Simethicone 40 mg + Dill Oil 0.005 ml + Fennel Oil 0.0007 ml / ml',
    packaging: '15 ml Bottle with Calibrated Dropper',
    dosageForm: 'Oral Drops',
    indications: 'Infantile colic, flatulence, abdominal distension, indigestion',
    displayOrder: 4,
  },
  {
    slug: 'jk-moist-drops',
    categorySlug: 'drop',
    name: 'JK-MOIST Eye Drops',
    image: '/images/products/capsule/IMG_1585.JPG',
    shortDescription: 'Sterile lubricating ophthalmic eye drops for dry eye relief.',
    description: 'JK-MOIST Eye Drops deliver instant lubrication and long-lasting ocular surface hydration for dry, irritated, or strained eyes. Free from harsh preservatives, engineered for optimal corneal comfort.',
    composition: 'Carboxymethylcellulose Sodium IP 0.5% w/v',
    packaging: '10 ml Sterile Dropper Bottle',
    dosageForm: 'Ophthalmic Drops',
    indications: 'Dry eyes, computer vision syndrome, ocular burning and irritation',
    displayOrder: 5,
  },
  {
    slug: 'jk-cef-1g',
    categorySlug: 'injection',
    name: 'JK-CEF 1g Injection',
    image: '/images/products/injection/IMG_1504.JPG',
    shortDescription: 'Sterile Ceftriaxone 1000 mg IV/IM parenteral injection.',
    description: 'JK-CEF 1g is a potent 3rd-generation cephalosporin injectable antibiotic formulated for severe systemic bacterial infections, sepsis, intra-abdominal infections, and surgical prophylaxis. Produced in aseptic sterile parenteral suites.',
    composition: 'Ceftriaxone Sodium IP eq. to Anhydrous Ceftriaxone 1000 mg',
    packaging: 'Vial with WFI (Sterile Water for Injection)',
    dosageForm: 'Injection (IV/IM)',
    indications: 'Severe bacterial infections, pneumonia, meningitis, post-operative sepsis',
    displayOrder: 6,
  },
  {
    slug: 'panto-jk-40-inj',
    categorySlug: 'injection',
    name: 'PANTO-JK 40 Injection',
    image: '/images/products/injection/IMG_1536.JPG',
    shortDescription: 'Pantoprazole 40 mg lyophilized IV injection for acute hyperacidity.',
    description: 'PANTO-JK 40 IV Injection provides rapid control over gastric acid hypersecretion in acute peptic ulcer bleeding, severe GERD, and Zollinger-Ellison syndrome when oral administration is impractical.',
    composition: 'Pantoprazole Sodium IP (Sterile Lyophilized) eq. to Pantoprazole 40 mg',
    packaging: 'Single Dose Sterile Vial',
    dosageForm: 'Injection (IV)',
    indications: 'Peptic ulcer disease, acute upper GI bleeding, severe erosive esophagitis',
    displayOrder: 7,
  },
  {
    slug: 'rehydra-jk',
    categorySlug: 'powder',
    name: 'REHYDRA-JK Powder',
    image: '/images/products/injection/IMG_1567.JPG',
    shortDescription: 'WHO-formula oral rehydration salts (ORS) electrolyte powder.',
    description: 'REHYDRA-JK is a WHO-recommended oral rehydration formulation designed to quickly restore physiological fluid balance and essential electrolytes lost due to diarrhea, vomiting, heat stroke, or strenuous exercise.',
    composition: 'Sodium Chloride, Potassium Chloride, Sodium Citrate & Dextrose Anhydrous',
    packaging: '21.8 g Sachet Pack',
    dosageForm: 'Oral Powder',
    indications: 'Dehydration, diarrhea, gastroenteritis, heat exhaustion',
    displayOrder: 8,
  },
  {
    slug: 'proti-jk-powder',
    categorySlug: 'powder',
    name: 'PROTI-JK Nutritional Powder',
    image: '/images/products/injection/IMG_1574.JPG',
    shortDescription: 'High-protein nutritional supplement powder enriched with DHA & Zinc.',
    description: 'PROTI-JK is a scientifically formulated protein powder designed for post-illness recovery, maternal care, and physical endurance. Blended with essential amino acids, DHA, B-complex, and vital bone-building minerals.',
    composition: 'Whey Protein Concentrate, Casein, DHA, Pyridoxine, Zinc, Calcium',
    packaging: '200 g Sealed Tin Container',
    dosageForm: 'Nutritional Powder',
    indications: 'General weakness, pregnancy & lactation, post-surgical recovery, muscle strength',
    displayOrder: 9,
  },
  {
    slug: 'gut-flora-sachet',
    categorySlug: 'sachet',
    name: 'GUT-FLORA Sachet',
    image: '/images/products/injection/IMG_1568.JPG',
    shortDescription: 'Probiotic & prebiotic micro-pellet sachet for intestinal balance.',
    description: 'GUT-FLORA Sachet delivers over 5 billion live freeze-dried probiotic spores combined with prebiotic FOS to restore healthy gut microflora during antibiotic therapy, IBS, and digestive distress.',
    composition: 'Lactobacillus acidophilus + Bifidobacterium longum + Fructooligosaccharides (FOS) 100 mg',
    packaging: '1 g Single-Dose Foil Sachet',
    dosageForm: 'Sachet',
    indications: 'Antibiotic-associated diarrhea, IBS, bloating, dysbiosis',
    displayOrder: 10,
  },
  {
    slug: 'calci-d3-sachet',
    categorySlug: 'sachet',
    name: 'CALCI-D3 60K Sachet',
    image: '/images/products/injection/IMG_1574.JPG',
    shortDescription: 'Cholecalciferol (Vitamin D3) 60,000 IU sachet for bone strength.',
    description: 'CALCI-D3 Sachet provides high-potency weekly Vitamin D3 supplementation to correct severe Vitamin D deficiency, increase bone mineral density, and enhance intestinal calcium absorption.',
    composition: 'Cholecalciferol IP 60,000 IU (Granules)',
    packaging: '1 g Sachet (Box of 20 Sachets)',
    dosageForm: 'Sachet',
    indications: 'Osteoporosis, osteomalacia, Vitamin D deficiency, bone fractures',
    displayOrder: 11,
  },
  {
    slug: 'recto-soothe',
    categorySlug: 'suppository',
    name: 'RECTO-SOOTHE Suppository',
    image: '/images/products/injection/IMG_1536.JPG',
    shortDescription: 'Targeted anti-inflammatory & anesthetic rectal suppository.',
    description: 'RECTO-SOOTHE Suppository provides rapid, localized pain relief, swelling reduction, and tissue healing for internal hemorrhoids, proctitis, and post-operative anorectal conditions.',
    composition: 'Hydrocortisone Acetate 10 mg + Lidocaine 60 mg + Zinc Oxide 250 mg',
    packaging: 'Strip of 5 Suppositories',
    dosageForm: 'Suppository',
    indications: 'Internal hemorrhoids, anal fissures, proctitis, anorectal inflammation',
    displayOrder: 12,
  },
  {
    slug: 'omega-max',
    categorySlug: 'soft-gel-capsule',
    name: 'OMEGA-MAX Softgel',
    image: '/images/products/injection/IMG_1568.JPG',
    shortDescription: 'Ultra-pure Omega-3 Fish Oil 1000 mg softgel capsule.',
    description: 'OMEGA-MAX contains molecularly distilled pharmaceutical-grade fish oil rich in EPA and DHA. Supports cardiovascular endurance, arterial health, joint mobility, and cognitive focus.',
    composition: 'Omega-3 Fatty Acids providing EPA 180 mg + DHA 120 mg + Vitamin E 10 IU',
    packaging: '10 x 1 x 10 Softgel Blister Pack',
    dosageForm: 'Soft Gel Capsule',
    indications: 'Hypertriglyceridemia, cardiovascular protection, rheumatoid joint stiffness',
    displayOrder: 13,
  },
  {
    slug: 'coq10-gold',
    categorySlug: 'soft-gel-capsule',
    name: 'COQ10-GOLD Softgel',
    image: '/images/products/injection/IMG_1574.JPG',
    shortDescription: 'Coenzyme Q10 100 mg with Lycopene & Selenium softgel.',
    description: 'COQ10-GOLD is a bio-enhanced mitochondrial energizer and potent cardiac antioxidant. Promotes cellular ATP synthesis, protects against statin-induced myopathy, and boosts heart vigor.',
    composition: 'Coenzyme Q10 100 mg + Lycopene 5000 mcg + Selenium 70 mcg + Zinc 15 mg',
    packaging: '10 x 10 Softgel Blister Pack',
    dosageForm: 'Soft Gel Capsule',
    indications: 'Heart failure adjunctive therapy, chronic fatigue syndrome, statin myopathy',
    displayOrder: 14,
  },
  {
    slug: 'para-jk-250',
    categorySlug: 'suspension',
    name: 'PARA-JK 250 Suspension',
    image: '/images/products/capsule/IMG_1467.JPG',
    shortDescription: 'Pediatric Paracetamol 250 mg / 5 ml oral suspension.',
    description: 'PARA-JK 250 is a pleasantly flavored, alcohol-free pediatric antipyretic suspension. Delivers precise, gentle fever reduction and relief from vaccination discomfort and teething pain.',
    composition: 'Paracetamol IP 250 mg per 5 ml (Delicious Mango Flavor)',
    packaging: '60 ml Bottle with Measuring Cap',
    dosageForm: 'Oral Suspension',
    indications: 'Pediatric fever, post-immunization pyrexia, mild to moderate aches',
    displayOrder: 15,
  },
  {
    slug: 'macro-lip-suspension',
    categorySlug: 'suspension',
    name: 'MACRO-LIP Oral Suspension',
    image: '/images/products/injection/IMG_1504.JPG',
    shortDescription: 'Azithromycin 200 mg / 5 ml pediatric oral suspension.',
    description: 'MACRO-LIP provides targeted once-daily macrolide antibiotic therapy for pediatric respiratory tract infections, tonsillitis, otitis media, and skin infections.',
    composition: 'Azithromycin Dihydrate IP eq. to Azithromycin 200 mg per 5 ml',
    packaging: '30 ml Dry Syrup Bottle with Sterile Water',
    dosageForm: 'Oral Suspension',
    indications: 'Pediatric tonsillitis, pharyngitis, acute otitis media, bronchitis',
    displayOrder: 16,
  },
  {
    slug: 'kuf-clear-syrup',
    categorySlug: 'syrup',
    name: 'KUF-CLEAR Cough Syrup',
    image: '/images/products/injection/IMG_1536.JPG',
    shortDescription: 'Triple-action non-drowsy bronchial cough relief syrup.',
    description: 'KUF-CLEAR Cough Syrup combines a mucolytic, bronchodilator, and expectorant to soothe persistent productive coughs, liquefy thick mucus, and ease breathing discomfort.',
    composition: 'Terbutaline Sulfate 1.25 mg + Ambroxol HCl 15 mg + Guaiphenesin 50 mg + Menthol 2.5 mg / 5 ml',
    packaging: '100 ml PET Bottle',
    dosageForm: 'Syrup',
    indications: 'Productive cough, acute bronchitis, asthmatic cough, airway congestion',
    displayOrder: 17,
  },
  {
    slug: 'zyme-boost-syrup',
    categorySlug: 'syrup',
    name: 'ZYME-BOOST Syrup',
    image: '/images/products/injection/IMG_1567.JPG',
    shortDescription: 'Fungal Diastase & Pepsin digestive enzyme syrup.',
    description: 'ZYME-BOOST is a digestive enzyme tonic that hydrolyzes dietary starches and proteins, eliminating post-meal heaviness, belching, indigestion, and loss of appetite.',
    composition: 'Fungal Diastase (1:1200) 50 mg + Pepsin (1:3000) 10 mg per 5 ml',
    packaging: '200 ml Bottle with Measuring Cap',
    dosageForm: 'Syrup',
    indications: 'Anorexia, indigestion, post-prandial fullness, flatulence',
    displayOrder: 18,
  },
  {
    slug: 'panto-d',
    categorySlug: 'tablet',
    name: 'PANTO-D Tablet',
    image: '/images/products/injection/IMG_1574.JPG',
    shortDescription: 'Pantoprazole & Domperidone sustained release enteric-coated tablet.',
    description: 'PANTO-D provides dual-action therapeutic relief from acid reflux, GERD, non-ulcer dyspepsia, and chronic gastritis. Pantoprazole suppresses gastric acid production while Domperidone enhances upper GI motility.',
    composition: 'Pantoprazole Sodium IP eq. to Pantoprazole 40 mg + Domperidone IP 10 mg',
    packaging: '10 x 10 Alu-Alu Pack',
    dosageForm: 'Tablet',
    indications: 'GERD, acid reflux, peptic ulcers, heartburn, nausea',
    displayOrder: 19,
  },
  {
    slug: 'fevo-500',
    categorySlug: 'tablet',
    name: 'FEVO-500 Tablet',
    image: '/images/products/injection/IMG_1568.JPG',
    shortDescription: 'Paracetamol 500 mg fast-acting film-coated pain reliever.',
    description: 'FEVO-500 delivers rapid antipyretic and analgesic action for quick fever reduction, headache relief, muscle aches, and dental discomfort with high gastric tolerance.',
    composition: 'Paracetamol IP 500 mg',
    packaging: '10 x 15 Blister Pack',
    dosageForm: 'Tablet',
    indications: 'Fever, headache, toothache, dysmenorrhea, muscular aches',
    displayOrder: 20,
  },
  {
    slug: 'antisep-jk-liquid',
    categorySlug: 'liquid',
    name: 'ANTISEP-JK Liquid',
    image: '/images/products/injection/IMG_1574.JPG',
    shortDescription: 'Chlorhexidine 0.2% w/v oral antiseptic & gargle solution.',
    description: 'ANTISEP-JK Liquid is a broad-spectrum anti-microbial gargle and mouth rinse formulated for oral hygiene, gingivitis prevention, sore throat disinfection, and pre/post dental surgical care.',
    composition: 'Chlorhexidine Gluconate Solution IP eq. to Chlorhexidine Gluconate 0.2% w/v',
    packaging: '150 ml Measuring Bottle',
    dosageForm: 'Oral Liquid',
    indications: 'Gingivitis, sore throat gargle, aphthous ulcers, dental post-op hygiene',
    displayOrder: 21,
  },
];

const heroSlidesData = [
  {
    badge: 'WHO & GMP Certified Manufacturer',
    title: 'Advancing Healthcare Through Quality Solutions',
    titleLines: ['Advancing', 'Healthcare', 'Through', 'Quality Solutions'],
    subtitle: 'J K BIOTECH delivers precisely engineered, safe, and effective pharmaceutical formulations to healthcare professionals and patients across India and beyond.',
    image: { url: '/images/hero/hero-capsule.png', publicId: '', alt: 'Hero Capsule' },
    cta: { label: 'Explore Products', link: '/products' },
    displayOrder: 1,
    isActive: true,
  },
  {
    badge: "Women's Healthcare Solutions",
    title: "Empowering Women's Health Every Day",
    titleLines: ['Empowering', "Women's", 'Health', 'Every Day'],
    subtitle: "Advanced formulations designed to support women's health with quality, safety, and innovation across every stage of life.",
    image: { url: '/images/hero/women-healthcare.png', publicId: '', alt: 'Women Healthcare' },
    cta: { label: 'Explore Products', link: '/products' },
    displayOrder: 2,
    isActive: true,
  },
  {
    badge: 'PEDIATRIC CARE SOLUTIONS',
    title: 'Healthy Childhood Starts With Trusted Care',
    titleLines: ['Healthy', 'Childhood', 'Starts With', 'Trusted Care'],
    subtitle: 'Safe, effective and child-friendly formulations designed to support healthy growth, immunity and pediatric wellness with trusted pharmaceutical quality.',
    image: { url: '/images/hero/pediatric-care.png', publicId: '', alt: 'Pediatric Care' },
    cta: { label: 'Explore Products', link: '/products' },
    displayOrder: 3,
    isActive: true,
  },
];

const documentCategoriesData = [
  {
    name: 'Pediatrician',
    slug: 'pediatrician',
    description: 'Pediatric dosage charts, product brochures & visual aids',
    displayOrder: 1,
    pdfUrl: 'https://www.jkbiotech.in/apanel/assets/admin_assets/document/3c8820090867b1cb7ea21bc452fd86feNew%20PED%20catalogue.pdf',
  },
  {
    name: 'Orthopedic',
    slug: 'orthopedic',
    description: 'Joint care, calcium & bone health product catalogs',
    displayOrder: 2,
    pdfUrl: 'https://www.jkbiotech.in/apanel/assets/admin_assets/document/58d28a8a771b3dfa042427d97f1eddfaNEW%20ORTHO.pdf',
  },
  {
    name: 'Gynecologist',
    slug: 'gynecologist',
    description: "Women's health, iron & prenatal care literature",
    displayOrder: 3,
    pdfUrl: 'https://www.jkbiotech.in/apanel/assets/admin_assets/document/b92a85796250aa7fac1c0c4317c32452New%20GYN.pdf',
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('🌱 Clearing existing collections...');
    await Admin.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    await HeroSlide.deleteMany({});
    await DocumentCategory.deleteMany({});
    await Document.deleteMany({});
    await CompanySetting.deleteMany({});

    console.log('👤 Seeding Super Admin account...');
    const admin = await Admin.create({
      name: 'J K BIOTECH Super Admin',
      email: config.adminEmail,
      password: config.adminPassword,
      role: 'superadmin',
      status: 'active',
    });
    console.log(`✅ Admin created: ${admin.email}`);

    console.log('📁 Seeding Product Categories...');
    const createdCategories = await Category.insertMany(categoriesData);
    console.log(`✅ ${createdCategories.length} Categories created.`);

    // Map categories slug -> _id
    const categoryMap = {};
    createdCategories.forEach((cat) => {
      categoryMap[cat.slug] = cat._id;
    });

    console.log('💊 Seeding Products...');
    const productsToInsert = rawProductsData.map((prod) => {
      const categoryId = categoryMap[prod.categorySlug];
      return {
        name: prod.name,
        slug: prod.slug,
        categoryId: categoryId,
        dosageForm: prod.dosageForm,
        shortDescription: prod.shortDescription,
        composition: prod.composition,
        packaging: prod.packaging,
        indications: prod.indications,
        description: prod.description,
        image: { url: prod.image, publicId: '', alt: prod.name },
        displayOrder: prod.displayOrder,
        isActive: true,
      };
    });

    const createdProducts = await Product.insertMany(productsToInsert);
    console.log(`✅ ${createdProducts.length} Products created.`);

    console.log('🖼️ Seeding Hero Slides...');
    const createdSlides = await HeroSlide.insertMany(heroSlidesData);
    console.log(`✅ ${createdSlides.length} Hero Slides created.`);

    console.log('📄 Seeding Document Categories & Documents...');
    for (const docCatData of documentCategoriesData) {
      const docCat = await DocumentCategory.create({
        name: docCatData.name,
        slug: docCatData.slug,
        description: docCatData.description,
        displayOrder: docCatData.displayOrder,
        isActive: true,
      });

      await Document.create({
        title: `${docCatData.name} Product Catalog & Visual Aid 2026`,
        documentCategoryId: docCat._id,
        description: docCatData.description,
        file: {
          url: docCatData.pdfUrl,
          publicId: '',
          fileName: `${docCatData.name}-Catalog.pdf`,
          fileType: 'application/pdf',
        },
        displayOrder: 1,
        isActive: true,
      });
    }
    console.log('✅ Document Categories & Documents created.');

    console.log('🏢 Seeding Company Settings...');
    await CompanySetting.create({
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
    console.log('✅ Company Settings created.');

    console.log('\n🎉 DATABASE SEEDING COMPLETED SUCCESSFULLY!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error);
    process.exit(1);
  }
};

seedDatabase();
