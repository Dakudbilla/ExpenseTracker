import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";

const Signup = () => {
  const { registerUser, user } = useContext(GlobalContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user.token) {
      navigate("/");
    }
  }, [navigate, user.token]);

  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>Register Form</h1>
      <Formik
        initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          lastName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          password: Yup.string()
            .min(6, "Must be 6 characters or more")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          await registerUser({
            email: values.email,
            name: `${values.lastName + " " + values.firstName}`,
            password: values.password,
          });
          setSubmitting(false);
          navigate("/");
        }}
      >
        <Form>
          <label htmlFor="firstName">First Name</label>
          <Field name="firstName" type="text" />
          <ErrorMessage
            name="firstName"
            className="error"
            render={(msg) => <div className="error-form">{msg}</div>}
          />

          <label htmlFor="lastName">Last Name</label>
          <Field name="lastName" type="text" />
          <ErrorMessage
            name="lastName"
            className="error"
            render={(msg) => <div className="error-form">{msg}</div>}
          />

          <label htmlFor="email">Email Address</label>
          <Field name="email" type="text" />
          <ErrorMessage
            name="email"
            className="error"
            render={(msg) => <div className="error-form">{msg}</div>}
          />

          <label htmlFor="lastName">Password</label>
          <Field name="password" type="password" />
          <ErrorMessage
            name="password"
            className="error"
            render={(msg) => <div className="error-form">{msg}</div>}
          />

          <button type="submit" className="btn">
            Register
          </button>
        </Form>
      </Formik>

      <div>
        Already Have an Account? <Link to="/login">Login here</Link>
      </div>
    </div>
  );
};
export default Signup;
