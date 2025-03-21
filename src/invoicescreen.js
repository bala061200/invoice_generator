import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { LiaUploadSolid } from "react-icons/lia";
import { BiBuildings } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";
import { LiaCommentSolid } from "react-icons/lia";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './App.css';
import { AiOutlineSend } from "react-icons/ai";
import { LuCalendar1 } from "react-icons/lu";
import PdfUpload from "./pdfupload";
import { useNavigate, useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, } from "formik";
import { ToastContainer, toast } from "react-toastify";

export default function Invoice() {

  const location = useLocation();
  const invoiceType = location.state?.type || "new";
  const navigate = useNavigate();
  const [uploadedData, setUploadedData] = useState(null);
  const [activeSection, setActiveSection] = useState("Vendor Details");

  const vendorOptions = [
    { value: "vendor1", label: "Vendor 1" },
    { value: "vendor2", label: "Vendor 2" },
    { value: "vendor3", label: "Vendor 3" },
  ];

  const poNumberOptions = [
    { value: "PO123", label: "PO123" },
    { value: "PO456", label: "PO456" },
    { value: "PO789", label: "PO789" },
  ];

  const invoiceNumberOptions = [
    { value: "INV1001", label: "INV1001" },
    { value: "INV1002", label: "INV1002" },
    { value: "INV1003", label: "INV1003" },
  ];

  const paymentTermsOptions = [
    { value: "Net 30", label: "Net 30" },
    { value: "Net 60", label: "Net 60" },
    { value: "Net 90", label: "Net 90" },
  ];

  const departmentOptions = [
    { value: "HR", label: "HR" },
    { value: "Finance", label: "Finance" },
    { value: "IT", label: "IT" },
  ];

  const accountOptions = [
    { value: "Account1", label: "Account 1" },
    { value: "Account2", label: "Account 2" },
    { value: "Account3", label: "Account 3" },
  ];

  const locationOptions = [
    { value: "New York", label: "New York" },
    { value: "Los Angeles", label: "Los Angeles" },
    { value: "Chicago", label: "Chicago" },
  ];

  const vendorRef = useRef(null);
  const invoiceRef = useRef(null);
  const commentsRef = useRef(null);



  const scrollToSection = (section, ref) => {
    setActiveSection(section);
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSelectedFileData = (e) => {
    const file = e.name;

    if (file) {
      console.log("Selected file:", file);
      setUploadedData(file);
    } else {
      console.log("No file selected.");
    }
  };



  const handlegoback = () => {
    localStorage.clear()
    navigate("/home");
  }


  const fieldNames = [
    "vendor", "poNumber", "invoiceNumber", "paymentTerms", "department",
    "account", "location", "invoiceDate", "invoiceDueDate", "glPostDate",
    "invoiceDescription", "description", "lineAmount", "totalAmount", "comments"
  ];

  const [defaultValues, setDefaultValues] = useState({});

  useEffect(() => {
    navigate("/invoice", { replace: true, state: {} });
    if ((uploadedData) || (invoiceType === 'default')) {
      console.log("uodadaaa", uploadedData, invoiceType)
      const today = new Date();
      let invoicedate = today.toISOString().split("T")[0]
      let invoiceduedate = new Date(today.setDate(today.getDate() + 5)).toISOString().split("T")[0]
      let glpostdate = new Date(today.setDate(today.getDate() - 4)).toISOString().split("T")[0]
      let invoicedes = 'Invoice Details Description'
      let expensedes = 'Expense Details Description'
      let lineamount = 10
      let totalamount = 100;

      setDefaultValues({
        vendor: vendorOptions.length > 0 ? vendorOptions[0] : "",
        poNumber: poNumberOptions.length > 0 ? poNumberOptions[0] : "",
        invoiceNumber: invoiceNumberOptions.length > 0 ? invoiceNumberOptions[0] : "",
        paymentTerms: paymentTermsOptions.length > 0 ? paymentTermsOptions[0] : "",
        department: departmentOptions.length > 0 ? departmentOptions[0] : "",
        account: accountOptions.length > 0 ? accountOptions[0] : "",
        location: locationOptions.length > 0 ? locationOptions[0] : "",
        invoiceDate: invoicedate,
        invoiceDueDate: invoiceduedate,
        glPostDate: glpostdate,
        invoiceDescription: invoicedes,
        description: expensedes,
        lineAmount: lineamount,
        totalAmount: totalamount,
      })

      localStorage.setItem("vendor", JSON.stringify(vendorOptions[0]));
      localStorage.setItem("poNumber", JSON.stringify(poNumberOptions[0]));
      localStorage.setItem("invoiceNumber", JSON.stringify(invoiceNumberOptions[0]));
      localStorage.setItem("paymentTerms", JSON.stringify(paymentTermsOptions[0]));
      localStorage.setItem("department", JSON.stringify(departmentOptions[0]));
      localStorage.setItem("account", JSON.stringify(accountOptions[0]));
      localStorage.setItem("location", JSON.stringify(locationOptions[0]));
      localStorage.setItem("invoiceDate", invoicedate);
      localStorage.setItem("invoiceDueDate", invoiceduedate);
      localStorage.setItem("glPostDate", glpostdate);
      localStorage.setItem("invoiceDescription", invoicedes);
      localStorage.setItem("description", expensedes);
      localStorage.setItem("lineAmount", lineamount);
      localStorage.setItem("totalAmount", totalamount);

    } else {
      const storedValues = {};
      fieldNames.forEach((field) => {
        const stored = localStorage.getItem(field);

        try {
          storedValues[field] = stored ? JSON.parse(stored) : "";
        } catch (error) {
          storedValues[field] = stored || "";
        }
      });
      setDefaultValues(storedValues);
    }


  }, [uploadedData, invoiceType]);

  const handleDropdownChange = (value, setFieldValue, field) => {
    setFieldValue(field, value);
    localStorage.setItem(field, JSON.stringify(value));
  };


  const handleFieldChange = (value, setFieldValue, field) => {
    setFieldValue(field, value);
    localStorage.setItem(field, value);
  };



  return (
    <div style={{ width: "100%", height: "100%", background: "#f5f5f5", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "15px 20px",
          background: "white",
          position: "sticky",
          top: "0",
          zIndex: "1000",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: "20px",
          }}
          onClick={handlegoback}
        >
          <IoIosArrowRoundBack size={30} color="black" />
          Create New Invoice
        </div>

        <div style={{ display: "flex", flex: 1, gap: "20px", paddingLeft: "70px" }}>
          {["Vendor Details", "Invoice Details", "Comments"].map((section) => (
            <div
              key={section}
              onClick={() =>
                scrollToSection(
                  section,
                  section === "Vendor Details"
                    ? vendorRef
                    : section === "Invoice Details"
                      ? invoiceRef
                      : commentsRef
                )
              }
              style={{
                cursor: "pointer",
                fontWeight: "bold",
                padding: "5px 10px",
                borderRadius: "5px",
                color: activeSection === section ? "skyblue" : "black",
                borderBottom: activeSection === section ? "skyblue" : "none",
                transition: "background-color 0.3s",
              }}
            >
              {section}
            </div>
          ))}
        </div>

      </div>

      <div style={{ flex: 1, display: "flex" }}>
        <PdfUpload handleSelectedFile={handleSelectedFileData} />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: "transparent", margin: '20px', gap: '10px' }}>
          <Formik
            initialValues={{
              vendor: defaultValues.vendor || null,
              poNumber: defaultValues.poNumber || "",
              invoiceNumber: defaultValues.invoiceNumber || "",
              paymentTerms: defaultValues.paymentTerms || "",
              department: defaultValues.department || "",
              account: defaultValues.account || "",
              location: defaultValues.location || "",
              invoiceDate: defaultValues.invoiceDate || "",
              invoiceDueDate: defaultValues.invoiceDueDate || "",
              glPostDate: defaultValues.glPostDate || "",
              invoiceDescription: defaultValues.invoiceDescription || "",
              description: defaultValues.description || "",
              lineAmount: defaultValues.lineAmount || "",
              totalAmount: defaultValues.totalAmount || "",
              comments: defaultValues.comments || "",
            }}
            enableReinitialize={defaultValues.length > 0 ? false : true}
            validate={(values) => {
              let errors = {};

              fieldNames.forEach((field) => {
                if (field !== "comments" && !values[field]) {
                  errors[field] = `${field} is required`;
                }
              });
              return errors;
            }}
            onSubmit={(values, { resetForm }) => {
              resetForm();
              setDefaultValues({})
              localStorage.clear()
              toast.success("Saved Successful!", {
                position: "top-center",
                autoClose: 2000,
              });
              setTimeout(() => {
                navigate("/home");
              }, [2000])


            }}

          >
            {({ values, setFieldValue }) => (
              <Form>
                <ToastContainer />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: "transparent", margin: '20px', gap: '10px' }}>
                  <div ref={vendorRef} style={{ display: "flex", flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{
                        width: "30px",
                        height: "30px",
                        backgroundColor: "#d0e8f2 ",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                      }}>
                        <BiBuildings size={18} color="deepskyblue" />
                      </div>

                      <div style={{ display: "flex", fontSize: 16, fontWeight: 'bold', justifyContent: 'center', alignItems: "center", }}
                      >
                        Vendor Details
                      </div>
                    </div>
                    <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                      Vendor Information
                    </div>

                    <div style={{ width: "100%", marginBottom: "20px", display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <label style={{ fontWeight: "bold", color: 'grey', fontSize: 10 }}>
                        Vendor <span style={{ color: "red" }}>*</span>
                      </label>


                      <Select
                        options={vendorOptions}
                        placeholder="Vendor Info"
                        value={values.vendor}
                        onChange={(selected) => handleDropdownChange(selected, setFieldValue, "vendor")}
                        styles={{
                          placeholder: (base) => ({
                            ...base,
                            color: "grey",
                          }),
                          control: (base, state) => ({
                            ...base,
                            width: "100%",
                            borderRadius: "8px",
                            border: "2px solid grey",
                            boxShadow: "none",
                            borderColor: "grey",
                            "&:hover": {
                              borderColor: "grey",
                            },
                          }),
                          indicatorSeparator: (base) => ({
                            display: 'none'
                          }),
                          dropdownIndicator: (base) => ({
                            ...base,
                            color: "grey",
                          }),
                          menu: (base) => ({
                            ...base,
                            backgroundColor: "white",
                            border: "1px solid grey",
                          }),
                          option: (base, { isFocused, isSelected }) => ({
                            ...base,
                            backgroundColor: isFocused ? "lightgrey" : isSelected ? "grey" : "white",
                            color: isSelected ? "white" : "black",
                            "&:hover": {
                              backgroundColor: "lightgrey",
                            },
                          }),
                          singleValue: (base) => ({
                            ...base,
                            color: "black",
                          }),
                        }}
                      />
                      <ErrorMessage name="vendor" component="div" style={{ color: "red", fontSize: "12px" }} />

                    </div>
                  </div>

                  <div ref={invoiceRef} style={{ display: "flex", flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{
                        width: "30px",
                        height: "30px",
                        backgroundColor: "#d0e8f2 ",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                      }}>
                        <BsBookmark size={15} color="deepskyblue" />
                      </div>

                      <h3>
                        Invoice Details
                      </h3>
                    </div>
                    <div style={{ display: "flex", flexDirection: 'column', gap: '15px' }}>
                      <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                        Genral Information
                      </div>

                      <div style={{ width: "100%", marginBottom: "20px", display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label style={{ fontWeight: "bold", color: 'grey', fontSize: 10 }}>
                          Purchase Order Number <span style={{ color: "red" }}>*</span>
                        </label>

                        <Select
                          options={poNumberOptions}
                          placeholder="Select PO Number"
                          value={values.poNumber}

                          onChange={(selected) => handleDropdownChange(selected, setFieldValue, "poNumber")}

                          styles={{
                            placeholder: (base) => ({
                              ...base,
                              color: "grey",
                            }),
                            control: (base, state) => ({
                              ...base,
                              width: "100%",
                              borderRadius: "8px",
                              border: "2px solid grey",
                              boxShadow: "none",
                              borderColor: "grey",
                              "&:hover": {
                                borderColor: "grey",
                              },
                            }),
                            indicatorSeparator: (base) => ({
                              display: 'none'
                            }),
                            dropdownIndicator: (base) => ({
                              ...base,
                              color: "grey",
                            }),
                            menu: (base) => ({
                              ...base,
                              backgroundColor: "white",
                              border: "1px solid grey",
                            }),
                            option: (base, { isFocused, isSelected }) => ({
                              ...base,
                              backgroundColor: isFocused ? "lightgrey" : isSelected ? "grey" : "white",
                              color: isSelected ? "white" : "black",
                              "&:hover": {
                                backgroundColor: "lightgrey",
                              },
                            }),
                            singleValue: (base) => ({
                              ...base,
                              color: "black",
                            }),
                          }}
                        />
                        <ErrorMessage name="poNumber" component="div" style={{ color: "red", fontSize: "12px" }} />

                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: 'column', gap: '15px' }}>
                      <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                        Invoice Details
                      </div>

                      <div style={{ width: "100%", display: 'flex', gap: '10px' }}>

                        <div style={{ width: "50%", display: 'flex', flexDirection: 'column', gap: '5px' }}>
                          <label style={{ fontWeight: "bold", color: 'grey', fontSize: 10 }}>
                            Invoice Number <span style={{ color: "red" }}>*</span>
                          </label>

                          <Select
                            options={invoiceNumberOptions}
                            placeholder="Select Vendor"
                            value={values.invoiceNumber}
                            onChange={(selected) => handleDropdownChange(selected, setFieldValue, "invoiceNumber")}
                            styles={{
                              placeholder: (base) => ({
                                ...base,
                                color: "lightgrey",
                                fontSize: 12,
                                fontWeight: 'bold'
                              }),
                              control: (base, state) => ({
                                ...base,
                                width: "100%",
                                borderRadius: "8px",
                                border: "2px solid grey",
                                boxShadow: "none",
                                borderColor: "grey",
                                "&:hover": {
                                  borderColor: "grey",
                                },
                              }),
                              indicatorSeparator: (base) => ({
                                display: 'none'
                              }),
                              dropdownIndicator: (base) => ({
                                ...base,
                                color: "grey",
                              }),
                              menu: (base) => ({
                                ...base,
                                backgroundColor: "white",
                                border: "1px solid grey",
                              }),
                              option: (base, { isFocused, isSelected }) => ({
                                ...base,
                                backgroundColor: isFocused ? "lightgrey" : isSelected ? "grey" : "white",
                                color: isSelected ? "white" : "black",
                                "&:hover": {
                                  backgroundColor: "lightgrey",
                                },
                              }),
                              singleValue: (base) => ({
                                ...base,
                                color: "black",
                              }),
                            }}
                          />
                          <ErrorMessage name="invoiceNumber" component="div" style={{ color: "red", fontSize: "12px" }} />

                        </div>

                        <div style={{ width: "50%", display: "flex", flexDirection: "column", gap: "5px" }}>
                          <label style={{ fontWeight: "bold", color: "grey", fontSize: 10 }}>
                            Invoice Date <span style={{ color: "red" }}>*</span>
                          </label>
                          <div style={{ width: "100%" }}>
                            <DatePicker
                              showIcon={true}
                              icon={<LuCalendar1 size={25} color="grey" style={{ marginTop: '2px' }} />}
                              selected={values.invoiceDate}
                              onChange={(date) => handleFieldChange(date, setFieldValue, 'invoiceDate')}
                              placeholderText="Select Date"
                              dateFormat="MM/dd/yyyy"

                            />
                          </div>

                          <ErrorMessage name="invoiceDate" component="div" style={{ color: "red", fontSize: "12px" }} />

                        </div>
                      </div>

                      <div style={{ width: "100%", display: 'flex', gap: '10px' }}>
                        <div style={{ width: "50%", display: "flex", flexDirection: "column", gap: "5px" }}>
                          <label style={{ fontWeight: "bold", color: 'grey', fontSize: 10 }}>Total Amount <span style={{ color: "red" }}>*</span></label>
                          <div style={{
                            display: "flex",
                            alignItems: "center",
                            border: "2px solid grey",
                            borderRadius: "8px",
                            overflow: "hidden",
                            height: "35px",
                            backgroundColor: "white"
                          }}>

                            <div style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              backgroundColor: "#f0f0f0",
                              padding: "0 12px",
                              height: "100%",
                              paddingBottom: '3px'
                            }}>
                              <span style={{ color: "black", fontSize: "14px" }}>$</span>
                            </div>


                            <input
                              value={values.totalAmount}
                              onChange={(e) => handleFieldChange(e.target.value, setFieldValue, 'totalAmount')}
                              type="number"
                              placeholder="0.00"
                              style={{
                                border: "none",
                                outline: "none",
                                flex: 1,
                                textAlign: "start",
                                padding: '10px',
                                fontSize: "14px",
                                height: "100%",
                                backgroundColor: "white"
                              }}
                            />

                            <span style={{
                              marginRight: "10px",
                              color: "grey",
                              fontSize: "14px"
                            }}>USD</span>
                          </div>


                          <ErrorMessage name="totalAmount" component="div" style={{ color: "red", fontSize: "12px" }} />

                        </div>

                        <div style={{ width: "50%", display: 'flex', flexDirection: 'column', gap: '5px' }}>
                          <label style={{ fontWeight: "bold", color: 'grey', fontSize: 10 }}>
                            Payment Terms <span style={{ color: "red" }}>*</span>
                          </label>

                          <Select
                            options={paymentTermsOptions}
                            placeholder="Select"
                            value={values.paymentTerms}
                            onChange={(selected) => handleDropdownChange(selected, setFieldValue, "paymentTerms")}
                            styles={{
                              placeholder: (base) => ({
                                ...base,
                                color: "lightgrey",
                                fontSize: 12,
                                fontWeight: 'bold'
                              }),
                              control: (base, state) => ({
                                ...base,
                                width: "100%",
                                borderRadius: "8px",
                                border: "2px solid grey",
                                boxShadow: "none",
                                borderColor: "grey",
                                "&:hover": {
                                  borderColor: "grey",
                                },
                              }),
                              indicatorSeparator: (base) => ({
                                display: 'none'
                              }),

                              dropdownIndicator: (base) => ({
                                ...base,
                                color: "grey",
                              }),
                              menu: (base) => ({
                                ...base,
                                backgroundColor: "white",
                                border: "1px solid grey",
                              }),
                              option: (base, { isFocused, isSelected }) => ({
                                ...base,
                                backgroundColor: isFocused ? "lightgrey" : isSelected ? "grey" : "white",
                                color: isSelected ? "white" : "black",
                                "&:hover": {
                                  backgroundColor: "lightgrey",
                                },
                              }),
                              singleValue: (base) => ({
                                ...base,
                                color: "black",
                              }),
                            }}
                          />

                        </div>
                      </div>


                      <div style={{ width: "100%", display: 'flex', gap: '10px' }}>
                        <div style={{ width: "50%", display: "flex", flexDirection: "column", gap: "5px" }}>
                          <label style={{ fontWeight: "bold", color: "grey", fontSize: 10 }}>
                            Invoice Due Date <span style={{ color: "red" }}>*</span>
                          </label>
                          <div style={{ width: "100%" }}>
                            <DatePicker
                              showIcon={true}
                              showPopperArrow={true}
                              popperPlacement={"bottom-end"}
                              icon={<LuCalendar1 size={25} color="grey" style={{ marginTop: '2px' }} />}
                              selected={values.invoiceDueDate}
                              onChange={(date) => handleFieldChange(date, setFieldValue, 'invoiceDueDate')}
                              placeholderText="Select Date"
                              dateFormat="MM/dd/yyyy"
                            />
                          </div>
                          <ErrorMessage name="invoiceDueDate" component="div" style={{ color: "red", fontSize: "12px" }} />

                        </div>

                        <div style={{ width: "50%", display: "flex", flexDirection: "column", gap: "5px" }}>
                          <label style={{ fontWeight: "bold", color: "grey", fontSize: 10 }}>
                            GL Post Date <span style={{ color: "red" }}>*</span>
                          </label>
                          <div style={{ width: "100%" }}>
                            <DatePicker
                              showIcon={true}
                              icon={<LuCalendar1 size={25} color="grey" style={{ marginTop: '2px' }} />}
                              selected={values.glPostDate}
                              onChange={(date) => handleFieldChange(date, setFieldValue, 'glPostDate')}
                              placeholderText="Select Date"
                              dateFormat="MM/dd/yyyy"
                            />
                          </div>
                          <ErrorMessage name="glPostDate" component="div" style={{ color: "red", fontSize: "12px" }} />

                        </div>
                      </div>


                      <div style={{ width: "100%", display: 'flex', flexDirection: 'column', gap: '5px', }}>
                        <label style={{ fontWeight: "bold", color: 'grey', fontSize: 10 }}>
                          Invoice Description <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          style={{ border: '2px solid gray', borderRadius: '8px', padding: '9px' }}
                          value={values.invoiceDescription}
                          onChange={(e) => handleFieldChange(e.target.value, setFieldValue, 'invoiceDescription')}
                        />
                        <ErrorMessage name="invoiceDescription" component="div" style={{ color: "red", fontSize: "12px" }} />

                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: 'column', gap: '15px' }}>
                      <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                        Expense Details
                      </div>

                      <div style={{ width: "100%", display: 'flex', gap: '10px' }}>
                        <div style={{ width: "50%", display: "flex", flexDirection: "column", gap: "5px" }}>
                          <label style={{ fontWeight: "bold", color: 'grey', fontSize: 10 }}>Line Amount <span style={{ color: "red" }}>*</span></label>
                          <div style={{
                            display: "flex",
                            alignItems: "center",
                            border: "2px solid grey",
                            borderRadius: "8px",
                            overflow: "hidden",
                            height: "35px",
                            backgroundColor: "white"
                          }}>

                            <div style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              backgroundColor: "#f0f0f0",
                              padding: "0 12px",
                              height: "100%",
                              paddingBottom: '3px'
                            }}>
                              <span style={{ color: "black", fontSize: "14px" }}>$</span>
                            </div>


                            <input

                              type="number"
                              placeholder="0.00"
                              style={{
                                border: "none",
                                outline: "none",
                                flex: 1,
                                textAlign: "start",
                                padding: '10px',
                                fontSize: "14px",
                                height: "100%",
                                backgroundColor: "white"
                              }}

                              value={values.lineAmount}
                              onChange={(e) => handleFieldChange(e.target.value, setFieldValue, 'lineAmount')}
                            />

                            <span style={{
                              marginRight: "10px",
                              color: "grey",
                              fontSize: "14px"
                            }}>USD</span>
                          </div>
                          <ErrorMessage name="lineAmount" component="div" style={{ color: "red", fontSize: "12px" }} />

                        </div>

                        <div style={{ width: "50%", display: 'flex', flexDirection: 'column', gap: '5px' }}>
                          <label style={{ fontWeight: "bold", color: 'grey', fontSize: 10 }}>
                            Department <span style={{ color: "red" }}>*</span>
                          </label>

                          <Select
                            options={departmentOptions}
                            placeholder="Select Department"
                            value={values.department}
                            onChange={(selected) => handleDropdownChange(selected, setFieldValue, "department")}
                            styles={{
                              placeholder: (base) => ({
                                ...base,
                                color: "lightgrey",
                                fontSize: 12,
                                fontWeight: 'bold'
                              }),
                              control: (base, state) => ({
                                ...base,
                                width: "100%",
                                borderRadius: "8px",
                                border: "2px solid grey",
                                boxShadow: "none",
                                borderColor: "grey",
                                "&:hover": {
                                  borderColor: "grey",
                                },
                              }),
                              indicatorSeparator: (base) => ({
                                display: 'none'
                              }),
                              dropdownIndicator: (base) => ({
                                ...base,
                                color: "grey",
                              }),
                              menu: (base) => ({
                                ...base,
                                backgroundColor: "white",
                                border: "1px solid grey",
                              }),
                              option: (base, { isFocused, isSelected }) => ({
                                ...base,
                                backgroundColor: isFocused ? "lightgrey" : isSelected ? "grey" : "white",
                                color: isSelected ? "white" : "black",
                                "&:hover": {
                                  backgroundColor: "lightgrey",
                                },
                              }),
                              singleValue: (base) => ({
                                ...base,
                                color: "black",
                              }),
                            }}
                          />
                          <ErrorMessage name="department" component="div" style={{ color: "red", fontSize: "12px" }} />

                        </div>
                      </div>


                      <div style={{ width: "100%", display: 'flex', gap: '10px' }}>
                        <div style={{ width: "50%", display: 'flex', flexDirection: 'column', gap: '5px' }}>
                          <label style={{ fontWeight: "bold", color: 'grey', fontSize: 10 }}>
                            Account <span style={{ color: "red" }}>*</span>
                          </label>

                          <Select
                            options={accountOptions}
                            placeholder="Select Account"
                            value={values.account}
                            onChange={(selected) => handleDropdownChange(selected, setFieldValue, "account")}
                            styles={{
                              placeholder: (base) => ({
                                ...base,
                                color: "lightgrey",
                                fontSize: 12,
                                fontWeight: 'bold'
                              }),
                              control: (base, state) => ({
                                ...base,
                                width: "100%",
                                borderRadius: "8px",
                                border: "2px solid grey",
                                boxShadow: "none",
                                borderColor: "grey",
                                "&:hover": {
                                  borderColor: "grey",
                                },
                              }),
                              dropdownIndicator: (base) => ({
                                ...base,
                                color: "grey",
                              }),
                              menu: (base) => ({
                                ...base,
                                backgroundColor: "white",
                                border: "1px solid grey",
                              }),
                              option: (base, { isFocused, isSelected }) => ({
                                ...base,
                                backgroundColor: isFocused ? "lightgrey" : isSelected ? "grey" : "white",
                                color: isSelected ? "white" : "black",
                                "&:hover": {
                                  backgroundColor: "lightgrey",
                                },
                              }),
                              indicatorSeparator: (base) => ({
                                display: 'none'
                              }),

                              singleValue: (base) => ({
                                ...base,
                                color: "black",
                              }),
                            }}
                          />
                          <ErrorMessage name="account" component="div" style={{ color: "red", fontSize: "12px" }} />

                        </div>

                        <div style={{ width: "50%", display: 'flex', flexDirection: 'column', gap: '5px' }}>
                          <label style={{ fontWeight: "bold", color: 'grey', fontSize: 10 }}>
                            Location <span style={{ color: "red" }}>*</span>
                          </label>

                          <Select
                            options={locationOptions}
                            placeholder="Select Location"
                            value={values.location}
                            onChange={(selected) => handleDropdownChange(selected, setFieldValue, "location")}

                            styles={{
                              placeholder: (base) => ({
                                ...base,
                                color: "lightgrey",
                                fontSize: 12,
                                fontWeight: 'bold'
                              }),
                              control: (base, state) => ({
                                ...base,
                                width: "100%",
                                borderRadius: "8px",
                                border: "2px solid grey",
                                boxShadow: "none",
                                borderColor: "grey",
                                "&:hover": {
                                  borderColor: "grey",
                                },
                              }),
                              indicatorSeparator: (base) => ({
                                display: 'none'
                              }),
                              dropdownIndicator: (base) => ({
                                ...base,
                                color: "grey",
                              }),
                              menu: (base) => ({
                                ...base,
                                backgroundColor: "white",
                                border: "1px solid grey",
                              }),
                              option: (base, { isFocused, isSelected }) => ({
                                ...base,
                                backgroundColor: isFocused ? "lightgrey" : isSelected ? "grey" : "white",
                                color: isSelected ? "white" : "black",
                                "&:hover": {
                                  backgroundColor: "lightgrey",
                                },
                              }),
                              singleValue: (base) => ({
                                ...base,
                                color: "black",
                              }),
                            }}
                          />
                          <ErrorMessage name="location" component="div" style={{ color: "red", fontSize: "12px" }} />

                        </div>

                      </div>


                      <div style={{ width: "100%", display: 'flex', flexDirection: 'column', gap: '5px', }}>
                        <label style={{ fontWeight: "bold", color: "grey", fontSize: 10 }}>
                          Description <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          style={{ border: '2px solid gray', borderRadius: '8px', padding: '9px' }}
                          value={values.description}
                          onChange={(e) => handleFieldChange(e.target.value, setFieldValue, 'description')}
                        />
                        <ErrorMessage name="description" component="div" style={{ color: "red", fontSize: "12px" }} />

                      </div>
                    </div>

                  </div>
                  <div ref={commentsRef} style={{ display: "flex", flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{
                        width: "30px",
                        height: "30px",
                        backgroundColor: "#d0e8f2 ",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                      }}>
                        <LiaCommentSolid size={15} color="deepskyblue" />
                      </div>

                      <h3>
                        Comments
                      </h3>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        border: "2px solid gray",
                        borderRadius: "8px",
                        padding: "9px",
                        backgroundColor: "white",
                      }}
                    >
                      <input
                        style={{
                          flex: 1,
                          border: "none",
                          outline: "none",
                          fontSize: "14px",
                          paddingRight: "10px",
                        }}
                        placeholder="Add a comment and use @name to tag someone"
                        value={values.comments}
                        onChange={(e) => handleFieldChange(e.target.value, setFieldValue, 'comments')}
                      />
                      <AiOutlineSend
                        size={20}
                        color="black"
                        style={{
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: 'end',
                      alignItems: "center",
                      padding: "15px 20px",
                      background: "white",
                      position: "sticky",
                      gap: '15px',
                      top: "0",
                      zIndex: "1000",
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <button style={{ width: '30%', border: '2px solid grey', padding: '9px', borderRadius: '5px', background: 'transparent' }}>Save as Draft</button>
                    <button type="submit" style={{ width: '30%', border: '2px solid steelblue', padding: '9px', borderRadius: '5px', backgroundColor: 'steelblue', color: 'white' }}
                      onFocus={(e) => (e.target.style.backgroundColor = "lightblue")}
                      onBlur={(e) => (e.target.style.backgroundColor = "steelblue")}
                    >Submit & New</button>

                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>


    </div>



  );
}
