import { Box, Button, Grid, InputLabel, Typography } from "@mui/material";
import React, { useState } from "react";
import { Colors } from "../../Assets/Styles/Colors";
import { Images } from "../../Assets/Images/Images";
import InputField from "../../Components/InputField/InputField";
import { useForm } from "react-hook-form";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import SimpleDialog from "../../Components/Dialog/Dialog";
import AccountSettingServices from "../../Api/AccountSettingServices/AccountSettingServices.index";
import Storage from "../../Utils/Storage";
import { ErrorToaster, SuccessToaster } from "../../Components/Toaster/Toaster"
export default function AccountSetting() {
  const [imageURL, setImageURL] = useState(null);
  const [editAccountSetting, setEditAccountSetting] = useState(false);
  const [profile, setProfile] = useState("");
  const { setStorageItem, getStorageItem } = Storage();

   // *For User
   const [user, setUser] = useState(getStorageItem("user"));
  

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageURL(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const updateProfile = () => {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const {
    setValue,
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
    reset,
  } = useForm();

  const setDefaultData = () => {
    setValue("Name", profile?.name);
    setValue("telephone", profile?.phone);
    setValue("email", profile?.email);
    setEditAccountSetting(true);
  };
  const submitForm = async (formData) => {
    console.log(formData);
    try {
      const {data,message} = await AccountSettingServices.updatePassword(formData);
      SuccessToaster(message)
      console.log(data)
    } catch (error) {
      ErrorToaster(error)
      console.log(error);
    }
  };
  return (
    <>
      <Box sx={{ mt: 5, ml: 2 }}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "600", fontSize: "20px" ,color:Colors.primary }}
        >
          Account Setting
        </Typography>
      </Box>
      <SimpleDialog
        open={editAccountSetting}
        onClose={() => setEditAccountSetting(false)}
        title="Edit Account Setting"
      >
        <Box component={"form"} onSubmit={handleSubmit2(updateProfile)}>
          <Grid container spacing={2}>
            <Grid item md={12}  sx={{width:"100%"}}>
              <InputLabel>Name </InputLabel>
              <InputField
                fullWidth
                placeholder={"Enter  Name"}
                type="text"
                error={errors2.Name?.message}
                register={register2("Name", {
                  required: "Please enter the name.",
                })}
              />
            </Grid>
            <Grid item md={12} sx={{width:"100%"}}>
              <InputLabel>Email </InputLabel>
              <InputField
                fullWidth
                type={"email"}
                placeholder={"Enter email address"}
                error={errors2?.email?.message}
                register={register2("email", {
                  required: "Please enter the email.",
                  pattern: {
                    // value: emailRegex,
                    message: "Please enter a valid email.",
                  },
                })}
              />
            </Grid>
            <Grid item md={12} sx={{width:"100%"}}>
              <InputLabel>Profile Picture </InputLabel>

              <InputField
                fullWidth
                placeholder={"Upload Image"}
                type="file"
                error={errors2.telephone?.message}
                register={register2("telephone", {
                  required: "Please enter phone number.",
                })}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              sx={{
                my: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                type="submit"
                sx={{
                  padding: "5px 38px",
                  color: Colors.white,
                  background:
                    "linear-gradient(310deg, #141727 0%, #3A416F 100%)",
                }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>
      </SimpleDialog>

      
      <Box sx={{ mt: 2, background: Colors.smokeWhite }}>
        <Grid container justifyContent={"space-between"}>
          <Grid item md={4} xs={12} sx={{ padding: { md: "12px", xs: "6px" } }}>
            <Box
              sx={{
                background: Colors.white,
                borderRadius: "10px",
                padding: "38px 15px",
                boxShadow: "rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  fontSize: "12px",
                }}
              >
                <BorderColorIcon
                  onClick={() => setDefaultData()}
                  sx={{
                    fontSize: "18px",
                    cursor: "pointer",
                    color: Colors.primary,
                  }}
                />
              </Box>
              <Box
                component="img"
                src={imageURL || Images.defaultImage}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "0 auto",
                  width: 90,
                  height: 90,
                  borderRadius: "50%",
                  mt: 2,
                }}
              />
              <Box
                sx={{
                  mt: 3,
                  fontWeight: "500",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                Name: {user.name}
              </Box>
              <Box
                sx={{
                  mt: 3,
                  fontWeight: "500",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                Email: {user.email}
              </Box>
            </Box>
          </Grid>

          <Grid item md={8} xs={12} sx={{ padding: { md: "12px", xs: "6px" } }}>
            <Box
              sx={{
                background: Colors.white,
                borderRadius: "10px",
                padding: "38px 15px",
                boxShadow: "rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem",
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: "600" ,color:Colors.primary }}>
                Change Password
              </Typography>
              <form onSubmit={handleSubmit(submitForm)}>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  
                  <Grid item md={6} sx={{ width: "100%" }}>
                    <Box sx={{ fontWeight: "500", fontSize: "14px", mb: 1 }}>
                      Old Password
                    </Box>
                    <InputField
                      register={register("old_password", {
                        required: "Enter Old Password",
                      })}
                      error={!!errors?.old_password?.message}
                      helperText={errors?.old_password?.message}
                      fullWidth
                      size={"small"}
                      placeholder={"Old Password"}
                    />
                  </Grid>
                  {/* <Grid item md={6}></Grid> */}
                  <Grid item md={6} sx={{ width: "100%" }}>
                    <Box sx={{ fontWeight: "500", fontSize: "14px", mb: 1 }}>
                      New Password
                    </Box>
                    <InputField
                      register={register("new_password", {
                        required: "Enter New Password",
                      })}
                      error={!!errors?.new_password?.message}
                      helperText={errors?.new_password?.message}
                      fullWidth
                      size={"small"}
                      placeholder={"New Password"}
                    />
                  </Grid>

                  <Grid item md={12}>
                    <Button
                      type="submit"
                      sx={{
                        fontWeight: "500",
                        textAlign: "center",
                        borderRadius: "5px",
                        padding: "6px 30px",
                        cursor: "pointer",
                        fontSize: "14px",
                        mb: 1,
                        background:
                          "linear-gradient(310deg, #141727 0%, #3A416F 100%)",
                        color: Colors.white,
                        "&:hover": {
                          background:
                            "linear-gradient(310deg, #141727 0%, #3A416F 100%)",
                        },
                      }}
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
