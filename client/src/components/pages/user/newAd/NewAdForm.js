import React from "react";
import { useFormik } from "formik";
import "./NewAdForm.css";
import FormInput from "./FormInput";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validationSchemaForAd } from "../../../schema/NewAdForm.Schema";
import api from "../../../../api/api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../../../nav/Navbar";
import Footer from "../../../footer/Footer";
const NewAdForm = () => {
  const user = useSelector((state) => state.user);
  const userId = user && user.id;
  const token = user && user.token;
  const navigate = useNavigate();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    formik.setFieldValue("image", file);
  };
  const formik = useFormik({
    initialValues: {
      city: "",
      make: "",
      model: "",
      year: "",
      registeredIn: "",
      exteriorColor: "",
      mileage: "",
      price: "",
      adDescription: "",
      image: "",
      engineType: "",
      engineCapacity: "",
      transmission: "",
      assembly: "",
      features: "",
      mobileNumber: "",
      secondaryNumber: "",
    },
    validationSchema: validationSchemaForAd,
    onSubmit: async (values) => {
      console.log("values:", values);
      values.isSubmitting = true;
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await api.post(
          `/user/${userId}/newAd`,
          createFormData(values),
          config
        );
        if (data) {
          toast.success("Your Ad is live now!");
          navigate("/");
          values.isSubmitting(false);
        } else {
          toast.error("Error listing Ad");
          values.isSubmitting(false);
        }
      } catch (error) {
        toast.error("Error in posting Ad ");
        console.error("Error posting Ad, Try Again");
      }
    },
  });

  const createFormData = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    return formData;
  };

  return (
    <div>
      <Navbar />
      <div className="newAdForm">
        <div className="card info-card">
          <h1>Sell your Car With 3 Easy & Simple Steps!</h1>
          <p>It's free and takes less than a minute</p>
          <ul>
            <li>
              <i className="fas fa-car"></i> Enter Your Car Information
            </li>
            <li>
              <i className="fas fa-camera"></i>
              Upload Photos
            </li>
            <li>
              <i className="fas fa-tag"></i>
              Enter Your Selling Price
            </li>
          </ul>
        </div>
        <div className="container">
          <form onSubmit={formik.handleSubmit}>
            <div className="card car-information">
              <h2>Car Information</h2>
              <p className="mandatory-note">
                (All fields marked with * are mandatory)
              </p>
              <div>
                <FormInput
                  label="City"
                  id="city"
                  name="city"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.city}
                  placeholder="Enter Your City"
                  required={true}
                  error={formik.touched.city && formik.errors.city}
                />
                <FormInput
                  label="Make"
                  id="make"
                  name="make"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.make}
                  placeholder="Toyota, Honda"
                  required={true}
                  error={formik.touched.make && formik.errors.make}
                />
                <FormInput
                  label="Model"
                  id="model"
                  name="model"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.model}
                  placeholder="Honda city"
                  required={true}
                  error={formik.touched.model && formik.errors.model}
                />
                <FormInput
                  label="Year"
                  id="year"
                  name="year"
                  type="number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.year}
                  placeholder="Year of lauch"
                  required={true}
                  error={formik.touched.year && formik.errors.year}
                />
                <FormInput
                  label="Registered In"
                  id="registeredIn"
                  name="registeredIn"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.registeredIn}
                  placeholder="City of Registration"
                  error={
                    formik.touched.registeredIn && formik.errors.registeredIn
                  }
                />
                <FormInput
                  label="Exterior Color"
                  id="exteriorColor"
                  name="exteriorColor"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.exteriorColor}
                  placeholder="Exterior color"
                  required={true}
                  error={
                    formik.touched.exteriorColor && formik.errors.exteriorColor
                  }
                />
                <FormInput
                  label="Mileage (km)"
                  id="mileage"
                  name="mileage"
                  type="number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.mileage}
                  placeholder="Mileage"
                  required={true}
                  error={formik.touched.mileage && formik.errors.mileage}
                />
                <FormInput
                  label="Price (Rs.)"
                  id="price"
                  name="price"
                  type="number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.price}
                  placeholder="Price"
                  required={true}
                  error={formik.touched.price && formik.errors.price}
                />
                <FormInput
                  label="Ad Description"
                  id="adDescription"
                  name="adDescription"
                  type="textarea"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.adDescription}
                  placeholder="Describe Your Car:"
                  error={
                    formik.touched.adDescription && formik.errors.adDescription
                  }
                />
              </div>
            </div>

            <div className="card image-upload">
              <h2>Image Upload</h2>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="input"
              />
            </div>

            <div className="card additional-information">
              <h2>Additional Information</h2>
              <div>
                <FormInput
                  label="Engine Type"
                  id="engineType"
                  name="engineType"
                  type="select"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.engineType}
                  error={formik.touched.engineType && formik.errors.engineType}
                  options={["Petrol", "Diesel", "LPG", "CNG"]}
                />
                <FormInput
                  label="Engine Capacity (cc)"
                  id="engineCapacity"
                  name="engineCapacity"
                  type="number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.engineCapacity}
                  placeholder="Engine Capacity(cc)"
                  error={
                    formik.touched.engineCapacity &&
                    formik.errors.engineCapacity
                  }
                />
                <FormInput
                  label="Transmission"
                  id="transmission"
                  name="transmission"
                  type="select"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.transmission}
                  error={
                    formik.touched.transmission && formik.errors.transmission
                  }
                  options={["Mannual", "Automatic"]}
                />
                <FormInput
                  label="Assembly"
                  id="assembly"
                  name="assembly"
                  type="select"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.assembly}
                  error={formik.touched.assembly && formik.errors.assembly}
                  options={["Local", "Imported"]}
                />
                <FormInput
                  label="Features"
                  id="features"
                  name="features"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.features}
                  error={formik.touched.features && formik.errors.features}
                />
              </div>
            </div>

            <div className="card contact-information">
              <h2>Contact Information</h2>
              <p>
                Enter a genuine 11 digit mobile no. with format 03XXXXXXXXX. All
                inquiries will come on this number.
              </p>
              <div>
                <FormInput
                  label="Mobile Number"
                  id="mobileNumber"
                  name="mobileNumber"
                  type="number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.mobileNumber}
                  placeholder="Mobile Number"
                  required={true}
                  error={
                    formik.touched.mobileNumber && formik.errors.mobileNumber
                  }
                />
                <FormInput
                  label="Secondary Number (Optional)"
                  id="secondaryNumber"
                  name="secondaryNumber"
                  type="number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.secondaryNumber}
                  placeholder="Secondary Number"
                  error={
                    formik.touched.secondaryNumber &&
                    formik.errors.secondaryNumber
                  }
                />
              </div>
            </div>
            <button
              className="ad-submit-button"
              type="submit"
              disabled={formik.values.isSubmitting}
            >
              {formik.values.isSubmitting
                ? "Submitting..."
                : "SUBMIT AND CONTINUE"}
            </button>
            <ToastContainer />
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewAdForm;
