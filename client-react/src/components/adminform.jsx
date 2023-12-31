import { useState } from "react";
import { Box, Button, TextField, useMediaQuery } from "@mui/material";

import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from  "react-router-dom" 
   const loginSchema = yup.object().shape({email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
  })

 
  const initialValuesLogin = {
    email: "",
    password: "",
  };
  const Form = () => {
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = async (values, onSubmitProps) => { //call the backend
      await login(values, onSubmitProps);
    };

    const login = async (values, onSubmitProps) => {
      if (values.email === "admin@gmail.com" && values.password === "123") {
        navigate("/dashbord");
      } else {
        navigate("/auth");
      }

      onSubmitProps.resetForm();
    };

    return (
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValuesLogin}
        validationSchema={loginSchema}
      >
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="Password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>

            {/* BUTTONS */}
            <Box>
              <Button
                fullWidth
                type="submit"
                sx={{
                  m: "1rem 0",
                  p: "0.5rem",
                  backgroundColor: "#497bde",
                  color: "#FFFFFF",
                  "&:hover": {
                    backgroundColor: "#f7f8fa",
                    color: "#497bde",
                  },
                }}
              >
                Login
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    );
  };

export default Form;