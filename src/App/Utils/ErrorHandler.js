export const ErrorHandler =  (error) => {
    if (error.response) {
      console.log("Error Handler Call", error);
      if (error.response.status === 400) {
        // const token = localStorage.getItem("token");
        // localStorage.clear();
        // window.location.reload();
        // if (token) {
        //   localStorage.clear();
        
        // }
      }
      return error.response.data;
    } else if (error.request) {
      return error.message;
    } else {
      return "Something went wrongs";
    }
  };