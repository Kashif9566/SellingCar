import React from "react";
import { useFormik } from "formik";
import { SignupSchema } from "../../schema/Signup.Schema";
import "./Signup.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const SignupModal = ({ onClose, handleLoginClick }) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      image: null,
      showPassword: false,
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      values.isSubmitting = true;
      try {
        const form = new FormData();
        form.append("username", values.username);
        form.append("email", values.email);
        form.append("password", values.password);
        if (values.image) {
          form.append("image", values.image);
        } else {
          form.append("image", "");
        }

        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const response = await api.post("/user/register", form, config);
        if (response.status === 201) {
          toast.success("Account created successfully!", { autoClose: 1000 });
          localStorage.setItem("userInfo", JSON.stringify(response.data));
          onClose();
          handleLoginClick();
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          toast.error("User already exists", { autoClose: 1000 });
        } else {
          console.error(error);
          toast.error("Error creating Account", { autoClose: 1000 });
        }
      }
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    formik.setFieldValue("image", file);
  };

  const togglePasswordVisibility = () => {
    formik.setFieldValue("showPassword", !formik.values.showPassword);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div>
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <h2>Let’s get you started!</h2>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="sigup-forms">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="error">{formik.errors.email}</div>
            )}
          </div>
          <div className="sigup-forms">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username && (
              <div className="error">{formik.errors.username}</div>
            )}
          </div>
          <div className="sigup-forms">
            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input
                type={formik.values.showPassword ? "text" : "password"}
                id="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <FontAwesomeIcon
                icon={formik.values.showPassword ? faEyeSlash : faEye}
                className="password-eye-icon"
                onClick={togglePasswordVisibility}
              />
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="error">{formik.errors.password}</div>
            )}
          </div>
          <div className="sigup-forms">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-input-container">
              <input
                type={formik.values.showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              <FontAwesomeIcon
                icon={formik.values.showPassword ? faEyeSlash : faEye}
                className="password-eye-icon"
                onClick={togglePasswordVisibility}
              />
            </div>
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <div className="error">{formik.errors.confirmPassword}</div>
              )}
          </div>
          <div className="sigup-forms">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
            />
          </div>
          <button className="signup-button" type="submit">
            Sign Up
          </button>
          <ToastContainer />
        </form>
        <p className="already-have-account">
          Already have an account? <a onClick={handleLoginClick}>Sign In</a>
        </p>
        <p className="terms-signup">
          By continuing you agree to our <br /> Terms of Service & Privacy
          Policy
        </p>
      </div>
    </div>
  );
};

export default SignupModal;
