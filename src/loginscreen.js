import React from "react";
import { Formik, Form, Field, ErrorMessage ,} from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    
    return (
        <div style={{ height: "100vh", display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center" }}>

            <div style={{ fontSize: 25, fontWeight: 'bold', marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
                Invoice Management
            </div>

            <div style={{ marginTop: '50px', width: "300px", padding: "20px", border: "1px solid gray", borderRadius: "10px", background: "#f9f9f9" }}>
                <h2 style={{ display: 'flex', justifyContent: "center", marginBottom: "20px" }}>Login</h2>

                <Formik
                    initialValues={{ username: "", password: "" }}
                    validate={(values) => {
                        let errors = {};
                        if (!values.username) {
                            errors.username = "Username is required";
                        }
                        if (!values.password) {
                            errors.password = "Password is required";
                        } else if (values.password.length < 6) {
                            errors.password = "Password must be at least 6 characters";
                        }
                        return errors;
                    }}
                    onSubmit={(values, { resetForm }) => {
                        localStorage.setItem('username', values.username)
                        localStorage.setItem('password', values.password)
                        localStorage.setItem('isLoggedIn', true)
                        
                        toast.success("Login Successful!", {
                            position: "top-center",
                            autoClose: 2000,
                        });
                        navigate("/home");
                        resetForm(); // Clear form after submission
                    }}

                >
                    {({ errors, touched }) => (
                        <Form style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                            <ToastContainer />
                            <div>
                                <Field
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    style={{
                                        height: "35px",
                                        width: "96%",
                                        borderRadius: "5px",
                                        border: `1px solid ${errors.username && touched.username ? "red" : "gray"}`,
                                        padding: "5px",
                                    }}
                                />
                                <ErrorMessage name="username" component="div" style={{ color: "red", fontSize: "12px" }} />
                            </div>
                            <div>
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    style={{
                                        height: "35px",
                                        width: "96%",
                                        borderRadius: "5px",
                                        border: `1px solid ${errors.password && touched.password ? "red" : "gray"}`,
                                        padding: "5px",
                                    }}
                                />
                                <ErrorMessage name="password" component="div" style={{ color: "red", fontSize: "12px" }} />
                            </div>
                            <button
                                type="submit"
                                style={{
                                    height: "35px",
                                    borderRadius: "5px",
                                    border: "1px solid gray",
                                    color: "white",
                                    backgroundColor: "lightgreen",
                                    cursor: "pointer",
                                    width: "80%",
                                    display: "block",
                                    margin: "auto",

                                }}

                                onFocus={(e) => (e.target.style.backgroundColor = "green")} // Change border to green on focus
                                onBlur={(e) => (e.target.style.backgroundColor = "lightgreen")} // Revert back to black on blur
                            >
                                Sign In
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>


    );
}

