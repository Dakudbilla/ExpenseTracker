import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";

const Login = () => {
  const { loginUser, user } = useContext(GlobalContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user.token) {
      navigate("/");
    }
  }, [navigate, user.token]);

  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>Login Form</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          password: Yup.string().required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          await loginUser(values);
          setSubmitting(false);
          navigate("/");
        }}
      >
        <Form>
          <label htmlFor="email">Email Address</label>
          <Field name="email" type="text" />
          <ErrorMessage
            name="email"
            className="error"
            render={(msg) => <div className="error-form">{msg}</div>}
          />

          <label htmlFor="password">Password</label>
          <Field name="password" type="password" />
          <ErrorMessage
            name="password"
            className="error"
            render={(msg) => <div className="error-form">{msg}</div>}
          />

          <button type="submit" className="btn">
            Login
          </button>
        </Form>
      </Formik>
      <div>
        Don't Have an Account? <Link to="/register">Register here</Link>
      </div>
    </div>
  );
};
export default Login;
