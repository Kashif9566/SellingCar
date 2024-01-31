import React from "react";
import { useFormik } from "formik";
import { SigninSchema } from "../../schema/Signin.Schema";
import "../Signup/Signup.css";
import api from "../../../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const SignInModal = ({ onClose, handleSignupClick }) => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SigninSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);

        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        const { data } = await api.post(
          "/user/login",
          { email: values.email, password: values.password },
          config
        );

        if (data) {
          localStorage.setItem("userInfo", JSON.stringify(data));
          toast.success("Login Successful");
          onClose();
          navigate("/ad-form");
          window.location.reload();
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            toast.error("User does not exist", { autoClose: 1000 });
          } else if (error.response.status === 401) {
            toast.error("Incorrect password", { autoClose: 1000 });
          } else {
            console.error(error);
            toast.error("Error signing in", { autoClose: 1000 });
          }
        } else {
          console.error(error);
          toast.error("Error signing in", { autoClose: 1000 });
        }
      }
    },
  });

  return (
    <div className="modal">
      <div className="modal-content">
        <div>
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <h2>Welcome back!</h2>
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="error">{formik.errors.password}</div>
            )}
          </div>
          <button className="signin-button" type="submit">
            Sign In
          </button>
          <ToastContainer />
        </form>
        <p className="dont-have-account">
          Already have an account yet?{" "}
          <a onClick={handleSignupClick}>Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default SignInModal;
