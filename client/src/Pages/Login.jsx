import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import useDeepCompareEffect from "use-deep-compare-effect";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";

const Login = () => {
  const [userAuth, setUserAuth] = useState(false);
  const { loginUser, isAuth, user } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    setUserAuth(isAuth);
    console.log(isAuth);
  }, [isAuth]);

  if (userAuth) {
    navigate("/");
  }
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
        onSubmit={(values, { setSubmitting }) => {
          loginUser(values);
          navigate("/");
          setSubmitting(false);
          navigate("/");
          console.log("Hiiliii");
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
