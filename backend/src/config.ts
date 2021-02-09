export default () => ({
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
  mongodbUri:
    process.env.MONGODB_URI || 'mongodb://localhost:27017/doctor_case_label',
});
