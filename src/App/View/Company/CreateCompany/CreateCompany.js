import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Colors } from "../../../Assets/Styles/Colors";
import { useForm } from "react-hook-form";
import CompanyServices from "../../../Api/CompanyServices/Company.index";
import axios from "axios";
import ImageService from "../../../Api/ImageUploadService/ImageService.index";
import { ErrorToaster, SuccessToaster } from "../../../Components/Toaster/Toaster"

function Form() {
  const [imageURL, setImageURL] = useState("")
  const [createCompanies, setCreateCompanies] = useState({})
  
  console.log(imageURL)
  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

 
  // Function to handle form submission
  const onSubmit = async (formData) => {

    const obj ={
        name: formData.name,
        email:formData.email,
        image: imageURL,
        address: formData.address,
        country: formData.country ,
        state: formData.state,
        city: formData.city,
        website: formData.website,
        link: formData.link,
    }
    try {
      const { data, responseCode ,message} = await CompanyServices.createCompany(obj);
      setCreateCompanies(data)
      SuccessToaster(message)
       console.log(data)
    }catch(error){   
      ErrorToaster(error)
      console.log(error); // Handle form submission here
    }

  };
  const handleImageUpload = async (e) => {
    try {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      const response = await ImageService.imageUpload(formData);
      console.log(response);
      setImageURL(response.data.imageUrl);
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };
  return (
    <>
      <Box sx={{ mt: 5 }}>
        <Box
          sx={{
            backgroundColor: Colors.primary ,
            // backgroundImage:
            //   "url(https://demos.creative-tim.com/soft-ui-dashboard-react/static/media/curved14.12c9ea54425c4f1bc1d7.jpg)",
            // backgroundSize: "cover",
            // backgroundRepeat: "no-repeat",
            // backgroundPosition: "center",

            borderRadius: "10px",
            minHeight: "50vh",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            textAlign: "center",
            width: "95%",
            margin: "0 auto",
            color: "#ffffff",
            position: "relative",
          }}
        >
          <Box sx={{ pt: 3 }}>
            <Box>
              <h1>Create Company </h1>
            </Box>
          </Box>
        </Box>
       
      </Box>
      <Box
        sx={{
          backgroundColor: Colors.smokeWhite,
          boxShadow: "rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem",
          p: 2,
          // m: 2,
          position: "absolute",
          top: {
            xs: "85%",
            sm: "60%",
            md: "66%",
          },
          width: "85%",
          right: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "10px",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid sx={{ mt: 2 }} container spacing={2} alignItems="center">
            {/* Name */}
            <Grid item xs={12} sm={6}>
              <InputLabel>Name</InputLabel>
              <TextField
                type="text"
                fullWidth
                {...register("name", { required: true })}
              />
              {errors.name && (
                <Typography variant="caption" color="error">
                  Name is required
                </Typography>
              )}
            </Grid>

            {/* Email */}
            <Grid item xs={12} sm={6}>
              <InputLabel>Email</InputLabel>
              <TextField
                type="email"
                fullWidth
                {...register("email", { required: true })}
              />
              {errors.email && (
                <Typography variant="caption" color="error">
                  Email is required
                </Typography>
              )}
            </Grid>

            {/* Phone */}
            {/* <Grid item xs={12} sm={6}>
              <InputLabel>Phone Number</InputLabel>
              <TextField
                type="text"
                fullWidth
                {...register("phone", { required: true })}
              />
              {errors.phone && (
                <Typography variant="caption" color="error">
                  phone number is required
                </Typography>
              )}
            </Grid> */}
            {/* Comments */}
          

            {/* Image */}
            <Grid item xs={12} sm={6}>
              <InputLabel>Image </InputLabel>
              <TextField
                type="file"
                fullWidth
                {...register("image", { required: true  })}
                onChange={(e) => {handleImageUpload(e)}}
              
              />
              {errors.image && (
                <Typography variant="caption" color="error">
                  Image is required
                </Typography>
              )}
            </Grid>
            {/* Address */}

            <Grid item xs={12} sm={6}>
              <InputLabel>Address</InputLabel>
              <TextField
                type="text"
                fullWidth
                {...register("address", { required: true })}
              />
              {errors.address && (
                <Typography variant="caption" color="error">
                  Address is required
                </Typography>
              )}
            </Grid>
            {/* Country */}

            <Grid item xs={12} sm={6}>
              <InputLabel>Country</InputLabel>
              <TextField
                type="text"
                fullWidth
                {...register("country", { required: true })}
              />
              {errors.country && (
                <Typography variant="caption" color="error">
                  Country is required
                </Typography>
              )}
            </Grid>
            {/* State */}

            <Grid item xs={12} sm={6}>
              <InputLabel>State</InputLabel>
              <TextField
                type="text"
                fullWidth
                {...register("state", { required: true })}
              />
              {errors.state && (
                <Typography variant="caption" color="error">
                 State is required
                </Typography>
              )}
            </Grid>
            {/* City */}

            <Grid item xs={12} sm={6}>
              <InputLabel>City</InputLabel>
              <TextField
                type="text"
                fullWidth
                {...register("city", { required: true })}
              />
              {errors.city && (
                <Typography variant="caption" color="error">
                 City is required
                </Typography>
              )}
            </Grid>
            {/* Website */}

            <Grid item xs={12} sm={6}>
              <InputLabel>Website</InputLabel>
              <TextField
                type="text"
                fullWidth
                {...register("website", { required: true })}
              />
              {errors.website && (
                <Typography variant="caption" color="error">
                 Website is required
                </Typography>
              )}
            </Grid>
            {/* Link */}

            <Grid item xs={12} sm={6}>
              <InputLabel>Link</InputLabel>
              <TextField
                type="text"
                fullWidth
                {...register("link", { required: true })}
              />
              {errors.link && (
                <Typography variant="caption" color="error">
                 Link is required
                </Typography>
              )}
            </Grid>
          
            {/* Submit Button */}
            <Grid item xs={12} sm={12}>
              <Button
                type="submit"
                sx={{
                  background:
                    "linear-gradient(310deg, #141727 0%, #3A416F 100%)",
                  color: Colors.white,
                  padding: "5px 25px",
                  "&:hover": {
                    background:
                      "linear-gradient(310deg, #141727 0%, #3A416F 100%)",
                  },
                }}
              >
                SUBMIT
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
}

export default Form;
